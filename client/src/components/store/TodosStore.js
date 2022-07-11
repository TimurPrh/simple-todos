import {makeAutoObservable} from "mobx";

export default class TodosStore {
    constructor() {
        this._todos = []
        this._filterFavorite = false
        this._filterText = ''
        makeAutoObservable(this)
    }

    setTodos(todos) {
        this._todos = todos
    }
    setFilterFavorite(bool) {
      this._filterFavorite = bool
    }
    setFilterText(text) {
      this._filterText = text
    }
    toggleFavorite(id) {
      const index = this._todos.findIndex((el) => el.id === id)

      this._todos[index].favorite = !this._todos[index].favorite
    }
    addItem(todo) {
      this._todos.push({id: todo.id, favorite: todo.favorite, text: todo.text, createdAt: todo.createdAt})
    }
    deleteItem(id) {
      const index = this._todos.findIndex((el) => el.id === id)
      this._todos.splice(index, 1);
    }
    getTodo(id) {
      const index = this._todos.findIndex((el) => el.id === id)

      return this._todos[index]
    }

    get todos() {
        return this._todos
    }
    get filterFavorite() {
      return this._filterFavorite
    }
    get filterText() {
      return this._filterText
    }
}