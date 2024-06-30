import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useOutletContext } from 'react-router';
import Swal from "sweetalert2";
const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
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
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            setMessage("")
          }, 1500);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Payment failed!",
            showConfirmButton: false,
            timer: 1500
          });
          setMessage('Payment failed');
        }
      } catch (error) {
        setMessage('Payment failed');
      }
    }
  };

  return (
    <div id='paymentForm'>
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            className='form-control my-2'
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className='my-2' htmlFor="card-element">Credit or Debit Card</label>
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS}/>
        </div>
        <button className='btn ' type="submit" disabled={!stripe}>Pay</button>
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
