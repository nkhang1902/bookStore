import React, {useState} from 'react';
import './_Cart.scss';
function Cart() {
	const [cart, setCart] = useState(1);

	if (cart.length === 0) {
		return (
			<section className='cart-container'>
				<h1 className='h1'>Shopping Cart</h1>
				<div className='design-system'>
					<a href='#' className='cart-redeem'>
						Have a gift card? Redeem it here!
					</a>
				</div>
				<div className='empty_cart'>
					<p className='empty_cart--title'>Your cart is empty</p>
					<p>
						<a className='button continue' href='#'>
							Continue shopping
						</a>
					</p>
				</div>
			</section>
		);
	}
	return (
		<>
			<section className='cart-container'>
				<h1 className='h1'>Shopping Cart</h1>
				<div className='design-system'>
					<a href='#' className='cart-redeem'>
						Have a gift card? Redeem it here!
					</a>
				</div>
				<div className='checkout-container'>
					<a className='button continue' href='#'>
						Checkout (Total: $38.83)
					</a>
					{/* <div className='cart-item'>
						<table className='cart-detail'>
							<thead>
								<tr className='cart-items_headers'>
									<th class='cart-item-item-description-header' colspan='3'>
										Item
									</th>
									<th class='cart-item-quantity-header px-2'>Qty</th>
									<th class='cart-item-price-header text-right px-4'>Price</th>
									<th class='cart-item-delete-header'></th>
								</tr>
							</thead>
							<tbody>
								<tr className='cart-item'>
									<div className='cart-item-image'>
										<img src='https://via.placeholder.com/150' alt='product' />
									</div>
									<td className='cart-item-title'>Her body and Other parties Stories</td>
									<td className='cart-item-author'>Carmen Maria Machado</td>
									<td className='cart-item-status'>V Available</td>
								</tr>
							</tbody>
						</table>
					</div> */}
				</div>
			</section>
			<div class='shopping-cart'>
				{/* <!-- Title --> */}
				<div className='titles-container'>
					<div class='title'>Shopping Bag</div>
					<div class='title-quantity'>Quantity</div>
					<div class='title-price'>Price</div>
				</div>

				{/* <!-- Product #1 --> */}
				<div class='item'>
					<div class='image'>
						<img src='https://images-us.bookshop.org/ingram/9781555977887.jpg?height=500&v=v2' alt='' />
					</div>

					<div class='item-description'>
						<span>Common Projects</span>
						<span>Bball High</span>
						<span>White</span>
					</div>

					<div class='quantity'>
						<button class='plus-btn' type='button' name='button'>
							<i class='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button class='minus-btn' type='button' name='button'>
							<i class='fa-solid fa-plus'></i>
						</button>
					</div>

					<div class='total-price'>$549</div>
					<div class='buttons'>
						<span class='delete-btn'>
							<i class='fa-solid fa-trash'></i>
						</span>
						<span class='like-btn'></span>
					</div>
				</div>
				<div class='item'>
					<div class='image'>
						<img src='https://images-us.bookshop.org/ingram/9781555977887.jpg?height=500&v=v2' alt='' />
					</div>

					<div class='item-description'>
						<span>Common Projects</span>
						<span>Bball High</span>
						<span>White</span>
					</div>

					<div class='quantity'>
						<button class='plus-btn' type='button' name='button'>
							<i class='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button class='minus-btn' type='button' name='button'>
							<i class='fa-solid fa-plus'></i>
						</button>
					</div>

					<div class='total-price'>$549</div>
					<div class='buttons'>
						<span class='delete-btn'>
							<i class='fa-solid fa-trash'></i>
						</span>
						<span class='like-btn'></span>
					</div>
				</div>
				<div class='item'>
					<div class='image'>
						<img src='https://images-us.bookshop.org/ingram/9781555977887.jpg?height=500&v=v2' alt='' />
					</div>

					<div class='item-description'>
						<span>Common Projects</span>
						<span>Bball High</span>
						<span>White</span>
					</div>

					<div class='quantity'>
						<button class='plus-btn' type='button' name='button'>
							<i class='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button class='minus-btn' type='button' name='button'>
							<i class='fa-solid fa-plus'></i>
						</button>
					</div>

					<div class='total-price'>$549</div>
					<div class='buttons'>
						<span class='delete-btn'>
							<i class='fa-solid fa-trash'></i>
						</span>
						<span class='like-btn'></span>
					</div>
				</div>
				<div class='item'>
					<div class='image'>
						<img src='https://images-us.bookshop.org/ingram/9781555977887.jpg?height=500&v=v2' alt='' />
					</div>

					<div class='item-description'>
						<span>Common Projects</span>
						<span>Bball High</span>
						<span>White</span>
					</div>

					<div class='quantity'>
						<button class='plus-btn' type='button' name='button'>
							<i class='fa-solid fa-minus'></i>
						</button>
						<input type='text' name='name' value='1' />
						<button class='minus-btn' type='button' name='button'>
							<i class='fa-solid fa-plus'></i>
						</button>
					</div>

					<div class='total-price'>$549</div>
					<div class='buttons'>
						<span class='delete-btn'>
							<i class='fa-solid fa-trash'></i>
						</span>
						<span class='like-btn'></span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cart;
