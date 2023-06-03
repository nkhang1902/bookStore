/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../Home/Home.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CardGroup, Card } from 'react-bootstrap'
import { db } from '../../firebase/config'
import {
    Firestore,
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    orderBy,
    query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
    },
}

const Home = () => {
    const [open, setOpen] = React.useState(false)
    const [Books, setBooks] = useState([])
    const [NewBooks, setNewBooks] = useState([])
    const [DiscountBooks, setDisBooks] = useState([])
    const [RandomBooks, setRandomBooks] = useState([])

    function AllBooks() {
        const bookCollection = collection(db, 'Book');
        getDocs(bookCollection)
          .then((response) => {
            const books = response.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));
            setBooks(books);
      
            // Extract new release books and discount books from the fetched books array
            const newReleaseBooks = books.sort((a, b) => b.data.PostedDate - a.data.PostedDate);
            setNewBooks(newReleaseBooks.slice(0, 15)); // Adjust the limit as per your requirement
      
            const discountBooks = books.sort((a, b) => a.data.DiscountPrice - b.data.DiscountPrice);
            setDisBooks(discountBooks.slice(0, 15)); // Adjust the limit as per your requirement
      
            // Get 4 random books from a copy of the fetched books array
            const randomBooks = getRandomBooks([...books], 4); // Create a copy of the books array
            setRandomBooks(randomBooks);
            books.sort(() => 0.5 - Math.random());
          })
          .catch((error) => console.log(error.message));
      }
      
      function getRandomBooks(books, count) {
        const shuffled = books.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }

    useEffect(() => {
        AllBooks()
    }, [])
    return (
        <div className="background">
            <div class="d-flex justify-content-center">
                    <a href='/fiction/bestseller'><img className='text-center' src="https://jackets.wordery.com/cms/00000000/scale/ae5e509bee16a2b618df98a16045771844e09efce84f08e80d9b2f374e7e12ac4967d7fe5bf0435776873933ebb309a7L0bVqsHqqIm0UiBZjtTphNkcMv7Lhu5NZbnMOiqsDTLZ8pWvYa53tMmT5cKmo2EWIDjtxtGN3R509tGohFo1pg/2021%20November/bestsellers_main%20homepage_d.png" alt="1"/>
                    </a>
            </div>
            <div>
                <div className="content">
                    <h2 className='crs_title'>Introducing to you</h2>
                    <div className="crs shadow-sm border border-light rounded d-flex flex-wrap justify-content-center">
                         {RandomBooks.slice(0, 4).map((book) => (
                                <Card
                                    key={book.id}
                                    className="col-lg-5 col-md-6 col-sm-12 m-2 p-1 border-0 shadow"
                                >
                                    <a href={`/BookDetails/${book.id}`} className="row space-around">
                                        <img
                                            className="col-3 product--image rounded"
                                            src={book.data.ImageURL}
                                        />
                                        <div className='col-9 justify-content-center'  style={{ overflowWrap: 'break-word' }}>
                                            <div className='bookTitle mb-1'>{book.data.Name.slice(0, 35) +
                                            (book.data.Name.length > 50 ? "..." : "")}</div>
                                            <div className='bookAuthor mb-1'>{book.data.Author}</div>
                                            <div className='bookDes mb-1'>{book.data.Description.slice(0, 250) +
                                            (book.data.Description.length > 50 ? "..." : "")}</div>
                                        </div>
                                    </a>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="content">
                    <h2 className='crs_title'>Recommend</h2>
                    <div className="crs shadow-sm border border-light rounded">
                        <Carousel
                            className="d-flex overflow-auto"
                            focusOnSelect={true}
                            centerMode={true}
                            responsive={responsive}
                            showDots={false}
                        >
                            {Books.slice(0, 15).map((book) => (
                                <Card
                                    key={book.id}
                                    className="bookcard m-2 p-1 border-0 shadow position-relative"
                                >
                                    <a href={`/BookDetails/${book.id}`}>
                                        <img
                                            className="product--image rounded"
                                            src={book.data.ImageURL}
                                        />
                                    </a>
                                </Card>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>

            <div>
                <div className="content  ">
                    <h2 className='crs_title'>New Release</h2>
                    <div className="crs shadow-sm border border-light rounded">
                        <Carousel
                            className="d-flex overflow-auto "
                            focusOnSelect={true}
                            centerMode={true}
                            responsive={responsive}
                            showDots={false}
                        >
                            {NewBooks.slice(0, 15).map((book) => (
                                <Card
                                    key={book.id}
                                    className="bookcard m-2 p-1 border-0 shadow position-relative"
                                >
                                    <a href={`/BookDetails/${book.id}`}>
                                        <img
                                            className="product--image rounded"
                                            src={book.data.ImageURL}
                                        />
                                    </a>
                                </Card>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>

            <div>
                <div className="content">
                    <h2 className='crs_title'>Steal Deal</h2>
                    <div className="crs shadow-sm border border-light rounded">
                        <Carousel
                            className="d-flex overflow-auto"
                            focusOnSelect={true}
                            centerMode={true}
                            responsive={responsive}
                            showDots={false}
                        >
                            {DiscountBooks.slice(0, 15).map((book) => (
                                <Card
                                    key={book.id}
                                    className="bookcard m-2 p-1 border-0 shadow position-relative"
                                >
                                    <a href={`/BookDetails/${book.id}`}>
                                        <img
                                            className="product--image rounded"
                                            src={book.data.ImageURL}
                                        />
                                    </a>
                                </Card>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
