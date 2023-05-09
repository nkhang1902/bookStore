import React from 'react'
import { UserContext } from '../components/userContext'
import { useContext } from 'react';
import { db } from '../firebase/config'
import { Firestore, collection, getDoc, addDoc, doc, deleteDoc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Wishlist = () => {
  const { userData } = useContext(UserContext);
  const favourites = userData.Favourite;

  const [books, setBooks] = useState([]);

  async function fetchFavourites() {
    const bookPromises = favourites.map(async (bookId) => {
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