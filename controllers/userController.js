const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, nickName, role) => {
  return jwt.sign(
    {id, nickName, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {nickName, password, role} = req.body
    if (!nickName || !password) {
      return next(ApiError.badRequest('Некорректный nickName или password'))
    }
    const candidate = await User.findOne({where: {nickName}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким nickName уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({role, nickName, password: hashPassword})
    const token = generateJwt(user.id, user.nickName, user.role)
    return res.json({token})
  }

  async login(req, res, next) {
    const {nickName, password} = req.body
    const user = await User.findOne({where: {nickName}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.nickName, user.role)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.nickName, req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController()