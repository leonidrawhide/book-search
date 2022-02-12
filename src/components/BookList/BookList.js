import React, { Component } from 'react'
import BookListCard from '../BookListCard/BookListCard';

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startIndex: 15,
			books: []
		};
	}

	componentDidMount() {
		fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=30&startIndex=" + this.state.startIndex)
			.then((response) => response.json())
			.then((response) => {				
				// console.log(response)
				this.setState({
					books: response.items
				})
				
				// console.log(this.state.books[0].volumeInfo.title)
				
			})
	}

	render() {
		const {books} = this.state;
		console.log(books)
		if (books.length == 0) {
			return <div>Loading</div>
		} else {
			return (
				<div className='book-list'>
					{books.map((item) => (
						<BookListCard book={item} />	
					))}				
			</div>
			)
		}
		
	}
}
