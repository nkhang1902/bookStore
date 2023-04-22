import React, {useState} from 'react';
import './_Cart.scss';
function Cart() {
	const [cart, setCart] = useState([]);
	// if (cart.length === 0) {
	// 	return (
	// 		<section className='cart-container'>
	// 			<h1 className='h1'>Shopping Cart</h1>
	// 			<div className='design-system'>
	// 				<a href='#' className='cart-redeem'>
	// 					Have a gift card? Redeem it here!
	// 				</a>
	// 			</div>
	// 			<div className='empty_cart'>
	// 				<p className='empty_cart--title'>Your cart is empty</p>
	// 				<p>
	// 					<a className='button continue' href='#'>
	// 						Continue shopping
	// 					</a>
	// 				</p>
	// 			</div>
	// 		</section>
	// 	);
	// }
	return (
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
				<div className='cart-item'>
					<table className='cart-detail'>
						<thead>
							<tr className='cart_items_headers'>
								<th class='cart-item-description-header' colspan='3'>
									Item
								</th>
								<th class='cart-item-quantity-header px-2'>Qty</th>
								<th class='cart-item-price-header text-right px-4'>Price</th>
								<th class='cart-item-delete-header'></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default Cart;
