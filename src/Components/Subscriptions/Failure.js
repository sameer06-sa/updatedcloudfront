import React from 'react';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: 'red' }}>❌ Payment Failed!</h1>
      <p>Something went wrong with your payment. Please try again.</p>
      <button 
        onClick={() => navigate('/subscription')} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
      >
        Try Again
      </button>
    </div>
  );
};

export default Failure;
