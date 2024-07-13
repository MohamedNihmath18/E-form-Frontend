import React, { useState, useEffect } from 'react';
import './ApprovalPage.css';

const ApprovalPage = ({ match }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch form data based on the ID from the URL (match.params.id)
    // Assuming you have an API endpoint to get the form data by ID
    fetch(`/api/forms/${match.params.id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(error => console.error('Error fetching form data:', error));
  }, [match.params.id]);

  const handleApprove = () => {
    // Handle approval logic here
    console.log('Form approved');
    // Optionally, send approval status to the server
  };

  const handleReject = () => {
    // Handle rejection logic here
    console.log('Form rejected');
    // Optionally, send rejection status to the server
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="approval-page">
      <img src="/assets/mahsa-logo.png" alt="Mahsa Specialist Hospital" />
      <h1>Access Rights Requisition</h1>
      <div>
        <label>Name:</label>
        <span>{formData.name}</span>
      </div>
      <div>
        <label>Designation:</label>
        <span>{formData.designation}</span>
      </div>
      <div>
        <label>Effective Date:</label>
        <span>{formData.effectiveDate}</span>
      </div>
      <div>
        <label>Effective Until:</label>
        <span>{formData.effectiveUntil}</span>
      </div>
      <div>
        <label>Department:</label>
        <span>{formData.department}</span>
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
              <td>{item.yes ? 'Yes' : ''}</td>
              <td>{item.no ? 'No' : ''}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>Remarks (for IT Department):</label>
        <span>{formData.remarks}</span>
      </div>
      <div>
        <label>Requested By (Name):</label>
        <span>{formData.requestedByName}</span>
      </div>
      <div>
        <label>Requested By (Email):</label>
        <span>{formData.requestedByEmail}</span>
      </div>
      <div className="button-group">
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default ApprovalPage;