import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faBookAtlas, faEarth, faExternalLink, faSearch} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand navbar-light bg-faded'>
			<a className='brand' href='#'>
				<h2>BookWorms</h2>
			</a>
			<form className='form-control rounded-pill my-2 my-lg-0 d-flex p-2 w-50'>
				<input className='form-control' type='text' placeholder='Search books, author, ...'></input>
				<button className='btn btn-outline-success my-2 my-sm-0 ' type='submit'>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>
			<ul className='navbar-nav mr-auto mt-2 mt-lg-0 d-flex p-2 w-auto'>
				<li className='nav-item dropdown'>
					<a className='nav-link dropdown-toggle' href='#' id='dropdownId' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
						Categories <FontAwesomeIcon icon={faBook} />
					</a>
					<div className='dropdown-menu' aria-labelledby='dropdownId'>
						<a className='dropdown-item' href='#'>
							Action 1
						</a>
						<a className='dropdown-item' href='#'>
							Action 2
						</a>
					</div>
				</li>
				<li className='nav-item active'>
					<a className='nav-link ' href='#'>
						About <FontAwesomeIcon icon={faEarth} />
						<span className='sr-only'>(current)</span>
					</a>
				</li>
				<li className='nav-item'>
					<a className='nav-link font-weight-bold' href='#'>
						Log In <FontAwesomeIcon icon={faExternalLink} />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
