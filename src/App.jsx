import React from 'react';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails/BookDetails';
import Layout from './layout/Layout';
import Cart from './pages/Cart/Cart';
import AdminPages from './pages/AdminPages';

const App = () => {
	return (
		<>
			<Layout>
				<AdminPages />
			</Layout>
		</>
	);
};

export default App;
