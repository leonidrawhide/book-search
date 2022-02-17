import React, { Component } from 'react'
import BookListCard from '../BookListCard/BookListCard';
import { store } from '../../app/store';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

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
		// console.log(this.state)
		store.subscribe(() => {
			this.setState({
				books: store.getState().books,
				category: store.getState().category,
				sortBy: store.getState().sortBy,
				searchQuery: store.getState().searchQuery
			});
		});
	}
	
	componentDidMount() {
		  	this.loadBooks();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('update check')
		if (prevState.startIndex !== this.state.startIndex || 
			prevState.sortBy != this.state.sortBy ||
			prevState.category != this.state.category ||
			prevState.searchQuery != this.state.searchQuery ) {
			console.log('it is different')	
		  	this.loadBooks();
		}
	}

	loadBooks = () => {
		const {startIndex, sortBy, category, searchQuery} = this.state
		let api = '&key=AIzaSyBQroyb0IQgXDI3vPrUppXCQSu17QE3UEI'
		let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30&startIndex=${startIndex}`
		if (category != 'all') url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+subject:${category}&maxResults=30&startIndex=${startIndex}&orderBy=${sortBy}`
		if (sortBy != 'relevance') url += `&orderBy=${sortBy}`
		console.log(url + api)
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
		if (books.length == 0) {
			return <Loading />
		} else if (books?.error) {
			return <div> Error  {books?.error?.code} {books?.error?.message}</div>
		} else {
			return (
				<div className='book-list'>
					<div className='book-list__list'>
						{books.map((item) => (
							<Link to={{
								pathname: item.id,
								key: item.id
								}}>
								<BookListCard book={item} />
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
