import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import './PaymentForm.css'; // Import your CSS file

const PaymentForm = ({ selectedPlan }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const priceInCents = selectedPlan ? parseFloat(selectedPlan.yearly_price) * 100 : parseFloat(selectedPlan.monthly_price) * 100;
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: priceInCents,
                    currency: 'inr',
                    description: 'Your export transaction description',
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setClientSecret(data.clientSecret);
            } else {
                setError('Error creating payment intent');
            }
        } catch (error) {
            setError('Error creating payment intent');
        }
    };

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            // Payment succeeded
            navigate('/success')
            console.log(result.paymentIntent);
        }
    };

    return (
        <div className="payment-form">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
                <CardElement />
                {clientSecret ? (
                    <>
                        <button onClick={handlePayment} className="submit-button">Confirm Payment</button>
                        {error && <p className="error-message">{error}</p>}
                    </>
                ) : (
                    <button type="submit">Submit Payment</button>
                )}
            </form>
        </div>
    );
};

export default PaymentForm;
