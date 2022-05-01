import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../..';
import { createTodo } from '../../http/todosAPI';
import './addTodo.scss'

const AddTodo = observer(() => {
  const {list} = useContext(Context)

  const [value, setValue] = useState('')

  const addTodo = async (e) => {
    e.preventDefault()

    if (value.length > 0) {
      const res = await createTodo(value)
      if (res.id) {
        list.addItem(value)
      }

      setValue('')
      return list.todos
    }

    alert ('Пустой текст!')
  }


  return (
    <form className='add-todo'>
      <input 
        className='add-todo__input'
        type='text'
        placeholder='Введите текст новой заметки'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        className='add-todo__button'
        onClick={(e) => addTodo(e, value)}
      >
        Добавить
      </button>
    </form>
  );
});

export default AddTodo;