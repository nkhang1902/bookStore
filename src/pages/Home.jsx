/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../style/Home.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {CardGroup, Card} from 'react-bootstrap';
import {db} from '../firebase/config';
import {Firestore, collection, getDocs, addDoc, doc, deleteDoc, orderBy, query} from 'firebase/firestore';
import {useEffect, useState} from 'react';

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: {max: 4000, min: 3000},
		items: 6,
	},
	desktop: {
		breakpoint: {max: 3000, min: 1024},
		items: 6,
	},
	tablet: {
		breakpoint: {max: 1024, min: 464},
		items: 4,
	},
	mobile: {
		breakpoint: {max: 464, min: 0},
		items: 3,
	},
};

const Home = () => {
	const [open, setOpen] = React.useState(false);
	const [Books, setBooks] = useState([]);
	const [NewBooks, setNewBooks] = useState([]);
	const [DiscountBooks, setDisBooks] = useState([]);

	function NewReleaseBooks() {
		const bookCollection = collection(db, 'Book');

		getDocs(query(bookCollection, orderBy('PostedDate', 'desc')))
			.then(response => {
				const books = response.docs.map(doc => ({
					data: doc.data(),
					id: doc.id,
				}));
				setNewBooks(books);
			})
			.catch(error => console.log(error.message));
	}

	function DisBooks() {
		const bookCollection = collection(db, 'Book');

		getDocs(query(bookCollection, orderBy('DiscountPrice', 'desc')))
			.then(response => {
				const books = response.docs.map(doc => ({
					data: doc.data(),
					id: doc.id,
				}));
				setDisBooks(books);
			})
			.catch(error => console.log(error.message));
	}

	function AllBooks() {
		const bookCollection = collection(db, 'Book');
		getDocs(bookCollection)
			.then(response => {
				const book = response.docs.map(doc => ({
					data: doc.data(),
					id: doc.id,
				}));
				setBooks(book);
			})
			.catch(error => console.log(error.message));
	}

	useEffect(() => {
		AllBooks();
		NewReleaseBooks();
		DisBooks();
	}, []);

	return (
		<div>
			<div>
				<div className='content'>
					<h2>Best Sellers</h2>
					<div className='crs'>
						<Carousel className='d-flex overflow-auto' focusOnSelect={true} centerMode={true} responsive={responsive} showDots={false}>
							{Books.slice(0, 15).map(book => (
								<Card key={book.id} className='bookcard m-2 p-1 border-0 shadow position-relative'>
									<a href={`/BookDetails/${book.id}`}>
										<img className='product--image rounded' src={book.data.ImageURL} />
									</a>
								</Card>
							))}
						</Carousel>
					</div>
				</div>
			</div>

			<div>
				<div className='content'>
					<h2>New Release</h2>
					<div className='crs'>
						<Carousel className='d-flex overflow-auto' focusOnSelect={true} centerMode={true} responsive={responsive} showDots={false}>
							{NewBooks.slice(0, 15).map(book => (
								<Card key={book.id} className='bookcard m-2 p-1 border-0 shadow position-relative'>
									<a href={`/BookDetails/${book.id}`}>
										<img className='product--image rounded' src={book.data.ImageURL} />
									</a>
								</Card>
							))}
						</Carousel>
					</div>
				</div>
			</div>

			<div>
				<div className='content'>
					<h2>Steal Deal</h2>
					<div className='crs'>
						<Carousel className='d-flex overflow-auto' focusOnSelect={true} centerMode={true} responsive={responsive} showDots={false}>
							{DiscountBooks.slice(0, 15).map(book => (
								<Card key={book.id} className='bookcard m-2 p-1 border-0 shadow position-relative'>
									<a href={`/BookDetails/${book.id}`}>
										<img className='product--image rounded' src={book.data.ImageURL} />
									</a>
								</Card>
							))}
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
