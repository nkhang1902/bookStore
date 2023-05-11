import React from 'react'
import { db,auth } from '../firebase/config'
import { Firestore, collection, getDoc, getDocs, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

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
    return (
      <div>
        <h1>Favourites</h1>
        {books.map((book) => (
        <div key={book.id}>
          {book.Name}
        </div>
      ))}
      </div>
    );
  }};

export default Wishlist