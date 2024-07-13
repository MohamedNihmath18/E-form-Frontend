import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        effectiveDate: '',
        effectiveUntil: '',
        department: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (index, field, value) => {
        const updatedIdCreation = [...formData.idCreation];
        updatedIdCreation[index][field] = value;
        setFormData({ ...formData, idCreation: updatedIdCreation });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/forms', {
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
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Designation:</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
            <div>
                <label>Effective Date:</label>
                <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
            </div>
            <div>
                <label>Effective Until:</label>
                <input type="date" name="effectiveUntil" value={formData.effectiveUntil} onChange={handleChange} />
            </div>
            <div>
                <label>Department:</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </div>
            <table>
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
                                    onChange={() => handleCheckboxChange(index, 'yes', !item.yes)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={item.no} 
                                    onChange={() => handleCheckboxChange(index, 'no', !item.no)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    value={item.remark} 
                                    onChange={(e) => handleCheckboxChange(index, 'remark', e.target.value)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label>Remarks (for IT Department):</label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>Requested By (Name):</label>
                <input type="text" name="requestedByName" value={formData.requestedByName} onChange={handleChange} />
            </div>
            <div>
                <label>Requested By (Email):</label>
                <input type="email" name="requestedByEmail" value={formData.requestedByEmail} onChange={handleChange} />
            </div>
            <div>
                <label>Approver Email:</label>
                <input type="email" name="approverEmail" value={formData.approverEmail} onChange={handleChange} />
            </div>
            <button type="submit">Get Approve</button>
        </form>
    );
};

export default Form;
