/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBook,
    faBookAtlas,
    faEarth,
    faExternalLink,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Row } from 'react-bootstrap'

import { auth } from '../firebase/config'
import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { db } from '../firebase/config'
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
} from 'firebase/firestore'

const Navbar = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [books, setBooks] = useState([])
    const [data, setData] = useState([])
    const [searh, setSearch] = useState(false)
    const [value, setValue] = useState()
    const [userData, setUserData] = useState(null)

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (keyword.trim() !== '') {
            const encodedKeyword = encodeURIComponent(keyword)
            window.location.href = `/fiction/keyword=${encodedKeyword}`
        }
    }
    function handleLogout() {
        auth.signOut()
            .then(() => {
                console.log('Đăng xuất thành công')
            })
            .catch((error) => {
                console.log('Lỗi đăng xuất: ', error)
            })
    }

    function AllBooks() {
        const bookCollection = collection(db, 'Book')
        getDocs(bookCollection)
            .then((response) => {
                const book = response.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id,
                }))

                setBooks(book)
            })
            .catch((error) => console.log(error.message))
    }

    const live_search = (e) => {
        if (e.target.value == []) {
            setSearch(false)
        } else {
            setSearch(true)
            var search_name = books.filter((book) =>
                book.data.Name.toLowerCase().includes(
                    e.target.value.toLowerCase()
                )
            )
            var search_auth = books.filter((book) =>
                book.data.Author.toLowerCase().includes(
                    e.target.value.toLowerCase()
                )
            )
            var search = search_name.concat(search_auth)
            setData(search)
        }
        setValue(e.target.value)
    }

    const SubmitSearch = (e) => {
        setSearch(false)
        e.preventDefault()
        navigate(`/search?value=${value}`)
    }
    const fetchUserData = async (email) => {
        if (email) {
            const q = query(collection(db, 'User'), where('Email', '==', email))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUserData(doc.data())
            })
        }
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserLoggedIn(!!user)
            fetchUserData(user.email);
        })
        return unsubscribe
    }, [])
    useEffect(() => {
        AllBooks()
    }, [])
    return (
        <Row style={{ margin: '0' }}>
            <div className="navbar navbar-expand navbar-light bg-faded d-flex flex-wrap justify-content-between px-4 col-12 shadow-sm">
                <Link
                    to="/"
                    className="brand d-flex justify-content-center mr-auto mt-2 mt-lg-0 d-flex p-2 w-auto col-4"
                >
                    <img
                        className="icon"
                        src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7931719/books-clipart-md.png"
                    />
                    <p
                        className="brand"
                        style={{ color: '#2c293b' }}
                    >
                        BookWorms
                    </p>
                </Link>
                <form
                    className="form-control rounded-pill d-flex justify-content-between px-2 w-50"
                    onSubmit={SubmitSearch}
                >
                    <input
                        className="searchBar border-0 col-11 py-0 my-2"
                        style={{ backgroundColor: '#f1f0f5' }}
                        type="text"
                        placeholder="Search books, author, ..."
                        onChange={live_search}
                    ></input>
                    <button
                        className="btn col-1 my-sm-0 w-10"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    {searh &&
                        (Object.keys(data).length === 0 ? (
                            <div className="res ">
                                <p className="res-item">
                                    <ul>
                                        <li className="not_find">
                                            Can't find the book
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        ) : (
                            <div className="res ">
                                <p className="res-item">
                                    <ul>
                                        {data.slice(0, 5).map((book) => (
                                            <a href={`/BookDetails/${book.id}`}>
                                                <li className="search_item">
                                                    <img
                                                        src={book.data.ImageURL}
                                                        alt=""
                                                        className="search_img"
                                                    />
                                                    <div className="search_inf">
                                                        <h1 className="search_name">
                                                            {book.data.Name}
                                                        </h1>
                                                        <h1 className="search_auth">
                                                            {book.data.Author}
                                                        </h1>
                                                    </div>
                                                    <div className="price">
                                                        <p className="search_price">
                                                            {' '}
                                                            $
                                                            {
                                                                book.data
                                                                    .DiscountPrice
                                                            }
                                                        </p>
                                                    </div>
                                                </li>
                                                <hr />
                                            </a>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                        ))}
                </form>

                <div className="nav-item active mt-3 d-flex justify-content-center col-2">
                    <Link
                        className="nav-link col-4"
                        to="/wishlist"
                    >
                        <p className="navItem">
                            <i className="fas fa-heart"></i>
                        </p>
                        <span className="sr-only">(current)</span>
                    </Link>
                    <Link
                        className="nav-link col-4"
                        to="/cart"
                    >
                        <p className="navItem">
                            <i className="fas fa-shopping-cart"></i>
                        </p>
                        <span className="sr-only">(current)</span>
                    </Link>
                    {userLoggedIn ? (
                        // Show this dropdown if user is logged in
                        <Dropdown className="nav-link col-4">
                            <Dropdown.Toggle
                                className="navItem p-0"
                                id="dropdown-basic"
                            >
                                <i
                                    className="fa fa-user"
                                    aria-hidden="true"
                                ></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="">Profile</Dropdown.Item>
                                <Dropdown.Item
                                    href="/login"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        // Show this dropdown if user is not logged in
                        <Dropdown className="nav-link col-4">
                            <Dropdown.Toggle
                                className="navItem p-0"
                                id="dropdown-basic"
                            >
                                <i
                                    className="fa fa-user"
                                    aria-hidden="true"
                                ></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/login">
                                    Log In
                                </Dropdown.Item>
                                <Dropdown.Item href="/signup">
                                    Register
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </div>
                <ul className="d-flex justify-content-center m-0 p-0 col-12">
                    <div className="navbar-item">
                        <a
                            className="navbar-item"
                            href="https://bookshop.org/lists/special-offers-on-bookshop-org"
                        >
                            <i class="fas fa-dollar-sign    "></i>
                            Special Offers
                        </a>
                    </div>
                    <div className="navbar-item">
                        <a
                            className="navbar-item"
                            href="/fiction/newrelease"
                        >
                            <i class="fa fa-star" aria-hidden="true"></i>
                            New Books
                        </a>
                    </div>
                    <div className="navbar-item">
                        <a
                            className="navbar-item"
                            href="/fiction/bestseller"
                        >
                            <i class="fas fa-search-dollar    "></i>
                            Best Sellers
                        </a>
                    </div>
                    <div className="navbar-item">
                        <a
                            className="navbar-item"
                            href="/fiction"
                        >
                            <i class="fa fa-list" aria-hidden="true"></i>
                            Category
                        </a>
                    </div>
                </ul>
            </div>
        </Row>
    )
}

export default Navbar
