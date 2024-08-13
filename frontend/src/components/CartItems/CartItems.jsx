import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);

    const subtotal = all_product.reduce((total, product) => {
        const quantity = cartItems[product.id] || 0;
        const price = product.new_price || 0;
        return total + (price * quantity);
    }, 0);

    const shippingFee = 0;
    const total = subtotal + shippingFee;

    return (
        <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p> 
                <p>Title</p> 
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {all_product.map((product) => {
                const quantity = cartItems[product.id];
                if (quantity > 0) {
                    return (
                        <div key={product.id}>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={product.image || ''} alt={product.name || 'Product Image'} className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>${(product.new_price || 0).toFixed(2)}</p>
                                <button className='cartitems-quantity'>{quantity}</button>
                                <p>${((product.new_price || 0) * quantity).toFixed(2)}</p> 
                                <img 
                                    className='cartitems-remove-icon' 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(product.id)} 
                                    alt="Remove" 
                                />
                            </div>
                            <hr/>
                        </div>
                    );
                }
                return null;   
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>${total.toFixed(2)}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, enter it here:</p>  
                    <div className='cartitems-promobox'>
                        <input type="text" placeholder='Promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>          
        </div>
    );
}

export default CartItems;
