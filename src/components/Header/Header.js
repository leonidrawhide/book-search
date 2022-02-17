import React, { useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/styles.css'
import { store } from '../../app/store';
import { Link, Outlet } from 'react-router-dom';
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
			store.getState().searchQuery == "search+terms" &&
			category == store.getState().category &&
			sortBy == store.getState().sortBy)) {
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
					<Link to={{ pathname: '/' }}>
						<h1>Book Search</h1>
					</Link>
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
					<label htmlFor="category">Categories</label>
					<select id="category" name="category" value={category} onChange={e=>setCategory(e.target.value)}>
						<option value='all'>All</option>
						<option value='art'>Art</option>
						<option value='biography'>Biography</option>
						<option value='computers'>Computers</option>
						<option value='history'>History</option>
						<option value='medical'>Medicine</option>
						<option value='poetry'>Poetry</option>
					</select>
					<label htmlFor="sort">Sort by</label>
					<select id="sort" name="sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
						<option value="relevance">Relevance</option>
						<option value="newest">Newest</option>
					</select>
				</div>
			</div>
			<Outlet />
		</div>
		
  	)
}