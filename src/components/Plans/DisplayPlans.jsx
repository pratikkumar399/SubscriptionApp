import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path based on your file structure
import './DisplayTable.css';

const DisplayPlans = () => {
    const [plans, setPlans] = useState([]);
    const [showMonthlyPrice, setShowMonthlyPrice] = useState(true);
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


    return (

        <div className="plans-container">
            <h2>Plans Data</h2>
            <button onClick={togglePriceDisplay}>
                Toggle Price Display
            </button>
            <table className='plans-table'>
                <tbody>
                    <tr>
                        <th>PlanName</th>
                        {plans.map((plan, index) => (
                            <td key={index}>{plan.name}</td>
                        ))}
                    </tr>
                    {showMonthlyPrice ? (
                        <tr>
                            <th>Monthly Price</th>
                            {plans.map((plan, index) => (
                                <td key={index}>{plan.monthly_price}</td>
                            ))}
                        </tr>
                    ) : (
                        <tr>
                            <th>Yearly Price</th>
                            {plans.map((plan, index) => (
                                <td key={index}>{plan.yearly_price}</td>
                            ))}
                        </tr>
                    )}
                    <tr>
                        <th>Video Quality</th>
                        {plans.map((plan, index) => (
                            <td key={index}>{plan.video_quality}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Resolution</th>
                        {plans.map((plan, index) => (
                            <td key={index}>{plan.resolution}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Devices Allowed</th>
                        {plans.map((plan, index) => (
                            <td key={index}>{plan.devices_allowed.join(', ')}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Active Screens</th>
                        {plans.map((plan, index) => (
                            <td key={index}>{plan.active_screens}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );


};

export default DisplayPlans;
