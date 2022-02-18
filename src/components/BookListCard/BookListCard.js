import React from 'react'

export default function BookListCard(props) {
	const imgLink = props.book.volumeInfo?.imageLinks?.thumbnail;
	const title =  props.book.volumeInfo?.title;
	const author = props.book.volumeInfo?.authors?.[0];
	const category = props.book.volumeInfo?.categories?.[0];

	function showCover(imgLink) {
		if (imgLink != undefined) return <img src={imgLink} alt="обложка" />
		else return <div className='card__cover_undefined'></div>
	}
  	return (
	<div className='card'>
		<div className='card__cover'>
			{showCover(imgLink)}
		</div>
		<h5 className='card__category'>{category}</h5>
		<h3 className='card__title'>{title}</h3>
		<h5 className='card__author'>{author}</h5>
	</div>
  )
}
