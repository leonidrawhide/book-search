import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/styles.css'

export default function Header() {
	const [sortBy, setSortBy] = useState('');
	const [category, setCategory] = useState('');

  	return (
		<div className='header'>
			<div className='header__name'>
				<h1>Поиск книг</h1>
			</div>
			<div className='header__search'>
				<input type='text' />
			</div>
			<div className='header__sort'>
				<label htmlFor="category">Категории</label>
				<select id="category" name="category" onChange={e=>setCategory(e.target.value)}>
					<option text='all' value={category}>all</option>
					<option text='art' value={category}>art</option>
					<option text="biography" value={category}>Биграфия</option>
					<option text="computers" value={category}>Компьютеры</option>
					<option text="history" value={category}>история</option>
					<option text="medical" value={category}>Медицина</option>
					<option text="poetry" value={category}>Поэзия</option>
				</select>
				<label htmlFor="sort">Сортировать по</label>
				<select id="sort" name="sort" onChange={e=>setSortBy(e.target.value)}>
					<option value="relevance">Соответствию</option>
					<option value="newest">Дате выхода</option>
				</select>
			</div>
		</div>
  	)
}
