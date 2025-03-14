import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Success = () => {
  const navigate = useNavigate();

  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f8f9fa',
    },
    container: {
      display: 'flex',
      flex: 1,
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
    },
    card: {
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '450px',
      width: '100%',
    },
    heading: {
      color: 'green',
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '15px',
      whiteSpace: 'nowrap', // Ensures text stays in a single line
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    text: {
      fontSize: '18px',
      color: '#333',
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
      transition: 'background 0.3s',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <Header />

      <div style={styles.container}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={styles.content}>
          <div style={styles.card}>
            <h1 style={styles.heading}>🎉 Payment Successful!</h1>
            <p style={styles.text}>Your subscription has been updated successfully.</p>
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={() => navigate('/freetrail')}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
