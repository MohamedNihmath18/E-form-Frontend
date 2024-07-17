import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        effectiveDate: '',
        effectiveUntil: '',
        department: '',
        accessRights: {
            new: false,
            change: false,
            blockInactive: false
        },
        idCreation: [
            { name: 'Healthcare Information System', yes: false, no: false, remark: '' },
            { name: 'Outlook', yes: false, no: false, remark: '' },
            { name: 'Domain', yes: false, no: false, remark: '' },
            { name: 'VPN', yes: false, no: false, remark: '' },
        ],
        remarks: '',
        requestedByName: '',
        requestedByEmail: '',
        approverEmail: ''
    });

    const approverEmails = [
        'mn1788@srmist.edu.in',
        'irwansuli.orange@gmail.com',
        'atielave15@gmail.com'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, accessRights: { ...formData.accessRights, [name]: checked } });
    };

    const handleIdCreationChange = (index, field, value) => {
        const updatedIdCreation = [...formData.idCreation];
        updatedIdCreation[index][field] = value;
        setFormData({ ...formData, idCreation: updatedIdCreation });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://e-form-backend-1.onrender.com/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Form submitted:', data);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <img src="https://www.mahsahospital.com/wp-content/uploads/2019/11/mahsa-logo.png" alt="Mahsa Specialist Hospital" className="form-logo" />
            <h1>Access Rights Requisition</h1>
            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        name="new"
                        checked={formData.accessRights.new}
                        onChange={handleCheckboxChange}
                    />
                    New
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="change"
                        checked={formData.accessRights.change}
                        onChange={handleCheckboxChange}
                    />
                    Change
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="blockInactive"
                        checked={formData.accessRights.blockInactive}
                        onChange={handleCheckboxChange}
                    />
                    Block/Inactive
                </label>
            </div>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Designation:</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Effective Date:</label>
                <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Effective Until:</label>
                <input type="date" name="effectiveUntil" value={formData.effectiveUntil} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Department:</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </div>
            <table className="id-creation-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID Creation</th>
                        <th>Yes</th>
                        <th>No</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.idCreation.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={item.yes} 
                                    onChange={() => handleIdCreationChange(index, 'yes', !item.yes)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={item.no} 
                                    onChange={() => handleIdCreationChange(index, 'no', !item.no)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    value={item.remark} 
                                    onChange={(e) => handleIdCreationChange(index, 'remark', e.target.value)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-group">
                <label>Remarks (for IT Department):</label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <label>Requested By (Name):</label>
                <input type="text" name="requestedByName" value={formData.requestedByName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Requested By (Email):</label>
                <input type="email" name="requestedByEmail" value={formData.requestedByEmail} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Approver Email:</label>
                <select name="approverEmail" value={formData.approverEmail} onChange={handleChange}>
                    <option value="">Select Approver</option>
                    {approverEmails.map(email => (
                        <option key={email} value={email}>{email}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Get Approve</button>
        </form>
    );
};

export default Form;
