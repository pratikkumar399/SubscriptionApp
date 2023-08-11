// PlanTable.js
import React from 'react';

const PlanTable = ({ plansData }) => {
    const plans = plansData.plans;

    return (
        <div>
            <h1>Plans</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Monthly Price</th>
                        <th>Yearly Price</th>
                        <th>Video Quality</th>
                        <th>Resolution</th>
                        <th>Devices Allowed</th>
                        <th>Active Screens</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map(plan => (
                        <tr key={plan.name}>
                            <td>{plan.name}</td>
                            <td>{plan.monthly_price}</td>
                            <td>{plan.yearly_price}</td>
                            <td>{plan.video_quality}</td>
                            <td>{plan.resolution}</td>
                            <td>{plan.devices_allowed.join(', ')}</td>
                            <td>{plan.active_screens}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanTable;
