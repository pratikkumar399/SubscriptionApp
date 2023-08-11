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
        <div className="billing-card">
            <div className="billing-payment">
                <h2>Billing Details</h2>
                <hr />
                <div className="billing-details">
                    <div className="billing-section">
                        <p>Selected Plan: {selectedPlan.name}</p>
                        {selectedPlan.yearly_price ? (
                            <p>Price: {selectedPlan.yearly_price} per year</p>
                        ) : (
                            <p>Price: {selectedPlan.monthly_price} per month</p>
                        )}
                        <p>
                            Billing Cycle: {selectedPlan.yearly_price ? 'Yearly' : 'Monthly'}
                        </p>
                    </div>

                    <div className="payment-section">
                        <Elements stripe={stripePromise}>
                            <PaymentForm selectedPlan={selectedPlan} />
                        </Elements>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Billing;
