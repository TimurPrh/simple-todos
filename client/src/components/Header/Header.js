import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../..';
import './header.scss'

const Header = observer(() => {
  const {user} = useContext(Context)

  const logout = () => {
    user.setIsAuth(false)
    user.setUser({})
    localStorage.removeItem('token')
  }

  return (
    <header
      className='header'
    >
      <div className="container">
        <div
          className='header__header'
        >
          Todos
        </div>
        {
          user.isAuth ?
          <button
            className='header__button'
            onClick={logout}
          > Выйти </button>
          :
          null
        }
        
      </div>
    </header>
  );
});

export default Header;