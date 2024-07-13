import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import ApprovalPage from './components/ApprovalPage/ApprovalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/approval/:id" element={<ApprovalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
