import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './DisplayTable.css';

const DisplayPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showMonthlyPrice, setShowMonthlyPrice] = useState(true);
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

    const handlePlanHeaderClick = (plan) => {
        console.log(plan);
        setSelectedPlan(plan);
    };


    const handleAlert = () => {
        alert('Please Select a plan to proceed..');
    };

    const handleProceed = () => {
        if (selectedPlan) {
            console.log(selectedPlan); // Check if the correct plan data is logged
            navigate(`/billing`, { state: { selectedPlan: selectedPlan } });
        } else {
            alert('Please Select a plan to proceed..');
        }
    };

    return (
        <div className="plans-container">
            <h2>Plans Data</h2>
            <button onClick={togglePriceDisplay}>
                Toggle Price Display
            </button>
            <table className='plans-table'>
                <thead>
                    <tr>
                        <th>PlanName</th>
                        {plans.map((plan, index) => (
                            <th
                                key={index}
                                className={selectedPlan === plan ? 'selected' : ''}
                                onClick={() => handlePlanHeaderClick(plan)}
                            >
                                {plan.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {showMonthlyPrice ? (
                        <tr>
                            <th>Monthly Price</th>
                            {plans.map((plan, index) => (
                                <td
                                    key={index}
                                    className={selectedPlan === plan ? 'selected' : ''}
                                >
                                    {plan.monthly_price}
                                </td>
                            ))}
                        </tr>
                    ) : (
                        <tr>
                            <th>Yearly Price</th>
                            {plans.map((plan, index) => (
                                <td
                                    key={index}
                                    className={selectedPlan === plan ? 'selected' : ''}
                                >
                                    {plan.yearly_price}
                                </td>
                            ))}
                        </tr>
                    )}
                    <tr>
                        <th>Video Quality</th>
                        {plans.map((plan, index) => (
                            <td
                                key={index}
                                className={selectedPlan === plan ? 'selected' : ''}
                            >
                                {plan.video_quality}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Resolution</th>
                        {plans.map((plan, index) => (
                            <td
                                key={index}
                                className={selectedPlan === plan ? 'selected' : ''}
                            >
                                {plan.resolution}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Devices Allowed</th>
                        {plans.map((plan, index) => (
                            <td
                                key={index}
                                className={selectedPlan === plan ? 'selected' : ''}
                            >
                                {plan.devices_allowed.join(', ')}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th>Active Screens</th>
                        {plans.map((plan, index) => (
                            <td
                                key={index}
                                className={selectedPlan === plan ? 'selected' : ''}
                            >
                                {plan.active_screens}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {selectedPlan ? (
                <button onClick={handleProceed}>Go to Billing</button>
            ) : (
                <button onClick={handleAlert}>Please Select a plan to proceed..</button>
            )}
        </div>
    );
};

export default DisplayPlans;
