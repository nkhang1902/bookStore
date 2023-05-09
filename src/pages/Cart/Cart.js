import React, {useState} from 'react';
import { UserContext } from '../../components/userContext';
import { useContext } from 'react';
import { db, auth } from '../../firebase/config';
import { Firestore, collection, getDoc, getDocs, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './_Cart.scss';
function Cart() {
	const [cart, setCart] = useState(1);
	const [currentUser, setCurrentUser] = useState(null);
	const [userData, setUserData] = useState(null);
	const [email, setEmail] = useState(null);
	const [books, setBooks] = useState([]);

	const fetchUserData = async () => {
		if (email) {
		const q = query(
			collection(db, "User"),
			where("Email", "==", email)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setUserData(doc.data());
		});
		}
	};

	const fetchCart = async () => {
		console.log(userData.Cart);
		if (userData && userData.Cart) {
		const bookPromises = userData.Cart.map(async (bookId) => {
			const bookRef = doc(db, "Book", bookId);
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
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
		setCurrentUser(user);
		console.log(user.email);
		setEmail(user.email);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		fetchUserData();
	}, [email]);

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
					{/* <div className='cart-item'>
						<table className='cart-detail'>
							<thead>
								<tr className='cart-items_headers'>
									<th class='cart-item-item-description-header' colspan='3'>
										Item
									</th>
									<th class='cart-item-quantity-header px-2'>Qty</th>
									<th class='cart-item-price-header text-right px-4'>Price</th>
									<th class='cart-item-delete-header'></th>
								</tr>
							</thead>
							<tbody>
								<tr className='cart-item'>
									<div className='cart-item-image'>
										<img src='https://via.placeholder.com/150' alt='product' />
									</div>
									<td className='cart-item-title'>Her body and Other parties Stories</td>
									<td className='cart-item-author'>Carmen Maria Machado</td>
									<td className='cart-item-status'>V Available</td>
								</tr>
							</tbody>
						</table>
					</div> */}
				</div>
			</section>
			<div class='shopping-cart'>
				{/* <!-- Title --> */}
				<div className='titles-container'>
					<div class='title'>Shopping Bag</div>
					<div class='title-quantity'>Quantity</div>
					<div class='title-price'>Price</div>
				</div>

				{/* <!-- Product #1 --> */}
				{books.map(book=>(<div key={book.id} class='item'>
					<div class='image'>
						<img src={book.data.ImageURL} alt='' />
					</div>
					<div class='item-description'>
						<span>{book.data.Name}</span>
						<span>{book.data.Author}</span>
						<span>White</span>
					</div>

					<div class='quantity'>
						<button class='plus-btn' type='button' name='button'>
							<i class='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button class='minus-btn' type='button' name='button'>
							<i class='fa-solid fa-plus'></i>
						</button>
					</div>

					<div class='total-price line-through'>{book.data.Price}</div><div class='total-price'>{book.data.DiscountPrice}</div>
					<div class='buttons'>
						<span class='delete-btn'>
							<i class='fa-solid fa-trash'></i>
						</span>
						<span class='like-btn'></span>
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
