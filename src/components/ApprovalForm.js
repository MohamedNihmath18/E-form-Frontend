import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; // Correct path for CSS import

const ApprovalForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
                setFormData(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchFormData();
    }, [id]);

    const onApprove = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/forms/${id}/approve`, formData);
            console.log(res.data);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const onReject = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/forms/${id}/reject`, formData);
            console.log(res.data);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>Error loading form data</div>;
    }

    const { name, designation, effectiveDate, effectiveUntil, department, accessRights, idCreation, remarks, requestedBy } = formData;

    return (
        <div className="form-container">
            <h1 className="form-header">Mahsa Specialist Hospital</h1>
            <h2 className="form-title">Access Rights Requisition - Approval</h2>
            <div className="form-group">
                <label>Name:</label>
                <div>{name}</div>
            </div>
            <div className="form-group">
                <label>Designation:</label>
                <div>{designation}</div>
            </div>
            <div className="form-group">
                <label>Effective Date:</label>
                <div>{effectiveDate}</div>
            </div>
            <div className="form-group">
                <label>Effective Until:</label>
                <div>{effectiveUntil}</div>
            </div>
            <div className="form-group">
                <label>Department:</label>
                <div>{department}</div>
            </div>
            <div className="form-group">
                <label>Access Rights:</label>
                <div>New: {accessRights.new ? 'Yes' : 'No'}</div>
                <div>Change: {accessRights.change ? 'Yes' : 'No'}</div>
                <div>Block/Inactive: {accessRights.blockInactive ? 'Yes' : 'No'}</div>
            </div>
            <table className="form-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID Creation</th>
                        <th>Yes</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {idCreation.map((item, index) => (
                        <tr key={index}>
                            <td>{item.no}</td>
                            <td>{item.idCreation}</td>
                            <td>{item.yes ? 'Yes' : 'No'}</td>
                            <td>{item.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-group">
                <label>Remarks:</label>
                <div>{remarks}</div>
            </div>
            <div className="form-group">
                <label>Requested By:</label>
                <div>{requestedBy.name}</div>
                <div>{requestedBy.email}</div>
            </div>
            <button onClick={onApprove} className="submit-button">Approve</button>
            <button onClick={onReject} className="submit-button">Reject</button>
        </div>
    );
};

export default ApprovalForm;
