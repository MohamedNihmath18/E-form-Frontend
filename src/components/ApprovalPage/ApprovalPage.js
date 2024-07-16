import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ApprovalPage.css';

const ApprovalPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`https://e-form-backend-1.onrender.com/api/forms/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching form data:', error));
  }, [id]);

  const updateFormStatus = (status) => {
    fetch(`https://e-form-backend-1.onrender.com/api/forms/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Form ${status}`);
        alert(`Form ${status}`);
      })
      .catch(error => console.error('Error updating form status:', error));
  };

  const handleApprove = () => {
    updateFormStatus('approved');
  };

  const handleReject = () => {
    updateFormStatus('rejected');
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    designation,
    effectiveDate,
    effectiveUntil,
    department,
    accessRights,
    idCreation,
    remarks,
    requestedByName,
    requestedByEmail,
  } = formData;

  return (
    <div className="approval-page">
      <img src="https://www.mahsahospital.com/wp-content/uploads/2019/11/mahsa-logo.png" alt="Mahsa Specialist Hospital" />
      <h1>Access Rights Requisition</h1>
      <div>
        <label>Name:</label>
        <span>{name}</span>
      </div>
      <div>
        <label>Designation:</label>
        <span>{designation}</span>
      </div>
      <div>
        <label>Effective Date:</label>
        <span>{effectiveDate}</span>
      </div>
      <div>
        <label>Effective Until:</label>
        <span>{effectiveUntil}</span>
      </div>
      <div>
        <label>Department:</label>
        <span>{department}</span>
      </div>
      
      {accessRights && (
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked={accessRights.new} disabled />
            New
          </label>
          <label>
            <input type="checkbox" checked={accessRights.change} disabled />
            Change
          </label>
          <label>
            <input type="checkbox" checked={accessRights.blockInactive} disabled />
            Block/Inactive
          </label>
        </div>
      )}

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
          {idCreation && idCreation.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.yes ? 'Yes' : ''}</td>
              <td>{item.no ? 'No' : ''}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>Remarks (for IT Department):</label>
        <span>{remarks}</span>
      </div>
      <div>
        <label>Requested By (Name):</label>
        <span>{requestedByName}</span>
      </div>
      <div>
        <label>Requested By (Email):</label>
        <span>{requestedByEmail}</span>
      </div>
      <div className="button-group">
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default ApprovalPage;
