import React, { Component } from 'react'
import BookListFunc from './BookListFunc';
// import { useSelector } from 'react-redux';
import BookListCard from '../BookListCard/BookListCard';
import { store } from '../../app/store';
import { Link } from 'react-router-dom';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startIndex: 0,
			books: store.getState().books,
			category: store.getState().category,
			sortBy: store.getState().sortBy,
			searchQuery: store.getState().searchQuery
		};
		console.log(this.state)
		store.subscribe(() => {
			this.setState({
				books: store.getState().books,
				category: store.getState().category,
				sortBy: store.getState().sortBy,
				searchQuery: store.getState().searchQuery
			});
			console.log(this.state)
		  });
		// store.subscribe(() => {
		// 	// When state will be updated(in our case, when items will be fetched), 
		// 	// we will update local component state and force component to rerender 
		// 	// with new data.
	  
		// 	this.setState({
		// 		books: store.getState().books
		// 	});
		//   });
	}
	
	componentDidMount() {
		this.loadBooks()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.startIndex !== this.state.startIndex || 
			prevState.sortBy != this.state.sortBy ||
			prevState.category != this.state.category ||
			prevState.searchQuery != this.state.searchQuery ) {
		  this.loadBooks();
		}
	}

	loadBooks = () => {
		const {startIndex, sortBy, category, searchQuery} = this.state
		let api = ''
		let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30&startIndex=${startIndex}`
		if (category != 'all') url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+subject:${category}&maxResults=30&startIndex=${startIndex}&orderBy=${sortBy}`
		if (sortBy != 'relevance') url += `&orderBy=${sortBy}`
		if (sortBy != 'relevance' || category != 'all') {
			api = '&key=AIzaSyBQroyb0IQgXDI3' + 'vPrUppXCQSu17QE3UEI'
		}
		console.log(api)
		fetch(url)
			.then((response) => response.json())
			.then((response) => {		
				console.log(response)		
				this.setState((prevState) => ({
					books: [...prevState.books, ...response.items]
				}))
			})
	}

	loadMore = () => {
		this.setState((prevState) => ({
			startIndex: prevState.startIndex + 30
		}));
	}
	

	render() {
		const {books} = this.state;
		// console.log(this.state.startIndex)
		if (books.length == 0) {
			return <div>Loading</div>
		} else {
			return (
				<div className='book-list'>
					{/* <BookListFunc books={books}/> */}
					<div className='book-list__list'>
						{books.map((item) => (
							<Link to={{
								pathname: item.id
								}}>
								<BookListCard book={item} key={item.id} />
							</Link>
						))}	
					</div>
					<div className='book-list__load-more'>
						<button onClick={this.loadMore}>Load more</button>	
					</div>			
				</div>
			)
		}
		
	}
}
