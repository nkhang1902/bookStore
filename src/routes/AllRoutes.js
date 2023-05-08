import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './../pages/Home';
import BookDetails from './../pages/BookDetails/BookDetails';
import Cart from './../pages/Cart/Cart';
import Login from './../pages/login';
import SignUp from './../pages/signup';

const AllRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/BookDetails/:id' element={<BookDetails />} />
				<Route path="/login" element={<Login />} />
        		<Route path="/signup" element={<SignUp />} />	
				<Route path='/cart' element={<Cart/>} />
			</Routes>
		</>
	);
};

export default AllRoutes;
