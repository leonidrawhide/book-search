import React from 'react';
import '../Styles/styles.css'

export default function Header() {
  return (
	<div className='header'>
		<div className='header__name'>
			<h1>Поиск книг</h1>
		</div>
		<div className='header__search'>
			<input type='text' />
		</div>
		<div className='header__sort'>
			<label for="category">Категории</label>
			<select id="category" name="category">
				<option value="scary">Ужастик</option>
				<option value="fantasy">Фантастика</option>
				<option value="aboba">Абоба</option>
				<option value="drama">Драма</option>
			</select>
			<label for="sort">Сортировать по</label>
			<select id="sort" name="sort">
				<option value="date">Дате выхода</option>
				<option value="popularity">Популярности</option>
				<option value="alphabet">Алфавиту</option>
			</select>
		</div>
	</div>
  )
}
