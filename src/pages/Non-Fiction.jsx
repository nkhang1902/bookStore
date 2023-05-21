import React from 'react';
import '../pages/Non-Fictioncss.css';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import { db } from '../firebase/config'
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Non_Fiction = () => {

	const [New, setNew] = useState([]);
	const [Books, setBooks] = useState([]);
	function NewBooks() {
		const bookCollection = collection(db, 'Book');
	  
		getDocs(query(bookCollection, orderBy('PostedDate', 'desc')))
		  .then((response) => {
			const books = response.docs.map((doc) => ({
			  data: doc.data(),
			  id: doc.id,
			}));
			setNew(books);
		  })
		  .catch((error) => console.log(error.message));
	  }

	function AllBooks() {
	const bookCollection = collection(db,'Book');
	getDocs(bookCollection).then(response => {
		const book = response.docs.map(doc => ({
			data: doc.data(),
			id: doc.id,}))
		setBooks(book)
	}).catch(error => console.log(error.message))
	}
	useEffect(()=>{
		NewBooks();
		AllBooks();
	}, [])

	const responsive = {
		superLargeDesktop: {
		  // the naming can be any, depends on you.
		  breakpoint: { max: 4000, min: 3000 },
		  items: 5
		},
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 3
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 2
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1
		}
	  };
  return (
    <section className="page-section">
		<div className="container">
			<div className="row">

				<div className="col-lg-3 Cata">
					<p className="blog_sidebar_title">Non-Fiction</p>
					<hr />
					<ul >
                      <li className="blog-sidebar-list"><a href='/non-fiction/Fantasy'>Fantasy</a></li>
                      <li className="blog-sidebar-list"><a>Adventure</a></li>
                      <li className="blog-sidebar-list"><a>Romance</a></li>
                      <li className="blog-sidebar-list"><a>Families & Relationships</a></li>
                      <li className="blog-sidebar-list"><a>Contemporary</a></li>
                      <li className="blog-sidebar-list"><a>Dystopian</a></li>
                      <li className="blog-sidebar-list"><a>Mystery</a></li>
                      <li className="blog-sidebar-list"><a>Horror</a></li>
                      <li className="blog-sidebar-list"><a>Thriller</a></li>
                      <li className="blog-sidebar-list"><a>Paranormal</a></li>
                      <li className="blog-sidebar-list"><a>Historical fiction</a></li>
                      <li className="blog-sidebar-list"><a>Science Fiction</a></li>
                      <li className="blog-sidebar-list"><a>Guide / How-to</a></li>
                      <li className="blog-sidebar-list"><a>Humor</a></li>
                    </ul>
				</div>
                <div className="col-lg-9 Main">
                    <h1>Non-Fiction</h1>
                    <p></p>
                    <div className='Title'>
						<h1 className='Small_main'>New release</h1>
						<a href="">view all</a>
					</div>
					<Carousel responsive={responsive}>
						{New.slice(0, 15).map(book=>( 
							<a href={`/BookDetails/${book.id}`}>
								<div className = "product">
									<div className = "product_content">
										<div className = "product_img">
											<img src = {book.data.ImageURL} alt = "product image"/>
										</div>
										<div className = "product_btns">
											<button type = "button" className = "btn_cart"> add to cart
												
											</button>
											<button type = "button" className = "btn_buy"> buy now
												
											</button>
										</div>
									</div>
								</div>
							</a>
							))}		
						</Carousel>
					<div className='Title'>
						<h1 className='Small_main'>Best Seller</h1>
						<a href="">view all</a>
					</div>
					<Carousel responsive={responsive}>
					{Books.slice(0, 15).map(book=>( 
							<a  href={`/BookDetails/${book.id}`}><img class='product--image rounded' src={book.data.ImageURL}/>
								<div className = "product">
									<div className = "product_content">
										<div className = "product_img">
											<img src = {book.data.ImageURL} alt = "product image"/>
										</div>
										<div className = "product_btns">
											<button type = "button" className = "btn_cart"> add to cart
												
											</button>
											<button type = "button" className = "btn_buy"> buy now
											</button>
										</div>
									</div>
								</div>
							</a>
						))}
					</Carousel>
				</div>
			</div>
		</div>
	</section>
  )
}

export default Non_Fiction