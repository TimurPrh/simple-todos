const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nickName: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Todos = sequelize.define('todos', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  favorite: {type: DataTypes.BOOLEAN, defaultValue: false},
  text: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Todos)
Todos.belongsTo(User)

module.exports = {
  User,
  Todos
}