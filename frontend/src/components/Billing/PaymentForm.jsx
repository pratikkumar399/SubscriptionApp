import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import './PaymentForm.css'; // Import your CSS file
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const PaymentForm = ({ selectedPlan }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const { user } = useUserAuth();

    const getSubscriptionByPlanAndBillingCycle = async (planName, billingCycle) => {
        const plansCollectionRef = collection(db, 'subscriptionData');
        const q = query(plansCollectionRef, where('planName', '==', planName), where('billingCycle', '==', billingCycle));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Subscription with the same plan name and billing cycle exists
            const subscription = querySnapshot.docs[0].data();
            return subscription;
        } else {
            // No subscription found
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const priceInCents = selectedPlan ? parseFloat(selectedPlan.yearly_price) * 100 : parseFloat(selectedPlan.monthly_price) * 100;
            const response = await fetch('https://subscription-app-4ev2.vercel.app/create-payment-intent', {
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
            console.log(data);
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
            const subscriptionData = {
                planName: selectedPlan.name,
                billingCycle: selectedPlan.yearly_price ? 'Yearly' : 'Monthly',
                price: selectedPlan.yearly_price || selectedPlan.monthly_price,
                // ... other subscription details
            };

            // Check if a subscription with the same plan name and billing cycle already exists
            const existingSubscription = await getSubscriptionByPlanAndBillingCycle(subscriptionData.planName, subscriptionData.billingCycle);

            if (!existingSubscription) {
                // Add subscriptionData to Firebase
                try {
                    const plansCollectionRef = collection(db, 'subscriptionData');
                    await addDoc(plansCollectionRef, subscriptionData);
                    console.log(subscriptionData);
                    console.log("Added data successfully");
                } catch (error) {
                    console.error('Error storing subscription details:', error);
                }
            } else {
                console.log("Subscription already exists");
            }

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
