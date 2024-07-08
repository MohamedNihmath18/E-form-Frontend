import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import ApprovalForm from './components/ApprovalForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/approve-request/:id" element={<ApprovalForm />} />
            </Routes>
        </Router>
    );
};

export default App;
