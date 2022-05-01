import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from ".";
import AddTodo from "./components/AddTodo/AddTodo";
import Auth from "./components/Auth/Auth";
import FilterItem from "./components/FilterItem/FilterItem";
import Header from "./components/Header/Header";
import TodosList from "./components/TodosList/TodosList";
import { fetchTodos } from "./http/todosAPI";
import { check } from "./http/userAPI";


const App = observer(() => {
  const {user, list} = useContext(Context)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
        fetchTodos().then(data => list.setTodos(data))
      }
    }).catch(() => {
      user.setUser({})
      user.setIsAuth(false)
    })
    .finally(() => setLoading(false))
    
  }, [user.isAuth])

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <>
      <Header />
      <div className="container">
        {
          user.isAuth ?
            <>
              <FilterItem />
              <TodosList />
              <AddTodo />
            </>
            :
            <Auth />
        }
      </div>
    </>
  )
})

export default App;