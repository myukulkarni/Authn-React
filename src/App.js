// App.js (Example of passing userId)
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import VerifyOtp from './components/verify-otp';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null); // Store the userId after registration

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register setUserId={setUserId} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp userId={userId} />} /> 
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
