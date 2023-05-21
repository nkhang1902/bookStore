import React, { createElement } from 'react'
import './_BookDetails.scss'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { useFetcher, useParams } from 'react-router-dom'
import {
    Firestore,
    collection,
    getDoc,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    orderBy,
    query,
    where,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore'
import { useState } from 'react'
import { db, auth } from './../../firebase/config'
import { useEffect } from 'react'
import RatingStars from '../../components/Rating Stars/RatingStars'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BookDetails() {
    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [email, setEmail] = useState(null)

    const [open, setOpen] = useState(false)
    const [book, setBook] = useState(null)
    const [listReview, setListReview] = useState([]) // List of reviews for the current book
    const { id } = useParams()

    async function getBookById(id) {
        const bookRef = doc(db, 'Book', id)
        const bookSnapshot = await getDoc(bookRef)
        if (bookSnapshot.exists()) {
            const bookData = bookSnapshot.data()
            setBook({ id: bookSnapshot.id, ...bookData })
        } else {
            throw new Error('Book not found')
        }
    }

    const fetchUserData = async () => {
        if (email) {
            const q = query(collection(db, 'User'), where('Email', '==', email))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUserData(doc.data())
            })
        }
    }

    const addToCart = () => {
		if (userData.Cart.includes(book.id))
		{
		  toast.error(`${book.data.Name} is already in cart`, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
			hideProgressBar: true,
		  });
		  return;
		}
		if (userData && book) {
		  const updatedCart = [...userData.Cart, book.id];
		  updateCartInFirestore(updatedCart);
		  setUserData({ ...userData, Cart: updatedCart });
		  toast.success(`${book.data.Name} added to cart`, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
			hideProgressBar: true,
		  });
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

	const addToFav = () => {
		if (userData.Cart.includes(book.id))
		{
		  toast.error(`${book.Name} is already in wishlist`, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
			hideProgressBar: true,
		  });
		  return;
		}
		if (userData && book) {
		  const updatedWishlist = [...userData.Favourite, book.id];
		  updateWishlistInFirestore(updatedWishlist);
		  setUserData({ ...userData, Favourite: updatedWishlist });
		  toast.success(`${book.Name} added to wishlist`, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 2000,
			hideProgressBar: true,
		  });
		}
	  };
	
	const updateWishlistInFirestore = async (updatedWishlist) => {
		if (email) {
			const q = query(collection(db, "User"), where("Email", "==", email));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (doc) => {
			await updateDoc(doc.ref, { Favourite: updatedWishlist}); // Update the Cart field in Firestore
			});
		}
		};

    const fetchAllReivewsInCurrentBook = async () => {
        const q = query(collection(db, 'Review'), where('BookID', '==', id))
        const querySnapshot = await getDocs(q)

        setListReview(querySnapshot.docs.map((doc) => doc.data()))
    }

    function createElements(number) {
        var elements = []
        for (let i = 0; i < number; i++) {
            elements.push(
                <div
                    className="star"
                    key={i}
                >
                    ★
                </div>
            )
        }
        return elements
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setEmail(user.email)
        })

        return unsubscribe
    }, [])
    useEffect(() => {
        fetchAllReivewsInCurrentBook()
    }, [])
    useEffect(() => {
        if (email) {
            fetchUserData()
        }
    }, [email])

    getBookById(id)
    if (!book) {
        // Render a loading spinner or message until the book has been retrieved
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className="book-details-container">
                <img
                    src={book.ImageURL}
                    alt="book cover"
                    className="book-image"
                    onClick={() => setOpen(true)}
                />
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box>
                        <img
                            src={book.ImageURL}
                            alt="book cover"
                            className="book-image modal-img"
                        />
                    </Box>
                </Modal>
                <div className="book-details">
                    <h1 className="book-title">{book.Name}</h1>
                    <p className="book-author">
                        <span className="book-author--purple">
                            {book.Author}
                        </span>{' '}
                        (Author)
                    </p>
                    <div className="price">
                        <div className="format_type-container">
                            <div className="format_type-paperback-cover">
                                <div className="format_type paperback">
                                    Price
                                </div>
                                <div className="format_type paperback__price text-decoration-line-through">
                                    ${book.Price}
                                </div>
                            </div>
                            <div className="format_type-hard-cover">
                                <div className="format_type hard-cover">
                                    Discount Price
                                </div>
                                <div className="format_type paperback__price">
                                    ${book.DiscountPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="available">
                        <div className="available__in-stock">
                            <i className="fa-solid fa-circle-check"></i>
                            Available
                        </div>
                    </div>
                    <div className="btn-groups">
                        <button
                            className="btn btn--primary"
                            onClick={addToCart}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                            Add to Cart
                        </button>
                        <button
                            className="btn btn--secondary"
                            onClick={addToFav}
                        >
                            <i className="fa-regular fa-bookmark"></i>
                            Add to Wishlist
                        </button>
                    </div>
                    <div className="description">
                        <h3 className="des-title">Description</h3>
                        <div className="des-content">
                            <p>{book.Description}</p>
                        </div>
                    </div>
                    <div className="product-details">
                        <h3 className="">Product Details</h3>
                        <div className="product-details__content">
                            <b>Price</b>
                            <b>${book.Price}</b>

                            <b>Publish Date</b>
                            <div>{book.PublishDate}</div>

                            <b>Pages</b>
                            <div>{book.Pages}</div>

                            <b>Dimensions</b>
                            <div>{book.Size}</div>

                            <b>Language</b>
                            <div>{book.Language}</div>
                        </div>
                    </div>
                    <div className="user-reviews">
                        <h3 className="">Tell us your thoughts</h3>
                        <RatingStars
                            bookID={id}
                            {...book}
                            createElements={createElement}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="reviews-list">
                        <h3 className="">Reviews</h3>
                        <div className="reviews-list__content">
                            {listReview.map((review, index) => {
                                return (
                                    <div
                                        className="review"
                                        key={index}
                                    >
                                        <div className="review__user">
                                            <div className="review__user--name">
                                                {review.UserName}
                                            </div>
                                            <div className="rated-stars-container">
                                                {createElements(review.Rating)}
                                            </div>
                                            <div className="review__text">
                                                {'"' + review.Review + '"'}
                                            </div>
                                            <span className="review__user--date">
                                                {review.PostedDate.slice(
                                                    0,
                                                    '12'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default BookDetails
