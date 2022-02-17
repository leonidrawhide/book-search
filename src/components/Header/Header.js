import React, { useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/styles.css'
import { store } from '../../app/store';

export default function Header() {
	const [sortBy, setSortBy] = useState('relevance');
	const [category, setCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch();

	const changeSort = (e) => {
		if (e.key === 'Enter') {
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
		if (e.key === 'Enter') {
			e.preventDefault();
			const data = {
				searchQuery: searchQuery
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
  	)
}

// export default class Header extends Component {
// 	// dispatch = useDispatch();
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			category: store.getState().category,
// 			sortBy: store.getState().sortBy
// 		};
// 		store.subscribe(() => {
// 			this.setState({
// 				category: store.getState().category,
// 				sortBy: store.getState().sortBy
// 			});
// 		});
// 	}

// 	changeSort = (e) => {	
// 		e.preventDefault();
// 		const data = {
// 			sortBy: this.state.sortBy,
// 			category: this.state.category
// 		}
// 		useDispatch({type: 'CHANGE_SORT', data})
// 		console.log("dispatched " + data.sortBy + " " + data.category)
// 	}

// 	onCategoryChange = (e) => {
// 		const val = e.target.value;
// 		e.preventDefault();
// 		this.setState(() => ({
// 		  	category: val,
// 		}));
// 		this.setState((prevState) => ({
// 			category: val
// 		}));
// 		console.log(this.state)
// 	};

// 	onSortChange = (e) => {
// 		const val = e.target.value;
// 		e.preventDefault();
// 		this.setState(() => ({
// 		  	sortBy: val,
// 		})); 
// 		this.setState((prevState) => ({
// 			sortBy: val
// 		}));
// 	};
	
// 	// render() {
// 	// 	// return (
// 	// 	//   <div className="col-3">
// 	// 	// 	<select
// 	// 	// 	  name="gender"
// 	// 	// 	  id="id_gender"
// 	// 	// 	  value={this.state.gender} {/* Step 2 - Set that `select` related state property to value attribute */}
// 	// 	// 	  onChange={this.onChange} {/* Step 4 - Set that method to onChange event */}
// 	// 	// 	>
// 	// 	// 	  <option value="m">Male</option>
// 	// 	// 	  <option value="f">Female</option>
// 	// 	// 	</select>
// 	// 	//   </div>
// 	// 	// );
// 	//   }
// 	render() {
// 		return (
// 			<div className='header'>
// 				<div className='header__name'>
// 					<h1>Поиск книг</h1>
// 				</div>
// 				<div className='header__search'>
// 					<input type='text' />
// 				</div>
// 				<div className='header__sort' >
// 					<label htmlFor="category">Категории</label>
// 					<select id="category" name="category" value={this.state.category} onChange={this.onCategoryChange}>
// 						<option value='all'>all</option>
// 						<option value='art'>art</option>
// 						<option value='biography'  >Биография</option>
// 						<option value='computers'>Компьютеры</option>
// 						<option value='history'>история</option>
// 						<option value='medical'>Медицина</option>
// 						<option value='poetry'>Поэзия</option>
// 					</select>
// 					<label htmlFor="sort">Сортировать по</label>
// 					{/* onChange={e=>setSortBy(e.target.value)} */}
// 					<select id="sort" name="sort" value={this.state.sortBy}  onChange={this.onSortChange}>
// 						<option value="relevance">Соответствию</option>
// 						<option value="newest">Дате выхода</option>
// 					</select>
// 				</div>
// 			</div>
// 		  )
// 	}
  	
// }