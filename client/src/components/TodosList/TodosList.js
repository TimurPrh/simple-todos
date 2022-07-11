import React, { useContext, useEffect } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import './TodosList.scss'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { destroyTodo, updateTodo } from '../../http/todosAPI';

const StarComponent = () => <StarIcon className="todos-list__item-icon-favorite" />
const DeleteComponent = () => <DeleteIcon className="todos-list__item-icon-delete" />

const TodosList = observer(() => {

  const {list, user} = useContext(Context)

  const refContainer = {}
  for (let value of list.todos) {
    refContainer[value.id] = React.createRef()
  }

  const toggleFavorite = (id) => {
    refContainer[id].current.style.setProperty('--animate-duration', '0.4s');
    refContainer[id].current.classList.add('animate__animated', 'animate__pulse');

    const handleAnimationEnd = async () => {
      updateTodo(id, {favorite: list.getTodo(id).favorite})
      list.toggleFavorite(id)
    }

    refContainer[id].current.addEventListener('animationend', handleAnimationEnd, {once: true});
  }
  
  const deleteItem = (id) => {
    refContainer[id].current.style.setProperty('--animate-duration', '.6s');
    refContainer[id].current.classList.add('animate__animated', 'animate__fadeOutLeft');

    refContainer[id].current.addEventListener('animationend', async () => {
      const res = await destroyTodo(id)
      list.deleteItem(id)
    });
  }

  return (
    <div className='todos-list'>
      {list.todos.length > 0 ? 
      <>
        <div className="todos-list__header">
          Нi, {user.user.nickName}! Here are all your notes:
        </div>
        <ul className='todos-list__list'>
          {list.todos
          .filter(item => list.filterFavorite ? item.favorite : true)
          .filter(item => list.filterText ? item.text.indexOf(list.filterText) !== -1 : true)
          .map(todo => 
            <li 
              ref={refContainer[todo.id]}
              key={todo.id} 
              className={todo.favorite ? 
                'todos-list__item todos-list__item_active'
                :
                'todos-list__item'
              }
            >
              <div className='todos-list__item-upper'>
                <div className='todos-list__item-created-at'>
                  {new Date(todo.createdAt).toLocaleString()}
                </div>
                <div className='todos-list__item-icons'>
                  <button
                    type='button' 
                    className={todo.favorite ? 
                      'todos-list__item-icon todos-list__item-favorite'
                      :
                      'todos-list__item-icon todos-list__item-icon_active todos-list__item-favorite '
                    }
                    onClick={() => toggleFavorite(todo.id)}
                  >
                    <StarComponent />
                  </button>
                  <button 
                    className='todos-list__item-icon todos-list__item-delete'
                    onClick={() => deleteItem(todo.id)}
                  >
                    <DeleteComponent />
                  </button>
                </div>
              </div>
              <div className='todos-list__item-text'>
                {todo.text}
              </div>
            </li>
          )}
        </ul>
      </>
      :
      <>
        <div className="todos-list__header">
          Привет, {user.user.nickName}! У тебя пока нет заметок
        </div>
      </>
      }
    </div>
  );
});

export default TodosList;