import React, { useContext, useState } from 'react';
import { Context } from '../..';
import './filterItem.scss'

const FilterItem = () => {
  const {list} = useContext(Context)

  const [value, setValue] = useState('')
  const [favorite, setFavorite] = useState(false)

  const setLocalFilterText = (text) => {
    setValue(text)
    list.setFilterText(text)
  }

  const setLocalFavorite = (bool) => {
    setFavorite(bool)
    list.setFilterFavorite(bool)
  }

  return (
    <div
      className='filter-item'
    >
      <label
        className='filter-item__label'
      >
        <input
          className='filter-item__checkbox'
          type='checkbox'
          value={favorite}
          onChange={e => setLocalFavorite(e.target.checked)}
        />
        Favorites
      </label>
      <input 
        className='filter-item__input'
        type='text'
        placeholder='Enter filter text'
        value={value}
        onChange={e => setLocalFilterText(e.target.value)}
      />

    </div>
  );
};

export default FilterItem;