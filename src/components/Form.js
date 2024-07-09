import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Correct path for CSS import

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        effectiveDate: '',
        effectiveUntil: '',
        department: '',
        accessRights: { new: false, change: false, blockInactive: false },
        idCreation: [
            { no: 1, idCreation: 'Healthcare Information System', yes: false, remark: '' },
            { no: 2, idCreation: 'Outlook', yes: false, remark: '' },
            { no: 3, idCreation: 'Domain', yes: false, remark: '' },
            { no: 4, idCreation: 'VPN', yes: false, remark: '' },
        ],
        remarks: '',
        requestedBy: { name: '', email: '' },
        approvedBy: { email: '' },
    });

    const navigate = useNavigate();

    const onChange = e => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('requestedBy')) {
            setFormData(prevState => ({
                ...prevState,
                requestedBy: {
                    ...prevState.requestedBy,
                    [name.split('.')[1]]: value
                }
            }));
        } else if (name.startsWith('approvedBy')) {
            setFormData(prevState => ({
                ...prevState,
                approvedBy: {
                    ...prevState.approvedBy,
                    email: value
                }
            }));
        } else if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                accessRights: {
                    ...prevState.accessRights,
                    [name]: checked
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const onIdCreationChange = (index, field, value) => {
        const newIdCreation = [...formData.idCreation];
        newIdCreation[index][field] = value;
        setFormData({ ...formData, idCreation: newIdCreation });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/forms', formData);
            console.log(res.data);
            navigate(`/approve-request/${res.data._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            {/* <img src="./assets/mahsa-logo.png" alt="Company Symbol" /> */}
            <img src="https://www.mahsahospital.com/wp-content/uploads/2019/11/mahsa-logo.png"/>
            {/* <h1 className="form-header">Mahsa Specialist Hospital</h1> */}
            <h2 className="form-title">Access Rights Requisition</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>
                        <input type="checkbox" name="new" checked={formData.accessRights.new} onChange={onChange} /> New
                    </label>
                    <label>
                        <input type="checkbox" name="change" checked={formData.accessRights.change} onChange={onChange} /> Change
                    </label>
                    <label>
                        <input type="checkbox" name="blockInactive" checked={formData.accessRights.blockInactive} onChange={onChange} /> Block/Inactive
                    </label>
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Designation:</label>
                    <input type="text" name="designation" value={formData.designation} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Effective Date:</label>
                    <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Effective Until:</label>
                    <input type="date" name="effectiveUntil" value={formData.effectiveUntil} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <input type="text" name="department" value={formData.department} onChange={onChange} required />
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
                        {formData.idCreation.map((item, index) => (
                            <tr key={index}>
                                <td>{item.no}</td>
                                <td>{item.idCreation}</td>
                                <td>
                                    <input type="checkbox" checked={item.yes} onChange={e => onIdCreationChange(index, 'yes', e.target.checked)} />
                                </td>
                                <td>
                                    <input type="text" value={item.remark} onChange={e => onIdCreationChange(index, 'remark', e.target.value)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="form-group">
                    <label>Remarks:</label>
                    <textarea name="remarks" value={formData.remarks} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Requested By (Name):</label>
                    <input type="text" name="requestedBy.name" value={formData.requestedBy.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Requested By (Email):</label>
                    <input type="email" name="requestedBy.email" value={formData.requestedBy.email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Send To:</label>
                    <select name="approvedBy.email" value={formData.approvedBy.email} onChange={onChange} required>
                        <option value="">Select person</option>
                        <option value="mn1788@srmist.edu.in">Nikmat</option>
                        <option value="gladsonkalangiam@gmail.com">Person 2</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <button type="submit" className="submit-button">Get Approve</button>
            </form>
        </div>
    );
};

export default Form;
