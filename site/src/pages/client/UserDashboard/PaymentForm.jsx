import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useOutletContext } from 'react-router';

const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');

const PaymentForm = ({ onPaymentSuccess }) => {
    const [setUserID, setLocalUserID, userID] = useOutletContext();
    
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
    } else {
      const { id } = paymentMethod;

      try {
        const response = await axios.post('http://localhost:5050/api/pay', {
          amount:Number(amount),
          id,
          userId:userID.Id
        });

        if (response.data.success) {
          setMessage('Payment successful!');
          onPaymentSuccess(response.data.balance);
        } else {
          setMessage('Payment failed');
        }
      } catch (error) {
        setMessage('Payment failed');
      }
    }
  };

  return (
    <div>
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="card-element">Credit or Debit Card</label>
          <CardElement id="card-element" />
        </div>
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const Payment = ({ onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default Payment;
