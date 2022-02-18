import React, { Component } from 'react'
import Loading from '../Loading/Loading';

export default class BookPageClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: `https://www.googleapis.com/books/v1/volumes/${props.index}?key=AIzaSyBQroyb0IQgXDI3vPrUppXCQSu17QE3UEI`,
			bookInfo: []
		}
	}

	componentDidMount() {
		fetch(this.state.url)
			.then((response) => response.json())
			.then((response) => {				
				this.setState({
					bookInfo: response
				})
			})
	}
	render() {
		const {bookInfo} = this.state
		if (bookInfo.length == 0) {
			return <Loading />
		}else if (bookInfo?.error) {
			return <div> Error  {bookInfo?.error?.code} {bookInfo?.error?.message}</div>
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
									<h4>Categories</h4>
									{bookInfo.volumeInfo?.categories?.map((item) => (
										<p key={item}>{item}</p>
									))}
								</div>
								<div className='book-page__info_wrapper_cats-auth_authors'>
									<h4>Authors</h4>
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
