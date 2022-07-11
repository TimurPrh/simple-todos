const uuid = require('uuid')
const path = require('path')
const {Todos} = require('../models/models')
const ApiError = require('../error/ApiError')

class TodosController {
  async create(req, res, next) {
    try {
      const {favorite, text} = req.body

      const todos = await Todos.create({favorite, text, userId: req.user.id})

      return res.json(todos)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async changeOptions(req, res, next) {
    try {
      const {id} = req.params
      const {favorite} = req.body

      const todo = await Todos.findOne({ where: { id, userId: req.user.id } });

      if (todo) {
        todo.favorite = favorite;
        await todo.save();
      }

      return res.json(todo)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async destroy(req, res, next) {
    try {
      const {id} = req.params

      const reply = await Todos.destroy({where: {id, userId: req.user.id}})

      return res.json(reply)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const todos = await Todos.findAll({order: [['createdAt']], where: {userId: req.user.id}})
    return res.json(todos)
  }
}

module.exports = new TodosController()