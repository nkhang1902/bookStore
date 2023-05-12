import React, {useState} from 'react';
import { UserContext } from '../../components/userContext';
import { useContext } from 'react';
import { db, auth } from '../../firebase/config';
import { Firestore, collection, getDoc, getDocs, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './_Cart.scss';
function Cart() {
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
		if (userData && userData.Cart) {
		const bookPromises = userData.Cart.map(async (bookId) => {
			try {
			const bookRef = doc(db, 'Book', bookId);
			const bookSnapshot = await getDoc(bookRef);
			if (bookSnapshot.exists()) {
				const bookData = bookSnapshot.data();
				return { id: bookSnapshot.id, ...bookData };
			}
			} catch (error) {
			console.log('Error fetching book:', error);
			}
			return null;
		});
	
		const bookData = await Promise.all(bookPromises);
		setBooks(bookData.filter((book) => book !== null));
		}
	};

	const removeFromCart = async (bookId) => {
		if (userData && userData.Cart && userData.Cart.includes(bookId)) {
		  const updatedCart = userData.Cart.filter((id) => id !== bookId); // Filter out the book ID from the cart array
		  updateCartInFirestore(updatedCart); // Update the cart in Firestore
		  setUserData({ ...userData, Cart: updatedCart }); // Update the local state with the updated cart
		}
	  };

	const updateCartInFirestore = async (updatedCart) => {
		if (email) {
		  const q = query(collection(db, "User"), where("Email", "==", email));
		  const querySnapshot = await getDocs(q);
		  querySnapshot.forEach(async (doc) => {
			await updateDoc(doc.ref, { Cart: updatedCart }); // Update the Cart field in Firestore
		  });
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
		if (email) {
		  fetchUserData();
		}
	  }, [email]);

	useEffect(() => {
		fetchCart();
	}, [userData]);

	useEffect(() => {
		console.log(books);
	}, [books]);

	const total = books.reduce((acc, book) => {
		const price = acc + book.DiscountPrice;
		return parseFloat(price.toFixed(2));;
	  }, 0);

	if (books.length === 0) {
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
					<Link className='button' to={"/"}>
							Continue shopping
						</Link>	
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
					<div class='title  col-7'>Shopping Bag</div>
					<div class='title-quantity text-center col-2'>Quantity</div>
					<div class='title-price text-center  col-2'>Price</div>
					<div class='title-price text-center  col-1'></div>
				</div>

				{/* <!-- Product #1 --> */}
				{books.map(book=>(<div key={book.id} class='item'>
					<a key={book.id}href={`/BookDetails/${book.id}`}>
						<div class='image col-3'>
							<img src={book.ImageURL} alt='' />
						</div>
					</a>
					<div class='item-description p-3 col-5'>
						<span>{book.Name}</span>
						<span>{book.Author}</span>
						<span>{book.Description.slice(0, 200) + (book.Description.length > 50 ? '...' : '')}</span>
					</div>

					<div class='quantity text-center col-2'>
						<button className='btn-danger' type='button' name='button'>
							-
						</button>
						<input type='text' name='name' value='1' />
						<button className='btn-danger' type='button' name='button'>
							+
						</button>
					</div>

					<div className='col-2 my-3'><div class='text-center'>${book.DiscountPrice}</div><div class='text-center m-0 text-decoration-line-through'>${book.Price}</div></div>
					<div class='buttons col-1 text-center '>
						<span class='delete-btn text-center ' onClick={() => removeFromCart(book.id)}>
							<i class='fa-solid fa-trash'></i>
						</span>
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
