import React from 'react'

export default function BookListCard(props) {
	const imgLink = props.book.volumeInfo?.imageLinks?.thumbnail
	const title =  props.book.volumeInfo?.title
  	return (
	<div className='card'>
		<div className='card__cover'>
			<img src={imgLink} alt="обложка" />
		</div>
		<h3 className='card__title'>{title}</h3>
	</div>
  )
}
