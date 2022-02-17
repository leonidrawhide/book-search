import React, { useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/styles.css'
import { store } from '../../app/store';
import { Outlet } from 'react-router-dom';
import searchLogo from '../../img/search-icon.png';

export default function Header() {
	const [sortBy, setSortBy] = useState('relevance');
	const [category, setCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch();

	const search = (e) => {
		if ((e.key === 'Enter' || e === 'Enter') && 
			(category != store.getState().category ||
			sortBy != store.getState().sortBy ||
			searchQuery != store.getState().searchQuery) && 
			!(searchQuery.replaceAll(' ', '') == '' && 
			store.getState().searchQuery == "search+terms")) {
			let data
			if (searchQuery.replaceAll(' ', '') == '') {
				data = { 
					searchQuery: "search+terms",
					sortBy: sortBy,
					category: category
				}
			} else {
				data = { 
					searchQuery: searchQuery,
					sortBy: sortBy,
					category: category
				}
			}
			
			dispatch({type: 'SEARCH_QUERY', data})
			dispatch({type: 'CHANGE_SORT', data})
		}
		
	}

  	return (
		<div>
			<div className='header'>
				<div className='header__name'>
					<h1>Поиск книг</h1>
				</div>
				<div className='header__search'>
					<input type='text' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={search}/>
					<button onClick={() => {
						const e = {
							key: 'Enter'
						}
						search(e)
					}}>
						<img src={searchLogo} alt="Поиск" />
					</button>
				</div>
				<div className='header__sort' onKeyDown={search}>
					<label htmlFor="category">Категории</label>
					<select id="category" name="category" value={category} onChange={e=>setCategory(e.target.value)}>
						<option value='all'>all</option>
						<option value='art'>art</option>
						<option value='biography'  >Биография</option>
						<option value='computers'>Компьютеры</option>
						<option value='history'>история</option>
						<option value='medical'>Медицина</option>
						<option value='poetry'>Поэзия</option>
					</select>
					<label htmlFor="sort">Сортировать по</label>
					{/* onChange={e=>setSortBy(e.target.value)} */}
					<select id="sort" name="sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
						<option value="relevance">Соответствию</option>
						<option value="newest">Дате выхода</option>
					</select>
				</div>
			</div>
			<Outlet />
		</div>
		
  	)
}