import React from 'react';
import './_BookDetails.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {collection, getDocs} from 'firebase/firestore';
import {useState} from 'react';
import {db} from './../../firebase/config';
import {useEffect} from 'react';
function BookDetails() {
	const [open, setOpen] = React.useState(false);
	const [books, setBooks] = useState([]);
	const [book, setBook] = useState({});
	function getBooks() {
		const bookCollectionRef = collection(db, 'Book');
		getDocs(bookCollectionRef)
			.then(response => {
				const fetchedBooks = response.docs.map(book => {
					return {
						data: book.data(),
						id: book.id,
					};
				});
				setBooks(fetchedBooks);
			})
			.catch(error => console.log(error.message));
	}
	useEffect(() => {
		getBooks();
		// setBook(books.slice(0, 1));
	}, []);

	useEffect(() => {
		console.log(book);
	}, [books]);
	const oneBook = books.slice(0, 1).map(book => book.data.ImageURL);
	return (
		<>
			<div className='book-details-container'>
				<img src={books.slice(0, 1).map(book => book.data.ImageURL)} alt='book cover' className='book-image' onClick={() => setOpen(true)} />
				<Modal open={open} onClose={() => setOpen(false)}>
					<Box>
						<img src={books.slice(0, 1).map(book => book.data.ImageURL)} alt='book cover' className='book-image modal-img' />
					</Box>
				</Modal>
				<div className='book-details'>
					<h1 className='book-title'>{books.slice(0, 1).map(book => book.data.Name)}</h1>
					<p className='book-author'>
						<span className='book-author--purple'>{books.slice(0, 1).map(book => book.data.Author)}</span> (Author)
					</p>
					<div className='price'>
						Format
						<div className='format_type-container'>
							<div className='format_type-paperback-cover'>
								<div className='format_type paperback'>Paperback</div>
								<div className='format_type paperback__price'>${books.slice(0, 1).map(book => book.data.Price)}</div>
							</div>
							<div className='format_type-hard-cover'>
								<div className='format_type hard-cover'>Hardcover</div>
								<div className='format_type paperback__price'>${books.slice(0, 1).map(book => book.data.DiscountPrice)}</div>
							</div>
						</div>
					</div>
					<div className='available'>
						<div className='available__in-stock'>
							<i className='fa-solid fa-circle-check'></i>Available
						</div>
					</div>
					<div className='btn-groups'>
						<button className='btn btn--primary'>
							<i className='fa-solid fa-cart-plus'></i>
							Add to Cart
						</button>
						<button className='btn btn--secondary'>
							<i className='fa-regular fa-bookmark'></i>
							Add to Wishlist
						</button>
					</div>
					<div className='description'>
						<h3 className='des-title'>Description</h3>
						<div className='des-content'>
							<p>{books.slice(0, 1).map(book => book.data.Description)}</p>
						</div>
					</div>
					<div className='product-details'>
						<h3 className=''>Product Details</h3>
						<div className='product-details__content'>
							<b>Price</b>
							<b>${books.slice(0, 1).map(book => book.data.Price)}</b>

							<b>Publisher</b>
							<div>Quirk Books</div>

							<b>Publish Date</b>
							<div>{books.slice(0, 1).map(book => book.data.PublishDate)}</div>

							<b>Pages</b>
							<div>{books.slice(0, 1).map(book => book.data.Pages)}</div>

							<b>Dimensions</b>
							<div>{`${books.slice(0, 1).map(book => book.data.Size)} cm`}</div>

							<b>{books.slice(0, 1).map(book => book.data.Language)}</b>
							<div>English</div>

							<b>Type</b>
							<div>Paperback</div>
						</div>
					</div>
					<div className='author'>
						<h3 className=''>About the Author</h3>
						<p className='author__content'>{books.slice(0, 1).map(book => book.data.Author)}</p>
					</div>
					<div className='reviews-list'>
						<h3 className=''>Reviews</h3>
						<b>Nominated for the 2018 Shirley Jackson Award for Best Novel</b>
						<br />
						<b>A 2019 Locus Award finalist for Best Horror Novel</b>
						<br />
						<b>An NPR Pop Culture Happy Hour Pick</b>
						<br />
						<b>An io9 2018 Fall Preview Pick</b>
						<br />
						"A good, creepy, music-tinged thriller."--<i>Entertainment Weekly</i>
						<br />
						"Grady Hendrix is a master of the horror genre."--<i>USA Today</i>
						<br />
						"Kickass, horrifying, and smart as hell. It certainly earns my two horns up.."--<i>--Dread Central</i>
						<br />
					</div>
				</div>
			</div>
		</>
	);
}

export default BookDetails;
