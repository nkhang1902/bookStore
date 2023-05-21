import React from 'react';
import css from './author.module.css';

const Author = () => {
	return (
		<div className={css.container}>
			<p className={css.heading}>Books by Heather McTeer Toney</p>
			<div className={css.about}>
				<p className={css.heading1}>About</p>
				<p>
					<b>Heather McTeer Toney</b> is an attorney, environmentalist, speaker, and writer. She was the first Black, first female, and youngest mayor elected in Greenville, Mississippi, at age twenty-seven. In 2014, she was appointed by President Barack Obama as regional administrator for the Environmental Protection Agency's Southeast Region. Formerly the senior director for Moms Clean Air Force, Toney is now vice president of community engagement for the Environmental Defense Fund. She is a frequent guest on numerous shows and networks including CNN, Apple's The Problem with Jon Stewart, MSNBC, Democracy Now!, and Fox News. Heather lives with her husband and three children in Oxford, Mississippi.
				</p>
			</div>
			<div className={css.title}>
				<p className={css.heading1}>Titles</p>
				<div className={css.box}>
					<div className={css.imgBox}>
						<img src={require('../assets/1.jpg')} />
					</div>
					<p className={css.bookName}>
						<b>Before the Streetlights Come On: Black America's Urgent Call...</b>
					</p>
					<p className={css.author}>Heather McTeer Toney</p>
					<p className={css.cost}>$24.99</p>
					<p>$23.24</p>
					<button className={css.inCart}>
						<i className='fa-regular fa-bag-shopping'></i>IN CART
					</button>
				</div>
			</div>
		</div>
	);
};

export default Author;
