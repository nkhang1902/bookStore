import React,{useState} from 'react';
import '../pages/Smallcss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar,faStarHalf } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'


import { db } from '../firebase/config'
import { Firestore, collection, getDocs, addDoc, doc, deleteDoc, orderBy, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
const options = [
    { value: 'Desc', label: 'Price decrease' },
    { value: 'Asc', label: 'Price ascending' }
  ]



const Small = () => {
    const {catagory} = useParams();
    const [Books, setBooks] = useState([]);
    function AllBooks() {
        const bookCollection = collection(db,'Book');
        getDocs(query(bookCollection, where('Category','==',catagory))).then(response => {
            const book = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,}))
            setBooks(book)
        }).catch(error => console.log(error.message))
      }
      useEffect(()=>{
        AllBooks();
      }, [])
  const [price,setPrice] =  useState(0)
  return (
    <section className='filer'>
      <div className="container">
        <div className="row">

          <div className="col-lg-3">
            <p className='filer_title'>Filter by</p>
            <hr />
            <h1>Author</h1>
            <form className='File_auth'>
              <div>
                  <input type="checkbox" id="Author" name="Author" checked/>
                  <label for="Author">All</label>
              </div>
              <div>
                  <input type="checkbox" id="Author" name="Author" />
                  <label for="Author">Scales</label>
              </div>

              <div>
                  <input type="checkbox" id="Author" name="Author"/>
                  <label for="Author">Horns</label>
              </div>
            </form>
            <hr />
            <h1>Publication Date</h1>
            <form className='File_year'>
              <div>
                <input  type="radio" id="year" name="year" />
                <label for="year">All</label>
              </div>
              <div>
                <input type="radio" id="year" name="year" />
                <label for="year">2000s</label>
              </div>

              <div>
                <input type="radio" id="year" name="year" />
                <label for="year">2010s</label>
              </div>
              <div>
                <input type="radio" id="year" name="year" />
                <label for="year">2020s</label>
              </div>
            </form>
            <hr />
            <h1>Price</h1>
            <form className='File_price'>
            <div>
              <p>{price}</p>
              <input type="range" min='0' max='1000000' step='1000' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            </form>

            <hr />
            <h1>Rating</h1>
            <form className='File_rating'>
              <div>
                  <input type="checkbox" id="rating" name="rating" checked/>
                  <label for="rating">All</label>
              </div>
              <div>
                  <input type="checkbox" id="rating" name="rating" />
                  <label for="rating">
                    <FontAwesomeIcon icon={faStar} />
                  </label>
              </div>

              <div>
                  <input type="checkbox" id="rating" name="rating"/>
                  <label for="rating">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </label>
              </div>
              <div>
                  <input type="checkbox" id="rating" name="rating" />
                  <label for="rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  </label>
              </div>
              <div>
                  <input type="checkbox" id="rating" name="rating" />
                  <label for="rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  </label>
              </div>
              <div>
                  <input type="checkbox" id="rating" name="rating" />
                  <label for="rating">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  </label>
              </div>
            </form>

          </div>
            <div className="col-lg-9 Pro">
                <h1>Fiction</h1>
                    <p>Science fiction (sometimes shortened to sf or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. Science fiction can trace its roots to ancient mythology. It is related to fantasy, horror, and superhero fiction and contains many subgenres.</p>
                    <div className= 'Select'>
                        <Select className='Select-item' options={options} />
                    </div>
                    <div class = "products">
                        {Books.slice(0, 15).map(book=>(
                            <a  href={`/BookDetails/${book.id}`}><img class='product--image rounded' src={book.data.ImageURL}/>

                            </a>
                        ))}

                    </div>
                    
                    <div class = "products">
                        <div class = "pro_container">
                            <div class = "product-items">
                                {Books.slice(0, 15).map(book=>(
                                    <a  href={`/BookDetails/${book.id}`}>
                                        <div class = "product">
                                    <div class = "product-content">
                                        <div class = "product-img">
                                            <img src = {book.data.ImageURL} alt = "product image"/>
                                        </div>
                                        <div class = "product-btns">
                                            <button type = "button" class = "btn-cart"> add to cart
                                                <span><i class = "fas fa-plus"></i></span>
                                            </button>
                                            <button type = "button" class = "btn-buy"> buy now
                                                <span><i class = "fas fa-shopping-cart"></i></span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class = "product-info">
                                        <div class = "product-info-top">
                                            <h1 class = "sm-title">{book.Name}</h1>
                                            <div class = "rating">
                                                <span><i class = "fas fa-star"></i></span>
                                                <span><i class = "fas fa-star"></i></span>
                                                <span><i class = "fas fa-star"></i></span>
                                                <span><i class = "fas fa-star"></i></span>
                                                <span><i class = "far fa-star"></i></span>
                                            </div>
                                        </div>
                                        <a href = "#" class = "product-name">{book.Author}</a>
                                        <p class = "product-price">{book.Price}</p>
                                        <p class = "product-price">{book.DiscountPrice}</p>
                                    </div>

                                    <div class = "off-info">
                                        <h2 class = "sm-title">25% off</h2>
                                    </div>
                                </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
            </div>
        </div>
      </div>
    </section>
  )
}

export default Small