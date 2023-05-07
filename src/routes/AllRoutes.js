import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './../pages/Home';
import BookDetails from './../pages/BookDetails/BookDetails';
import Cart from './../pages/Cart/Cart';

const AllRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/BookDetails/:id' element={<BookDetails />} />
				<Route path='/cart' element={<Cart/>} />
			</Routes>
		</>
	);
};

export default AllRoutes;
