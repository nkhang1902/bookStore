import React from 'react';
import './_BookDetails.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import {collection, getDocs, getDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import {db} from './../../firebase/config';
import {useEffect} from 'react';

function BookDetails() {
	const [open, setOpen] = React.useState(false);
	const [book, setBook] = useState(null);
	const { id } = useParams();
	useEffect(()=>{
		console.log(id)
	  }, id);
		async function getBookById(id) {
		const bookRef = doc(db, 'Book', id);
		const bookSnapshot = await getDoc(bookRef);
		if (bookSnapshot.exists()) {
			const bookData = bookSnapshot.data();
			setBook({ id: bookSnapshot.id, ...bookData });
		} else {
			throw new Error('Book not found');
		}
		}
	getBookById(id);
	if (!book) {
		// Render a loading spinner or message until the book has been retrieved
		return <div>Loading...</div>;
	}
	return (
		<div style={{marginTop: '30px',}}>
			<div className='book-details-container'>
				<img src={book.ImageURL} alt='book cover' className='book-image' onClick={() => setOpen(true)} />
				<Modal open={open} onClose={() => setOpen(false)}>
					<Box>
						<img src={book.ImageURL} alt='book cover' className='book-image modal-img' />
					</Box>
				</Modal>
				<div className='book-details'>
					<h1 className='book-title'>{book.Name}</h1>
					<p className='book-author'>
						<span className='book-author--purple'>{book.Author}</span> (Author)
					</p>
					<div className='price'>
						<div className='format_type-container'>
							<div className='format_type-paperback-cover'>
								<div className='format_type paperback'>Price</div>
								<div className='format_type paperback__price'>${book.Price}</div>
							</div>
							<div className='format_type-hard-cover'>
								<div className='format_type hard-cover'>Discount Price</div>
								<div className='format_type paperback__price'>${book.DiscountPrice}</div>
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
							<p>{book.Description}</p>
						</div>
					</div>
					<div className='product-details'>
						<h3 className=''>Product Details</h3>
						<div className='product-details__content'>
							<b>Price</b>
							<b>${book.Price}</b>

							<b>Publish Date</b>
							<div>{book.PublishDate}</div>

							<b>Pages</b>
							<div>{book.Pages}</div>

							<b>Dimensions</b>
							<div>{book.Size} cm</div>

							<b>Language</b>
							<div>{book.Language}</div>

						</div>
					</div>
					<div className='author'>
						<h3 className=''>About the Author</h3>
						<p className='author__content'>{book.Author}</p>
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
		</div>
	);
}

export default BookDetails;
