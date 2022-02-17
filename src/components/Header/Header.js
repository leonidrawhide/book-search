import React, { useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/styles.css'
import { store } from '../../app/store';
import { Outlet } from 'react-router-dom';

export default function Header() {
	const [sortBy, setSortBy] = useState('relevance');
	const [category, setCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch();

	const changeSort = (e) => {
		if (e.key === 'Enter' && 
			(category != store.getState().category ||
			sortBy != store.getState().sortBy)) {
			e.preventDefault();
			const data = {
				sortBy: sortBy,
				category: category
			}
			dispatch({type: 'CHANGE_SORT', data})
			console.log("dispatched " + data.sortBy + " " + data.category)
		}
	}

	const search = (e) => {
		if (e.key === 'Enter' && searchQuery != store.getState().searchQuery) {
			e.preventDefault();

			let data
			if (searchQuery == '') {
				data = { searchQuery: "search+terms" }
			} else {
				data = { searchQuery: searchQuery }
			}
			
			dispatch({type: 'SEARCH_QUERY', data})
			console.log("dispatched " + data.searchQuery)
		}
		
	}

	// const handleSortChange = function(e){
	// 	const val = e.target.value;
	// 	e.preventDefault();
	// 	this.setState(() => ({
	// 		sortBy: val,
	// 	}));
	// }

	// const handleCategoryChange = function(e){
	// 	const val = e.target.value;
	// 	e.preventDefault();
	// 	this.setState(() => ({
	// 	  category: val,
	// 	}));
	// } 

  	return (
		<div>
			<div className='header'>
				<div className='header__name'>
					<h1>Поиск книг</h1>
				</div>
				<div className='header__search'>
					<input type='text' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={search}/>
				</div>
				<div className='header__sort' onKeyDown={changeSort}>
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