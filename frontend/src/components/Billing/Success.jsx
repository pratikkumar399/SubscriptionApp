import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Success.css'; // Import your CSS file

const Success = () => {
    const navigate = useNavigate();
    const [subscriptionDetails, setSubscriptionDetails] = useState([]);

    const fetchSubscriptionDetails = async () => {
        const subscriptionCollectionRef = collection(db, 'subscriptionData');
        const subscriptionSnapshot = await getDocs(subscriptionCollectionRef);
        const subscriptionData = subscriptionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscriptionDetails(subscriptionData);
    };

    useEffect(() => {
        // Fetch subscription details from Firestore
        fetchSubscriptionDetails();
    }, []);

    const handleCancelPayment = async (subscriptionId) => {
        try {
            const subscriptionDocRef = doc(db, 'subscriptionData', subscriptionId);
            await deleteDoc(subscriptionDocRef);
            console.log('Subscription data deleted successfully');
            // Refresh the subscription details
            fetchSubscriptionDetails();
        } catch (error) {
            console.error('Error deleting subscription data:', error);
        }
    };

    return (

        <div className="app-container">
            <div className="success-card">
                {subscriptionDetails.length === 0 ? (
                    <p>No current plans available.</p>
                ) : (
                    subscriptionDetails.map(subscription => (
                        <div key={subscription.id} className="subscription-card">
                            <p>Plan Name: {subscription.planName}</p>
                            <p>Billing Cycle: {subscription.billingCycle}</p>
                            <p>Price: {subscription.price}</p>
                            {/* Other subscription details */}
                            <button onClick={() => handleCancelPayment(subscription.id)}>Cancel Payment</button>
                        </div>
                    ))
                )}
                <button className="home-button">
                    <Link to={'/home'}>
                        Go to home page
                    </Link>
                </button>
            </div>
        </div>


    );
};

export default Success;
