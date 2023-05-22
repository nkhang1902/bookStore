import React, { useState } from 'react'
import '../Small/Smallcss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

import { db, auth } from '../../firebase/config'
import {
    Firestore,
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    orderBy,
    query,
    where,
    select,
    and,
    startAt,
    endAt,
    updateDoc,
} from 'firebase/firestore'
import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Small = () => {
    const [price, setPrice] = useState(0)
    const [Books, setBooks] = useState([])
    const [Sort, setSort] = useState(false)
    const [SortedData, setSortedData] = useState([])
    const [datas, setDatas] = useState([])
    const location = useLocation()

    const param = useParams()

    let cata = param.catagory
    cata.replace(/\%20/g, ' ')

    const fetchBooksByKeyword = async (keyword) => {
        const bookRef = collection(db, 'Book')

        const querySnapshot = await getDocs(bookRef)
        const booksData = []

        querySnapshot.forEach((doc) => {
            const book = doc.data()

            // Remove whitespace from the book's name
            const trimmedName = book.Name.replace(/\s/g, '')
            const trimmedAuthor = book.Author.replace(/\s/g, '')
            const trimmedCategory = book.Category.replace(/\s/g, '')

            // Check if the trimmed name includes the keyword (case-insensitive)
            const lowercaseKeyword = keyword.toLowerCase()
            if (trimmedName.toLowerCase().includes(lowercaseKeyword)) {
                booksData.push({ id: doc.id, data: doc.data() })
            } else if (trimmedAuthor.toLowerCase().includes(lowercaseKeyword)) {
                booksData.push({ id: doc.id, data: doc.data() })
            } else if (
                trimmedCategory.toLowerCase().includes(lowercaseKeyword)
            ) {
                booksData.push({ id: doc.id, data: doc.data() })
            }
        })

        setBooks(booksData) // Update the Books state directly
        setDatas(booksData) // Update the Datas

        return
    }
    function NewReleaseBooks() {
        const bookCollection = collection(db, 'Book')

        getDocs(query(bookCollection, orderBy('PostedDate', 'desc')))
            .then((response) => {
                const books = response.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setBooks(books)
            })
            .catch((error) => console.log(error.message))
    }

    function BestSellerBooks() {
        const bookCollection = collection(db, 'Book')

        getDocs(query(bookCollection, orderBy('DiscountPrice', 'desc')))
            .then((response) => {
                const books = response.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }))
                setBooks(books)
            })
            .catch((error) => console.log(error.message))
    }
    useEffect(() => {
        if (window.location.pathname.split('/').pop().includes('newrelease')) {
            NewReleaseBooks()
            return
        }
        if (window.location.pathname.split('/').pop().includes('bestseller')) {
            BestSellerBooks()
            return
        }
        if (window.location.pathname.split('/').pop().includes('keyword')) {
            const keywordPath = window.location.pathname.split('/').pop()
            const keyword = decodeURIComponent(keywordPath.split('=')[1]) // Decode the keyword if it's encoded
            if (keyword) {
                fetchBooksByKeyword(keyword)
            }
            return
        } else {
            AllBooks()
        }
    }, [])

    const [currentUser, setCurrentUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [email, setEmail] = useState(null)

    const { id } = useParams()

    const fetchUserData = async () => {
        if (email) {
            const q = query(collection(db, 'User'), where('Email', '==', email))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUserData(doc.data())
            })
        }
    }

    const addToCart = (event, book) => {
        event.preventDefault()
        if (!userData) {
            toast.error(`You haven't logged in yet!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
            })
            return
        }
        if (userData.Cart.includes(book.id)) {
            toast.error(`${book.data.Name} is already in cart`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Duration for the notification to automatically close (in milliseconds)
                hideProgressBar: true,
            })
            return
        }
        if (userData && book) {
            const updatedCart = [...userData.Cart, book.id]
            updateCartInFirestore(updatedCart)
            setUserData({ ...userData, Cart: updatedCart })
            toast.success(`${book.data.Name} added to cart`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Duration for the notification to automatically close (in milliseconds)
                hideProgressBar: true,
            })
        }
    }

    const updateCartInFirestore = async (updatedCart) => {
        if (email) {
            const q = query(collection(db, 'User'), where('Email', '==', email))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, { Cart: updatedCart }) // Update the Cart field in Firestore
            })
        }
    }

    const addToFav = (event, book) => {
        event.preventDefault()
        if (!userData) {
            toast.error(`You haven't logged in yet!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
            })
            return
        }
        if (userData.Favourite.includes(book.id)) {
            toast.error(`${book.data.Name} is already in wishlist`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Duration for the notification to automatically close (in milliseconds)
                hideProgressBar: true,
            })
            return
        }
        if (userData && book) {
            const updatedWishlist = [...userData.Favourite, book.id]
            updateWishlistInFirestore(updatedWishlist)
            setUserData({ ...userData, Favourite: updatedWishlist })
            toast.success(`${book.data.Name} added to wishlist`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Duration for the notification to automatically close (in milliseconds)
                hideProgressBar: true,
            })
        }
    }

    const updateWishlistInFirestore = async (updatedWishlist) => {
        if (email) {
            const q = query(collection(db, 'User'), where('Email', '==', email))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, { Favourite: updatedWishlist }) // Update the Cart field in Firestore
            })
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            console.log(user.email)
            setEmail(user.email)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (email) {
            fetchUserData()
        }
    }, [email])

    function AllBooks() {
        const bookCollection = collection(db, 'Book')
        getDocs(query(bookCollection, where('Category', '==', `${cata}`)))
            .then((response) => {
                const book = response.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }))

                setBooks(book)
                setDatas(book)
            })
            .catch((error) => console.log(error.message))
    }
    const uniqueAuthor = [...new Set(datas.map((item) => item.data.Author))]
    const Change = (e) => {
        setSort(true)
        let temp = JSON.parse(JSON.stringify(Books))

        if (e.target.value === 'asc') {
            temp.sort(
                (obj1, obj2) =>
                    obj1.data.DiscountPrice - obj2.data.DiscountPrice
            )
            setSortedData(temp)
        } else if (e.target.value === 'desc') {
            temp.sort(
                (obj1, obj2) =>
                    obj2.data.DiscountPrice - obj1.data.DiscountPrice
            )
            setSortedData(temp)
        } else {
            setSortedData(Books)
        }
    }
    console.log(Books)
    const FilAuth = () => {
        var inputsauth = document.querySelectorAll('.Author')
        var inputyear = document.querySelectorAll('.year')
        var inputprice = document.querySelectorAll('.Price')
        const $select = document.querySelector('#selected')
        setSort(false)
        $select.value = ' '
        const auths = []
        for (var i = 0; i < inputsauth.length; i++) {
            if (inputsauth[i].checked && !auths.includes(inputsauth[i].value)) {
                auths.push(inputsauth[i].value)
            } else if (
                !inputsauth[i].checked &&
                auths.includes(inputsauth[i].value)
            ) {
                auths.filter((item) => item !== inputsauth[i].value)
            }
        }
        const year = []
        for (var i = 0; i < inputyear.length; i++) {
            if (inputyear[i].checked && !year.includes(inputyear[i].value)) {
                year.push(inputyear[i].value)
            } else if (
                !inputyear[i].checked &&
                year.includes(inputyear[i].value)
            ) {
                year.filter((item) => item !== inputyear[i].value)
            }
        }
        const arrOfNumYear = year
            .join()
            .split(',')
            .map((str) => {
                return parseInt(str, 10)
            })

        let maxyear = 2030
        let minyear = 0
        if (year.length != 0) {
            maxyear = Math.max(...arrOfNumYear)
            minyear = Math.min(...arrOfNumYear)
        }
        const price = []
        for (var i = 0; i < inputprice.length; i++) {
            if (inputprice[i].checked && !price.includes(inputprice[i].value)) {
                price.push(inputprice[i].value)
            } else if (
                !inputprice[i].checked &&
                year.includes(inputprice[i].value)
            ) {
                price.filter((item) => item !== inputprice[i].value)
            }
        }
        const arrOfNumprice = price
            .join()
            .split(',')
            .map((str) => {
                return parseInt(str, 10)
            })
        let maxprice = 10000
        let minprice = 0
        if (price.length != 0) {
            maxprice = Math.max(...arrOfNumprice)
            minprice = Math.min(...arrOfNumprice)
        }

        if (auths.length == 0) {
            const bookCollection = collection(db, 'Book')
            getDocs(query(bookCollection, where('Category', '==', `${cata}`)))
                .then((response) => {
                    const book = response.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                    let temp_book = []
                    for (let i = 0; i < book.length; i++) {
                        const a = parseInt(book[i].data.PublishDate.slice(-4))

                        if (
                            book[i].data.DiscountPrice >= minprice &&
                            book[i].data.DiscountPrice < maxprice
                        ) {
                            if (a >= minyear && a <= maxyear) {
                                temp_book.push(book[i])
                            }
                        }
                    }

                    setBooks(temp_book)
                })
                .catch((error) => console.log(error.message))
        } else {
            const bookCollection = collection(db, 'Book')
            getDocs(
                query(
                    bookCollection,
                    and(
                        where('Author', 'in', auths),
                        where('Category', '==', `${cata}`)
                    )
                )
            )
                .then((response) => {
                    const book = response.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                    let temp_book = []
                    for (let i = 0; i < book.length; i++) {
                        const a = parseInt(book[i].data.PublishDate.slice(-4))

                        if (
                            book[i].data.DiscountPrice >= minprice &&
                            book[i].data.DiscountPrice < maxprice
                        ) {
                            if (a >= minyear && a <= maxyear) {
                                temp_book.push(book[i])
                            }
                        }
                    }

                    setBooks(temp_book)
                })
                .catch((error) => console.log(error.message))
        }
    }

    return (
        <section className="filer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <p className="filer_title">Filter by</p>
                        <hr />
                        <form
                            className="File_auth"
                            onChange={FilAuth}
                        >
                            <h1>Author</h1>
                            {uniqueAuthor.slice(0, 6).map((uniauth, index) => (
                                <div>
                                    <input
                                        type="checkbox"
                                        id={'Author' + index}
                                        name="Author"
                                        className="Author"
                                        value={uniauth}
                                        style={{ marginRight: '5px' }}
                                    />
                                    <label for="Author">{uniauth}</label>
                                </div>
                            ))}
                            <hr />
                            <h1>Publication Date</h1>
                            <div>
                                <input
                                    type="checkbox"
                                    id="year"
                                    name="year"
                                    className="year"
                                    value={[1990, 2000]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="year">1900-2000</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="year"
                                    name="year"
                                    className="year"
                                    value={[2000, 2010]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="year">2000-2010</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="year"
                                    name="year"
                                    className="year"
                                    value={[2010, 2023]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="year">2010-2023</label>
                            </div>

                            <hr />
                            <h1>Price</h1>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Price"
                                    name="Price"
                                    className="Price"
                                    value={[0, 25]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="Price">0$ - 25$</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Price"
                                    name="Price"
                                    className="Price"
                                    value={[25, 50]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="Price">25$ - 50$</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="Price"
                                    name="Price"
                                    className="Price"
                                    value={[50, 100]}
                                    style={{ marginRight: '5px' }}
                                />
                                <label for="Price">50$ - 100$</label>
                            </div>
                        </form>

                        <hr />
                        <h1>Price</h1>
                        <form className="File_price">
                            <div>
                                <p style={{ marginBottom: '0px' }}>{price}</p>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-9 Pro">
                        <div className="Select">
                            <select
                                className="dropdown"
                                name="colvalue"
                                id="selected"
                                onChange={Change}
                            >
                                <option
                                    value=" "
                                    selected
                                >
                                    Select
                                </option>
                                <option value="all">All</option>
                                <option value="desc">Decrease</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                        {!Sort && (
                            <div class="products">
                                <div class="pro_container">
                                    <div class="product-items">
                                        {Books.map((book, price) => (
                                            <a href={`/BookDetails/${book.id}`}>
                                                <div
                                                    class="product"
                                                    href={`/BookDetails/${book.id}`}
                                                >
                                                    <div class="product-content">
                                                        <div>
                                                            <img
                                                                class="product--image"
                                                                src={
                                                                    book.data
                                                                        .ImageURL
                                                                }
                                                                alt="product image"
                                                            />
                                                        </div>
                                                        <div class="product-btns">
                                                            <button
                                                                type="button"
                                                                class="btn-cart"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    addToCart(
                                                                        event,
                                                                        book
                                                                    )
                                                                }
                                                            >
                                                                {' '}
                                                                <i
                                                                    class="fa fa-cart-plus"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="btn-cart"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    addToFav(
                                                                        event,
                                                                        book
                                                                    )
                                                                }
                                                            >
                                                                {' '}
                                                                <i
                                                                    class="fa fa-heart"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="product-info">
                                                        <div class="product-info-top">
                                                            <h1 class="sm-title">
                                                                {book.data.Name}
                                                            </h1>
                                                        </div>
                                                        <div class="rating">
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="far fa-star"></i>
                                                            </span>
                                                        </div>
                                                        <a
                                                            href="#"
                                                            class="product-name"
                                                        >
                                                            {book.data.Author}
                                                        </a>
                                                        <p class="product-price">
                                                            {book.data.Price}
                                                        </p>
                                                        <p class="product-price">
                                                            {
                                                                book.data
                                                                    .DiscountPrice
                                                            }
                                                        </p>
                                                    </div>

                                                    <div class="off-info">
                                                        <h2 class="sm-title">
                                                            {100 -
                                                                Math.round(
                                                                    (book.data
                                                                        .DiscountPrice /
                                                                        book
                                                                            .data
                                                                            .Price) *
                                                                        100
                                                                ) +
                                                                ' %'}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <ToastContainer />
                            </div>
                        )}
                        {Sort && (
                            <div class="products">
                                <div class="pro_container">
                                    <div class="product-items">
                                        {Books.map((book, price) => (
                                            <a href={`/BookDetails/${book.id}`}>
                                                <div
                                                    class="product"
                                                    href={`/BookDetails/${book.id}`}
                                                >
                                                    <div class="product-content">
                                                        <div>
                                                            <img
                                                                class="product--image"
                                                                src={
                                                                    book.data
                                                                        .ImageURL
                                                                }
                                                                alt="product image"
                                                            />
                                                        </div>
                                                        <div class="product-btns">
                                                            <button
                                                                type="button"
                                                                class="btn-cart"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    addToCart(
                                                                        event,
                                                                        book
                                                                    )
                                                                }
                                                            >
                                                                {' '}
                                                                <i
                                                                    class="fa fa-cart-plus"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="btn-cart"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    addToFav(
                                                                        event,
                                                                        book
                                                                    )
                                                                }
                                                            >
                                                                {' '}
                                                                <i
                                                                    class="fa fa-heart"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="product-info">
                                                        <div class="product-info-top">
                                                            <h1 class="sm-title">
                                                                {book.data.Name}
                                                            </h1>
                                                        </div>
                                                        <div class="rating">
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="fas fa-star"></i>
                                                            </span>
                                                            <span>
                                                                <i class="far fa-star"></i>
                                                            </span>
                                                        </div>
                                                        <a
                                                            href="#"
                                                            class="product-name"
                                                        >
                                                            {book.data.Author}
                                                        </a>
                                                        <p class="product-price">
                                                            {book.data.Price}
                                                        </p>
                                                        <p class="product-price">
                                                            {
                                                                book.data
                                                                    .DiscountPrice
                                                            }
                                                        </p>
                                                    </div>

                                                    <div class="off-info">
                                                        <h2 class="sm-title">
                                                            {100 -
                                                                Math.round(
                                                                    (book.data
                                                                        .DiscountPrice /
                                                                        book
                                                                            .data
                                                                            .Price) *
                                                                        100
                                                                ) +
                                                                ' %'}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <ToastContainer />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Small
