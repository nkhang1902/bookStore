import React from 'react';
import './_BookDetails.scss';
function BookDetails() {
	return (
		<>
			<div className='book-details-container'>
				<img src='https://images-us.bookshop.org/ingram/9781250859853.jpg?height=500&v=v2-0a956c821412980d70cf116b62c3c6a7' alt='book cover' className='book-image' />
				<div className='book-details'>
					<h1>Book Title</h1>
					<h2>Author</h2>
					<div className='price'>
						Format
						<div className='format_type'>
							<div className='format_type paperback-cover'>
								<div className='format_type paperback'>Paperback</div>
								<div className='format_type paperback__price'>$15.80</div>
							</div>
							<div className='format_type hard-cover'>
								<div className='format_type bhard-cover'>Hardcover</div>
								<div className='format_type paperback__price'>$24.99</div>
							</div>
						</div>
					</div>
					<div className='available'>
						<div className='available__in-stock'>Available</div>
					</div>
					<div className='btn-groups'>
						<button className='btn btn--primary'>
							<i class='fa-solid fa-cart-plus'></i>
							Add to Cart
						</button>
						<button className='btn btn--secondary'>
							<i class='fa-solid fa-heart'></i>
							Add to Wishlist
						</button>
					</div>
					<div className='description'>
						<h3 class='des-title'>Description</h3>
						<div className='des-content'>
							From the <i>New York Times</i> best-selling author of <i>The Nightingale</i> and <i>The Great Alone</i>, Kristin Hannah, comes a powerful novel about love and war that will touch the hearts of every generation.
							<br />
							<p>Every morning, Kris Pulaski wakes up in hell. In the 1990s she was lead guitarist of Dürt Würk, a heavy-metal band on the brink of breakout success until lead singer Terry Hunt embarked on a solo career and rocketed to stardom, leaving his bandmates to rot in obscurity.</p>
							<p>Now Kris works as night manager of a Best Western; she's tired, broke, and unhappy. Then one day everything changes--a shocking act of violence turns her life upside down, and she begins to suspect that Terry sabotaged more than just the band. Kris hits the road, hoping to reunite Dürt Würk and confront the man who ruined her life. Her journey will take her from the Pennsylvania rust belt to a celebrity rehab center to a satanic music festival. A furious power ballad about never giving up, We Sold Our Souls is an epic journey into the heart of a conspiracy-crazed, pill-popping, paranoid country that seems to have lost its very soul.</p>
						</div>
					</div>
					<div className='product-details'>
						<h3 class=''>Product Details</h3>
						<div className='product-details__content'>
							<b>Price</b>
							<b>$15.80</b>

							<b>Publisher</b>
							<div>Quirk Books</div>

							<b>Publish Date</b>
							<div>June 14, 2022</div>

							<b>Pages</b>
							<div>336</div>

							<b>Dimensions</b>
							<div>5.2 X 7.9 X 1.0 inches | 0.61 pounds</div>

							<b>Language</b>
							<div>English</div>

							<b>Type</b>
							<div>Paperback</div>
						</div>
					</div>
					<div className='author'>
						<h3 class=''>About the Author</h3>
						<p className='author__content'>Grady Hendrix is an award-winning and New York Times best-selling novelist and screenwriter living in New York City. He is the author of Horrorstör, My Best Friend's Exorcism (which is being adapted into a feature film by Amazon Studios), We Sold Our Souls, The Southern Book Club's Guide to Slaying Vampires, and The Final Girl Support Group. Grady also authored the Bram Stoker Award-winning nonfiction book Paperbacks from Hell and These Fists Break Bricks: How Kung Fu Movies Swept America and Changed the World.</p>
					</div>
					<div className='reviews-list'>
						<h3 class=''>Reviews</h3>
						<b>Nominated for the 2018 Shirley Jackson Award for Best Novel</b>
						<br />
						<b>A 2019 Locus Award finalist for Best Horror Novel</b>
						<br />
						<b>An NPR Pop Culture Happy Hour Pick</b>
						<br />
						<b>An io9 2018 Fall Preview Pick</b>
						<br />

						"A good, creepy, music-tinged thriller."--<i>Entertainment Weekly</i>
						<br />
						"Grady Hendrix is a master of the horror genre."--<i>USA Today</i>
						<br />
						"Kickass, horrifying, and smart as hell. It certainly earns my two horns up.."--<i>--Dread Central</i>
						<br />

					</div>
				</div>
			</div>
		</>
	);
}

export default BookDetails;
