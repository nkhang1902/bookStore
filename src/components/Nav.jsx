/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faBookAtlas, faEarth, faExternalLink, faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {Row} from 'react-bootstrap';

const Navbar = () => {
	return (
		<Row style={{margin: '0'}}>
			<div className='navbar navbar-expand navbar-light bg-faded d-flex flex-wrap justify-content-between px-4 col-12 shadow-sm'>
				<Link to='/' className='brand d-flex justify-content-center mr-auto mt-2 mt-lg-0 d-flex p-2 w-auto col-4'>
					<img className='icon' src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7931719/books-clipart-md.png' />
					<p className='brand' style={{color: '#2c293b'}}>
						BookWorms
					</p>
				</Link>
				<form className='form-control rounded-pill d-flex justify-content-between px-2 w-50'>
					<input className='searchBar border-0 col-11 py-0 my-2' style={{backgroundColor: '#f1f0f5'}} type='text' placeholder='Search books, author, ...'></input>
					<button className='btn col-1	 my-sm-0 w-10' type='submit'>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</form>
				<div className='nav-item active mt-3 d-flex justify-content-center col-2'>
					<Link className='nav-link col-4' to='/wishlist'>
						<p className='navItem'>
							<i className='fas fa-heart    '></i>
						</p>
						<span className='sr-only'>(current)</span>
					</Link>
					<Link className='nav-link col-4' to='/cart'>
						<p className='navItem'>
							<i className='fas fa-shopping-cart'></i>
						</p>
						<span className='sr-only'>(current)</span>
					</Link>
					<div className='nav-link col-4'>
						<a className='navItem dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
							<i className='fas fa-user' aria-hidden='true'></i>
						</a>
						<div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
							<a className='dropdown-item' href='#'>
								Action 1
							</a>
							<a className='dropdown-item' href='#'>
								Action 2
							</a>
							<a className='dropdown-item' href='#'>
								Action 3
							</a>
						</div>
					</div>
				</div>
				<ul className='d-flex justify-content-center m-0 p-0 col-12'>
					<div className='navbar-item '>
						<a className='navbar-item' href='https://bookshop.org/lists/special-offers-on-bookshop-org'>
							Special Offers
						</a>
					</div>
					<div className='navbar-item '>
						<a className='navbar-item' href='https://bookshop.org/lists/new-releases-this-week'>
							New Books
						</a>
					</div>
					<div className='navbar-item '>
						<a className='navbar-item' href='/categories/m/popular-books'>
							Best Sellers
						</a>
					</div>
					<div className='navbar-item '>
						<a className='navbar-item' href='/fiction'>
							Catalogy
						</a>
					</div>
							Fiction
						</a>
					</div>
					<div className='navbar-item '>
						<a className='navbar-item' href='/non-fiction'>
							Non-Fiction
						</a>
					</div>
				</ul>
			</div>
		</Row>
	);
};

export default Navbar;
