import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ApprovalPage.css';

const ApprovalPage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await fetch(`https://e-form-backend-1.onrender.com/api/forms/${id}`);
                if (!response.ok) {
                    throw new Error('Form not found');
                }
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchForm();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="approval-page">
            <h1>Approval Form</h1>
            {formData && (
                <div>
                    <p>Name: {formData.name}</p>
                    <p>Designation: {formData.designation}</p>
                    <p>Effective Date: {formData.effectiveDate}</p>
                    <p>Effective Until: {formData.effectiveUntil}</p>
                    <p>Department: {formData.department}</p>
                    <p>Remarks: {formData.remarks}</p>
                    <p>Requested By: {formData.requestedByName} ({formData.requestedByEmail})</p>
                    <button onClick={() => handleApproval('approved')}>Approve</button>
                    <button onClick={() => handleApproval('rejected')}>Reject</button>
                </div>
            )}
        </div>
    );
};

const handleApproval = async (status) => {
    try {
        const response = await fetch(`https://e-form-backend-1.onrender.com/api/forms/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Error updating form status');
        }

        const result = await response.json();
        console.log('Form status updated:', result);
    } catch (err) {
        console.error('Error:', err);
    }
};

export default ApprovalPage;
