/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { UserContext } from '../../components/userContext';
import { useContext } from 'react';
import { db } from '../../firebase/config';
import { Firestore, collection, getDoc, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './_Cart.scss';
function Cart() {
	const [cart, setCart] = useState(1);
	const { userData } = useContext(UserContext);
	const cartItem = userData.cart;
	const [books, setBooks] = useState([]);

	async function fetchCart() {
		const bookPromises = cartItem.map(async (bookId) => {
		const bookRef = doc(db, 'Book', bookId);
		const bookSnapshot = await getDoc(bookRef);
		if (bookSnapshot.exists()) {
			const bookData = bookSnapshot.data();
			return { id: bookSnapshot.id, ...bookData };
		} else {
			return null;
		}
		});

		const bookData = await Promise.all(bookPromises);
		setBooks(bookData.filter((book) => book !== null));
	}

	useEffect(() => {
		fetchCart();
	}, [userData]);

	const total = books.reduce((acc, book) => {
		return acc + book.data.DiscountPrice;
	  }, 0);

	if (cart.length === 0) {
		return (
			<section className='cart-container'>
				<h1 className='h1'>Shopping Cart</h1>
				<div className='design-system'>
					<a href='#' className='cart-redeem '>
						Have a gift card? Redeem it here!
					</a>
				</div>
				<div className='empty_cart'>
					<p className='empty_cart--title'>Your cart is empty</p>
					<p>
						<a className='button continue' href='#'>
							Continue shopping
						</a>
					</p>
				</div>
			</section>
		);
	}
	return (
		<>
			<section className='cart-container'>
				<h1 className='h1'>Shopping Cart</h1>
				<div className='design-system'>
					<a href='#' className='cart-redeem'>
						Have a gift card? Redeem it here!
					</a>
				</div>
				<div className='checkout-container'>
					<a className='button continue' href='#'>
						Checkout ({total})
					</a>
				</div>
			</section>
			<div className='shopping-cart'>
				{/* <!-- Title --> */}
				<div className='titles-container'>
					<div className='title'>Shopping Bag</div>
					<div className='title-quantity'>Quantity</div>
					<div className='title-price'>Price</div>
				</div>

				{/* <!-- Product #1 --> */}
				{books.map(book=>(<div key={book.id} className='item'>
					<div className='image'>
						<img src={book.data.ImageURL} alt='' />
					</div>
					<div className='item-description'>
						<span>{book.data.Name}</span>
						<span>{book.data.Author}</span>
						<span>White</span>
					</div>

					<div className='quantity'>
						<button className='plus-btn' type='button' name='button'>
							<i className='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button className='minus-btn' type='button' name='button'>
							<i className='fa-solid fa-plus'></i>
						</button>
					</div>

					<div className='total-price line-through'>{book.data.Price}</div><div className='total-price'>{book.data.DiscountPrice}</div>
					<div className='buttons'>
						<span className='delete-btn'>
							<i className='fa-solid fa-trash'></i>
						</span>
						<span className='like-btn'></span>
					</div>
				</div>))}
				<div className='empty_cart'>
					<p>
						<Link className='button' to={"/"}>
							Continue shopping
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Cart;
