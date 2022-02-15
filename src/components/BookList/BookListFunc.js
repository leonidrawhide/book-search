import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookListCard from '../BookListCard/BookListCard';

export default function BookListFunc(props) {
	const books = useSelector((state) => state.books)
	const dispatch = useDispatch()

	const saveBooks = () => {
		console.log('called')
		// e.preventDefault()
		const localBooks = props.books
		// if (localBooks.length <= 30) {
			dispatch({type: 'ADD_BOOKS', books})
			console.log('added books')
		// }
	}

  	return (
		<div className='book-list__list'>
			{saveBooks()}
			{console.log(props.books)}
			{console.log(books)}
			{books.map((item) => (
				<BookListCard book={item} />	
			))}	
		</div>
  )
}
