import React from 'react'
import { useParams } from 'react-router-dom';
import BookPageClass from './BookPageClass';

export default function BookPage(props) {
	const {id} = useParams();
	console.log(id)
  return (<BookPageClass index={id}/>
  )
}
