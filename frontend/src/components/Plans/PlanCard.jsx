import React from 'react';

import './PlanCard.css'; // Import your CSS file

const PlanCard = ({ plan, selectedPlan, showMonthlyPrice, handlePlanClick }) => {
    const isSelected = selectedPlan === plan;
    return (
        <article
            className={`plan card ${selectedPlan === plan ? 'selected' : ''}`}
            onClick={() => handlePlanClick(plan)}
        >
            <div className={`inner ${isSelected ? 'focused' : ''}`}>
                <span className="pricing">
                    <span>
                        {showMonthlyPrice ? `${plan.monthly_price} / m` : `${plan.yearly_price} / y`}
                    </span>
                </span>
                <h2 className="title">{plan.name}</h2>
                <ul className="features">
                    <li>
                        <span className="icon">
                            {/* SVG icon code here */}
                        </span>
                        <span>
                            <strong>Video Quality</strong> {plan.video_quality}
                        </span>
                    </li>
                    <li>
                        <span className="icon">
                            {/* SVG icon code here */}
                        </span>
                        <span>
                            <strong>Resolution</strong> {plan.resolution}
                        </span>
                    </li>
                    <li>
                        <span className="icon">
                            {/* SVG icon code here */}
                        </span>
                        <span>
                            <strong>Devices Allowed</strong> {plan.devices_allowed.join(', ')}
                        </span>
                    </li>
                    <li>
                        <span className="icon">
                            {/* SVG icon code here */}
                        </span>
                        <span>
                            <strong>Active Screens</strong> {plan.active_screens}
                        </span>
                    </li>
                    <li>
                        <span className="icon">
                            {/* SVG icon code here */}
                        </span>
                        <span>
                            <strong>Pricing</strong> {showMonthlyPrice ? `${plan.monthly_price}` : `${plan.yearly_price}`}
                        </span>
                    </li>
                </ul>
            </div>
        </article>
    );
};

export default PlanCard;
