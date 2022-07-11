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
              'Login'
              :
              'Sign up'
            }
          </div>
          <input 
            className='auth__input'
            type='text'
            placeholder={'Enter your username'}
            name='nickName'
            value={nickName}
            onChange={e => setNickName(e.target.value)}
          />
          <input 
            className='auth__input'
            type='password'
            placeholder='Enter the password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='auth__bottom'>
            {
              isLogin ?
              <>
                <div className='auth__check'>
                  <div className='auth__text'>Not registered yet?</div>
                  <button
                    type='button'
                    className='auth__secondary-button'
                    onClick={(e) => {
                        e.preventDefault()
                        setIsLogin(false)
                      }
                    }
                  >
                    Sign up
                  </button>
                </div>
                <button
                  type='submit'
                  className='auth__primary-button'
                  onClick={click}
                >
                  Login
                </button>
              </>
              :
              <>
                <div className='auth__check'>
                  <div className='auth__text'>Already registered?</div>
                  <button
                    type='button'
                    className='auth__secondary-button'
                    onClick={(e) => {
                      e.preventDefault()
                      setIsLogin(true)
                    }}
                  >
                    Login
                  </button>
                </div>
                <button
                  type='submit'
                  className='auth__primary-button'
                  onClick={click}
                >
                  Sign up
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