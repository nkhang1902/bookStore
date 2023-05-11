import React from 'react';
import '../pages/Fictioncss.css';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';

import { db } from '../firebase/config'
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const Fiction = () => {
	const [New, setNew] = useState([]);
	const [Books, setBooks] = useState([]);
	const [Data,setData] = useState([]);
	
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
		setData(book)
	}).catch(error => console.log(error.message))
	}
	const uniqueCata = [...new Set(Data.map(item => item.data.Category))];
	console.log(uniqueCata)
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
					<p className="blog_sidebar_title">Catagory</p>
					<hr />
					<ul >
						{
							uniqueCata.map(cata=>(
								<li className="blog-sidebar-list"><a href={"/fiction/" + cata}>{cata}</a></li>
							))
						}
                      <li className="blog-sidebar-list"><a href='#'>Fantasy</a></li>
                    </ul>
				</div>
                <div className="col-lg-9 Main">
                    <div className='Title'>
						<h1 className='Small_main'>New release</h1>
						<a href="">view all</a>
					</div>
					<Carousel responsive={responsive}>
						{New.slice(0, 15).map(book=>( 
							<a href={`/BookDetails/${book.id}`}>
								<div className = "product">
									<div className = "product_content">
										<div >
											<img className = "product--image" src = {book.data.ImageURL} alt = "product image"/>
										</div>
										<div className = "product_btns">
											<button type = "button" className = "btn_cart"> <i class="fa fa-heart" aria-hidden="true"></i>
											</button>
											<button type = "button" className = "btn_buy"> <i class="fa fa-cart-plus" aria-hidden="true"></i>
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
							<a  href={`/BookDetails/${book.id}`}>
								<div className = "product">
									<div className = "product_content">
										<div>
											<img className = "product--image" src = {book.data.ImageURL} alt = "product image"/>
										</div>
										<div className = "product_btns">
											<button type = "button" className = "btn_cart"> <i class="fa fa-heart" aria-hidden="true"></i>
											</button>
											<button type = "button" className = "btn_buy"> <i class="fa fa-cart-plus" aria-hidden="true"></i>
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

export default Fiction