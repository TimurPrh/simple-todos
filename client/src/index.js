import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import TodosStore from './components/store/TodosStore';
import UserStore from './components/store/UserStore';
import App from './App';
import './index.scss'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <Context.Provider value={{
    user: new UserStore(),
    list: new TodosStore()
  }}>
    <App />
  </Context.Provider>
);
