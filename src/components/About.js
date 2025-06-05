import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#FFE4E1',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar />
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
          }}>Pembuat Website</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '2rem',
            '@media (max-width: 768px)': {
              fontSize: '1rem',
              marginBottom: '1.5rem'
            }
          }}>Website ini dibuat dengan ❤️ untuk Anda</p>
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#FFF0F5',
            borderRadius: '8px',
            '@media (max-width: 768px)': {
              padding: '1rem',
              marginTop: '1rem'
            }
          }}>
            <h3 style={{ 
              color: '#FF69B4',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              '@media (max-width: 768px)': {
                fontSize: '1.2rem'
              }
            }}>Tentang Website Ini</h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              lineHeight: '1.6',
              '@media (max-width: 768px)': {
                fontSize: '1rem'
              }
            }}>Website ini dibuat dengan sepenuh hati untuk memberikan pengalaman yang menyenangkan bagi penggunanya.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 