import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import './BillingCard.css'; // Import your CSS file

const stripePubKey = 'pk_test_51NOQr6SDTAaBjofmX1mGe1bJQPlCuX8GObCKd4uEaYOlnSRraiyKyLD22wDHz3VDxVofEHIvuBSztjHDiaSAyxIp003LfD2VZY';
const stripePromise = loadStripe(stripePubKey);
const Billing = () => {
    const location = useLocation();
    const { selectedPlan } = location.state;

    return (
        <div >
            <div >
                <h2>Billing Details</h2>
                <p>Selected Plan: {selectedPlan.name}</p>
                {selectedPlan.yearly_price ? (
                    <p>Price: {selectedPlan.yearly_price} per year</p>
                ) : (
                    <p>Price: {selectedPlan.monthly_price} per month</p>
                )}
                <p>
                    Biling Cycle : {selectedPlan.yearly_price ? 'Yearly' : 'Monthly'}
                </p>
            </div>

            <div >
                <Elements stripe={stripePromise}>
                    <PaymentForm selectedPlan={selectedPlan} />
                </Elements>

            </div>
        </div >
    );
};

export default Billing;
