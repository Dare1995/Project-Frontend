import React, { useEffect, useState } from 'react';
import './pendingJobsCard.css';

const PendingJobCard = ({ title = null, jobId, aplicationId, handleRenew }) => {
    const [token, setToken] = useState(`${localStorage.getItem("jwt_token")}`);


    const handlePending = async (decision, appId) => {
        const status = decision;
        let acceptedStatus;
        if (decision === 'assigned') {
            acceptedStatus = 'in progress';
        } else if (decision === 'rejected') {
            acceptedStatus = 'rejected';
        }
        try {
            const aplicationEdit = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/application/${appId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status,
                    acceptedStatus,
                }),
            });
            const updatedApp = await aplicationEdit.json();
            handleRenew();
        } catch (error) {
            console.log("This is the error: ", error);
        };
    };

    return (
        <>
            {(title) ?
                <div className='pending-job-card'>
                    <span>{title}</span>
                    <div className='pending-job-card-status'>
                        <button className='accept-button' onClick={(e) => handlePending('assigned', aplicationId)}>Accept</button>
                        <button className='reject-button' onClick={(e) => handlePending('rejected', aplicationId)}>Reject</button>
                    </div>
                </div> : <div className='pending-job-card'>
                    <span>No data to be displayed.</span>
                </div>

            }
        </>
    )
}

export default PendingJobCard