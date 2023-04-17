import React from 'react';
import Layout from '../layout/Layout';
import BookDetails from './BookDetails/BookDetails';

const Home = () => {
	return (
		<div>
			<Layout>
				<div class='center'>
					<text>Hello World</text>
				</div>
				<BookDetails />
			</Layout>
		</div>
	);
};

export default Home;
