import React, { Component } from 'react'

export default class BookPageClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: `https://www.googleapis.com/books/v1/volumes/${props.index}`,
			bookInfo: []
		}
	}

	componentDidMount() {
		fetch(this.state.url)
			.then((response) => response.json())
			.then((response) => {		
				console.log(response)		
				this.setState({
					bookInfo: response
				})
				console.log(this.state)
			})
	}
	render() {
		const {bookInfo} = this.state
		console.log(this.state.bookInfo)
		if (bookInfo.length == 0) {
			return <div>Loading...</div>
		} else {
			return (
				<div className='book-page'>
					<div className='book-page__title'>
						<h2>{bookInfo.volumeInfo.title}</h2>
					</div>
					<div className='book-page__info'>
						<div className='book-page__info_cover'>
							<img src={bookInfo.volumeInfo.imageLinks?.medium} alt="book cover" />
						</div>
						<div className='book-page__info_wrapper'>
							<div className='book-page__info_wrapper_cats-auth'>
								<div className='book-page__info_wrapper_cats-auth_categories'>
									{bookInfo.volumeInfo?.categories?.map((item) => (
										<p key={item}>{item}</p>
									))}
								</div>
								<div className='book-page__info_wrapper_cats-auth_authors'>
									{bookInfo.volumeInfo?.authors?.map((item) => (
										<p key={item}>{item}</p>
									))}
								</div>
							</div>
						<div className='book-page__info_wrapper_description'>
							<p>{bookInfo.volumeInfo.description}</p>
						</div>
						</div>
					</div>
					
				</div>
			)
		}
	}
}
