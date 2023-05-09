import React from 'react'
import { useContext } from 'react';
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
    console.log(userData.Favourite);
    if (userData && userData.Favourite) {
      const bookPromises = userData.Favourite.map(async (bookId) => {
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
    fetchFavourites();
  }, [userData]);
  
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <img src={book.data.ImageURL}/>
          <h2>{book.data.Name}</h2>
          <p>{book.data.Author}</p>
        </div>
      ))}
    </div>
  );
}

export default Wishlist