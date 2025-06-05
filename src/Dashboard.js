import React from 'react';
import Navbar from './components/Navbar';
import LoveAnimation from './components/LoveAnimation';

const Dashboard = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#FFE4E1',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar />
      <LoveAnimation />
      <div style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '90%',
        boxSizing: 'border-box',
        '@media (max-width: 768px)': {
          padding: '1rem',
          width: '95%'
        }
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '@media (max-width: 768px)': {
            padding: '1rem'
          }
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#333',
            '@media (max-width: 768px)': {
              fontSize: '1.5rem'
            }
          }}>Welcome to the Dashboard!</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6',
            '@media (max-width: 768px)': {
              fontSize: '1rem'
            }
          }}>This is your personal dashboard with a beautiful pink theme.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 