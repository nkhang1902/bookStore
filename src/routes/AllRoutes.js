import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './../pages/Home';
import BookDetails from './../pages/BookDetails/BookDetails';

const AllRoutes = () => {
	return (
		<>
			<Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/BookDetails/:id' element={<BookDetails/>} />
            </Routes>
		</>
	);
};

export default AllRoutes;
