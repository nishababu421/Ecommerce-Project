import React, { useState } from 'react';
import './Checkout.css'; // Create a CSS file for styling
import gpay from '../../assets/Images/gpay.png';
import razorpay from '../../assets/Images/razorpay.jpeg';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState(''); // State to track selected payment method

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Update state with selected payment method
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Simulate payment processing
    if (paymentMethod === 'razorpay') {
      alert('Processing payment with Razorpay...');
      // Simulate a delay for payment processing
      setTimeout(() => {
        alert('Payment successful with Razorpay!');
      }, 2000);
    } else if (paymentMethod === 'google-pay') {
      alert('Processing payment with Google Pay...');
      // Simulate a delay for payment processing
      setTimeout(() => {
        alert('Payment successful with Google Pay!');
      }, 2000);
    } else if (paymentMethod === 'cash-on-delivery') {
      alert('Order placed successfully! Cash on Delivery selected.');
    }
  };

  return (
    <div className='checkout'>
      <h1>Checkout</h1>
      <form className='checkout-form' onSubmit={handleSubmit}>
        <div className='checkout-section shipping-address'>
          <h2>Shipping Address</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
          <input type="text" placeholder="Zip Code" required />
          <input type="text" placeholder="Country" required />
        </div>
        <div className='checkout-section payment-info'>
          <h2>Payment Information</h2>
          <div className='payment-options'>
            <div className='payment-option'>
              <input
                type="radio"
                id="razorpay"
                name="payment-method"
                value="razorpay"
                onChange={handlePaymentMethodChange} // Update state on change
                required
              />
              <label htmlFor="razorpay">
                <img src={razorpay} alt="Razorpay" />
              </label>
            </div>
            <div className='payment-option'>
              <input
                type="radio"
                id="google-pay"
                name="payment-method"
                value="google-pay"
                onChange={handlePaymentMethodChange} // Update state on change
                required
              />
              <label htmlFor="google-pay">
                <img src={gpay} alt="Google Pay" />
              </label>
            </div>
            <div className='payment-option'>
              <input
                type="radio"
                id="cash-on-delivery"
                name="payment-method"
                value="cash-on-delivery"
                onChange={handlePaymentMethodChange} // Update state on change
                required
              />
              <label htmlFor="cash-on-delivery">Cash on Delivery</label>
            </div>
          </div>
        </div>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;