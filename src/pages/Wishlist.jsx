import React from 'react'
import { db,auth } from '../firebase/config'
import { Firestore, updateDoc, collection, getDoc, getDocs, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Wishlist = () => {
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

  const fetchFavourites = async () => {
    if (userData && userData.Favourite) {
      console.log(userData.Favourite)
      const bookPromises = userData.Favourite.map(async (bookId) => {
        try {
          const bookRef = doc(db, 'Book', bookId);
          const bookSnapshot = await getDoc(bookRef);
          if (bookSnapshot.exists()) {
            const bookData = bookSnapshot.data();
            console.log(bookData);
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

  const removeFromList= async (bookId) => {
		if (userData && userData.Favourite && userData.Favourite.includes(bookId)) {
		  const updatedFavourite = userData.Favourite.filter((id) => id !== bookId); // Filter out the book ID from the cart array
		  updateFavouriteInFirestore(updatedFavourite); // Update the cart in Firestore
		  setUserData({ ...userData, Favourite: updatedFavourite }); // Update the local state with the updated cart
		}
	  };

	const updateFavouriteInFirestore = async (updatedFavourite) => {
		if (email) {
		  const q = query(collection(db, "User"), where("Email", "==", email));
		  const querySnapshot = await getDocs(q);
		  querySnapshot.forEach(async (doc) => {
			await updateDoc(doc.ref, { Favourite: updatedFavourite }); // Update the Cart field in Firestore
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
    fetchFavourites();
  }, [userData]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  if (email === null) {
    return <div>You haven't logged in yet!!</div>;
  } else {
    if (books.length === 0) {
      return (
        <section className='cart-container' >
          <h1 className='h1'>Wishlist</h1>
          <div className='design-system'>
            <a href='#' className='cart-redeem '>
              Have a gift card? Redeem it here!
            </a>
          </div>
          <div className='empty_cart'>
            <p className='empty_cart--title'>Your list is empty</p>
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
      <div>
      <section className='cart-container'>
				<h1 className='h1'>Your Wishlist</h1>
			</section>
      <div class='shopping-cart'>
				{/* <!-- Title --> */}
				<div className='titles-container'>
					<div class='title  col-7'>Books</div>
					<div class='title-price text-center  col-2'>Price</div>
					<div class='title-price text-center  col-3'></div>
				</div>

				{/* <!-- Product #1 --> */}
				{books.map(book=>(<div key={book.id} class='item'>
					<a key={book.id}href={`/BookDetails/${book.id}`}>
						<div class='image'>
							<img src={book.ImageURL} alt='' />
						</div>
					</a>
					<div class='item-description p-3 col-9'>
						<span>{book.Name}</span>
						<span>{book.Author}</span>
						<span>{book.Description.slice(0, 200) + (book.Description.length > 50 ? '...' : '')}</span>
					</div>

					<div className='col-2 my-3'><div class='text-center'>${book.DiscountPrice}</div><div class='text-center m-0 text-decoration-line-through'>${book.Price}</div></div>
					<div class='buttons col-3 text-center '>
						<span class='delete-btn text-center' onClick={() => removeFromList(book.id)}>
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
      </div>
    );
  }};

export default Wishlist