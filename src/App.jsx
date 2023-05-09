import React from 'react';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails/BookDetails';
import Layout from './layout/Layout';
import Cart from './pages/Cart/Cart';
import AdminPages from './pages/AdminPages';
import AllRoutes from './routes/AllRoutes';


const App = () => {
	return (
		<>
			<Layout>
				<AllRoutes />
			</Layout>
		</>
	);
};

export default App;
