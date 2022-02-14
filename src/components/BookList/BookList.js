import React, { Component } from 'react'
import BookListCard from '../BookListCard/BookListCard';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startIndex: 0,
			books: []
		};
	}

	componentDidMount() {
		this.loadBooks()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.startIndex !== this.state.startIndex) {
		  this.loadBooks();
		}
	}

	loadBooks = () => {
		fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=30&startIndex=" + this.state.startIndex)
			.then((response) => response.json())
			.then((response) => {				
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
		console.log(this.state.startIndex)
		if (books.length == 0) {
			return <div>Loading</div>
		} else {
			return (
				<div className='book-list'>
					{books.map((item) => (
						<BookListCard book={item} />	
					))}	
					<div className='book-list__load-more'>
						<button onClick={this.loadMore}>Load more</button>	
					</div>			
			</div>
			)
		}
		
	}
}
