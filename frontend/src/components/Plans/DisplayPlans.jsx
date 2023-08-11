import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './DisplayCards.css'; // Import your CSS file for styling cards
import PlanCard from './PlanCard';

const DisplayPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showMonthlyPrice, setShowMonthlyPrice] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            const plansCollectionRef = collection(db, 'plans');
            const querySnapshot = await getDocs(plansCollectionRef);

            const plansArray = [];
            querySnapshot.forEach((doc) => {
                plansArray.push(doc.data());
            });

            setPlans(plansArray[0].plans);
        };

        fetchPlans();
    }, []);

    const togglePriceDisplay = () => {
        setShowMonthlyPrice(!showMonthlyPrice);
    };

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
    };

    const handleProceed = () => {
        if (selectedPlan) {
            const selectedPrice = showMonthlyPrice
                ? selectedPlan.monthly_price
                : selectedPlan.yearly_price;

            const modifiedSelectedPlan = {
                ...selectedPlan,
                selectedPrice: selectedPrice
            };

            navigate(`/billing`, { state: { selectedPlan: modifiedSelectedPlan } });
        } else {
            alert('Please Select a plan to proceed..');
        }
    };

    return (
        <div className="center-content">

            <div className="header">
                <h2>Choose the right plan for you</h2>
                <button className="pricebutton1" onClick={togglePriceDisplay}>
                    {showMonthlyPrice ? <>Monthly</> : <>Yearly</>}
                </button>
            </div>

            <div className="cards">
                {plans.map((plan, index) => (
                    <PlanCard
                        key={index}
                        plan={plan}
                        selectedPlan={selectedPlan}
                        showMonthlyPrice={showMonthlyPrice}
                        handlePlanClick={handlePlanClick}
                    />
                ))}
            </div>

            <div className="center">
                {selectedPlan ? (
                    <button className='pricebutton' onClick={handleProceed}>Go to Billing</button>
                ) : (
                    <button className='pricebutton' onClick={() => alert('Please Select a plan to proceed..')}>
                        Please Select a plan to proceed..
                    </button>
                )}
            </div>
        </div>
    );
};

export default DisplayPlans;
