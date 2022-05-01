import {makeAutoObservable} from "mobx";

export default class TodosStore {
    constructor() {
        // this._todos = [
        //   {id: 12, favorite: true, text: "Первая заметка"},
        //   {id: 14, favorite: false, text: "Вторая заметка"},
        //   {id: 65, favorite: false, text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloremque neque, nulla suscipit enim laudantium libero placeat dignissimos quidem nemo quos temporibus eum in cumque itaque tempora aspernatur aut blanditiis."}
        // ]
        this._todos = []
        this._maxId = 1
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
      this._todos.push({id: this._maxId + 1, favorite: false, text: todo})
      this._maxId += 1
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