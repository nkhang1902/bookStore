import React, {useEffect} from 'react';
import './_RatingStars.scss';
import {useState} from 'react';
import {addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import {db} from '../../firebase/config';
import {book, key} from 'fontawesome';

function RatingStars({bookID, Name}) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [comment, setComment] = useState('');
	const [starsCount, setStarsCount] = useState(0);
	const handleClickStars = e => {
		console.log(bookID);
		setStarsCount(e.target.id.slice(-1));
	};
	const handleWriteReview = e => {
		setComment(e.target.value);
	};
	const fetchUserData = async () => {
		if (bookID) {
			const q = query(collection(db, 'Review'), where('BookID', '==', bookID));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc, index) => {
				if (doc.data().BookID === bookID && doc.data().Name === Name) {
					setIsSubmitted(true);
					setStarsCount(doc.data().Rating);
					setComment(doc.data().Review);
				}
			});
		}
	};
	useEffect(() => {
		fetchUserData();
	}, []);

	const handleSubmitReview = async e => {
		e.preventDefault();
		if (starsCount === 0 || comment.trim() === '') {
			return;
		}

		try {
			const addedReview = await addDoc(collection(db, 'Review'), {
				BookID: bookID,
				Name: Name,
				Rating: starsCount,
				Review: comment,
				PostedDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Date.now()),
			});
			console.log('Review added with ID: ', addedReview.id);
		} catch (error) {
			console.log(error.message);
		}

		console.log(bookID);
		setIsSubmitted(true);
	};

	function createElements(number) {
		var elements = [];
		for (let i = 0; i < number; i++) {
			elements.push(
				<div className='star' key={i}>
					★
				</div>
			);
		}
		return elements;
	}
	if (!isSubmitted) {
		return (
			<>
				<div className='rate' onClick={handleClickStars}>
					<input type='radio' id='star5' name='rate' value='5' />
					<label htmlFor='star5' title='text'>
						5 stars
					</label>
					<input type='radio' id='star4' name='rate' value='4' />
					<label htmlFor='star4' title='text'>
						4 stars
					</label>
					<input type='radio' id='star3' name='rate' value='3' />
					<label htmlFor='star3' title='text'>
						3 stars
					</label>
					<input type='radio' id='star2' name='rate' value='2' />
					<label htmlFor='star2' title='text'>
						2 stars
					</label>
					<input type='radio' id='star1' name='rate' value='1' />
					<label htmlFor='star1' title='text'>
						1 star
					</label>
				</div>
				<div className='rate-comment'>
					<textarea name='comment' id='comment' rows='3' placeholder='Write your comment here...' onChange={handleWriteReview} value={comment}></textarea>
				</div>
				<div className='submit-review-btn'>
					<button className='btn--primary' onClick={handleSubmitReview}>
						Submit
					</button>
				</div>
			</>
		);
	}

	if (isSubmitted) {
		return (
			<>
				<div className='rate rate-submited'>
					<p>Your stars: </p>
					<div className='rated-stars-container'>{createElements(starsCount)}</div>
				</div>
				<div className='rate-comment'>
					<p>Your comment: </p>

					{comment}
				</div>
				<div className='submit-review-btn'>
					<button className='btn--primary btn--disabled' type='disabled'>
						You have submitted your review
					</button>
				</div>
			</>
		);
	}
}

export default RatingStars;
