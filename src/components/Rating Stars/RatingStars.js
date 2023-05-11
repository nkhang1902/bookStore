import React, {useEffect} from 'react';
import './_RatingStars.scss';
import {useState} from 'react';
import {faL} from '@fortawesome/free-solid-svg-icons';
import {addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../firebase/config';
import {useParams} from 'react-router-dom';
import { book } from 'fontawesome';
// import RatingStars from './RatingStars';

function RatingStars({bookID, Name}) {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isEditting, setIsEditting] = useState(false);

	const [comment, setComment] = useState('');
	const [starsCount, setStarsCount] = useState(0);
	const handleClickStars = e => {
		setStarsCount(e.target.id.slice(-1));
	};
	const handleWriteReview = e => {
		setComment(e.target.value);
	};
	useEffect(() => {
		const reviewRef = doc(db, 'Review', bookID);
		const reviewSnapshot = getDoc(reviewRef);
	}, [bookID]);
	const handleSubmitReview = async e => {
		e.preventDefault();
		if (starsCount === 0 || comment.trim() === '') {
			return;
		}
		if (!isEditting) {
			try {
				const addedReview = await addDoc(collection(db, 'Review'), {
					BookID: bookID,
					Name: Name,
					Rating: starsCount,
					Review: comment,
					PostedDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(Date.now()),
				});
			} catch (error) {
				console.log(error.message);
			}
		}
		// else {
		// 	// Update the review
		// 	const reviewRef = doc(db, 'Review', bookID);
		// 	const reviewSnapshot = await getDoc(reviewRef);
		// 	if (reviewSnapshot.exists()) {
		// 		const reviewData = reviewSnapshot.data();
		// 		const reviewId = reviewSnapshot.id;
		// 		const reviewRef = doc(db, 'Review', reviewId);
		// 		await updateDoc(reviewRef, {
		// 			Review: comment,
		// 			Rating: starsCount,
		// 		});
		// 	} else {
		// 		console.log('No such document!');
		// 	}
		// }
		// console.log(bookID);
		// // console.log(id);
		setIsSubmitted(true);
	};
	const handleEditReview = e => {
		setIsSubmitted(false);
		setIsEditting(true);
	};
	function createElements(number) {
		var elements = [];
		for (let i = 0; i < number; i++) {
			elements.push(<div className='star'>★</div>);
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
					{/* {[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;
						return (
							<>
								<input type='radio' name='rate' id={`star${ratingValue}`} value={ratingValue} onClick={handleClickStars} />
								<label htmlFor={`star${ratingValue}`} title='text'>
									{ratingValue} stars
								</label>
							</>
						);
					})} */}
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
					<p className='rated-stars-container'>{createElements(starsCount)}</p>
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
