import React from 'react';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails/BookDetails';
import Layout from './layout/Layout';
import Cart from './pages/Cart/Cart';

const App = () => {
	return (
		<>
			<Layout>
				<Cart />
			</Layout>
		</>
	);
};

export default App;
