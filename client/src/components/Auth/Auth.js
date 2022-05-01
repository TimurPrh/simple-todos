import React, { useContext, useState } from 'react';
import { Context } from '../..';
import {login, registration} from "../../http/userAPI";
import './auth.scss'

const Auth = () => {
  const {user} = useContext(Context)

  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const click = async (e) => {
    e.preventDefault()
    try {
      let data;
      if (isLogin) {
        data = await login(nickName, password);
      } else {
        data = await registration(nickName, password);
      }
      user.setUser(data)
      user.setIsAuth(true)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className='container'>
      <form className='auth'>
        <div className='auth__wrapper'>
          <div className='auth__header'>
            {isLogin ?
              'Войти'
              :
              'Зарегистрироваться'
            }
          </div>
          <input 
            className='auth__input'
            type='text'
            placeholder={'Введите логин'}
            name='nickName'
            value={nickName}
            onChange={e => setNickName(e.target.value)}
          />
          <input 
            className='auth__input'
            type='password'
            placeholder='Введите пароль'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='auth__bottom'>
            {
              isLogin ?
              <>
                <div className='auth__check'>
                  <div className='auth__text'>Еще не зарегистрированы?</div>
                  <button
                    type='button'
                    className='auth__secondary-button'
                    onClick={(e) => {
                        e.preventDefault()
                        setIsLogin(false)
                      }
                    }
                  >
                    Зарегистрироваться
                  </button>
                </div>
                <button
                  type='submit'
                  className='auth__primary-button'
                  onClick={click}
                >
                  Войти
                </button>
              </>
              :
              <>
                <div className='auth__check'>
                  <div className='auth__text'>Уже зарегистрированы?</div>
                  <button
                    type='button'
                    className='auth__secondary-button'
                    onClick={(e) => {
                      e.preventDefault()
                      setIsLogin(true)
                    }}
                  >
                    Войти
                  </button>
                </div>
                <button
                  type='submit'
                  className='auth__primary-button'
                  onClick={click}
                >
                  Зарегистрироваться
                </button>
              </>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;