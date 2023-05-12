import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './../pages/Home';
import BookDetails from './../pages/BookDetails/BookDetails';
import Cart from './../pages/Cart/Cart';
import Login from './../pages/login';
import SignUp from './../pages/signup';
import Fiction from '../pages/Fiction';
import NonFiction from '../pages/Non-Fiction';
import Small from '../pages/Small';
import Wishlist from '../pages/Wishlist';
import AdminPages from '../pages/AdminPages';
const AllRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/BookDetails/:id' element={<BookDetails />} />
				<Route path="/login" element={<Login />} />
        		<Route path="/signup" element={<SignUp />} />	
				<Route path='/cart' element={<Cart/>} />
				<Route path='/admin' element={<AdminPages/>} />
				<Route path='/wishlist' element={<Wishlist/>} />
				<Route path='/fiction' element={<Fiction/>} />
				<Route path='/fiction/:catagory' element={<Small/>} />
				<Route path='/non-fiction' element={<NonFiction/>} />
				<Route path='/non-fiction/:catagory' element={<Small/>} />
			</Routes>
		</>
	);
};

export default AllRoutes;
