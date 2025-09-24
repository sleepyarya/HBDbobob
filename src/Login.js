import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'pavana' && password.toLowerCase() === 'bobob') {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('SELAMAT DATANG SAYANGKUUU', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/dashboard');
    } else {
      setError('Login gagal');
      toast.error('Username atau Password Salah!', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4E1',
    padding: isMobile ? '1rem' : '2rem',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };

  const formStyle = {
    width: isMobile ? '90%' : '400px',
    maxWidth: '450px',
    backgroundColor: '#fff',
    borderRadius: isMobile ? '16px' : '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '0.8rem' : '1rem',
    border: '2px solid #ffb6c1',
    position: 'relative',
    transition: 'transform 0.3s ease',
  };

  const titleStyle = {
    fontSize: isMobile ? '1.5rem' : '2rem',
    color: '#ff4d6d',
    textAlign: 'center',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 8px rgba(255,77,109,0.2)'
  };

  const inputStyle = {
    padding: isMobile ? '0.8rem' : '1rem',
    borderRadius: '8px',
    border: '2px solid #ffb6c1',
    fontSize: isMobile ? '0.95rem' : '1rem',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: '0.5rem'
  };

  const buttonStyle = {
    padding: isMobile ? '0.8rem' : '1rem',
    backgroundColor: '#ff4d6d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: isMobile ? '0.95rem' : '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    marginTop: isMobile ? '0.5rem' : '1rem'
  };

  const errorStyle = {
    color: '#ff4d6d',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    textAlign: 'center',
    marginTop: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <h1 style={titleStyle}>
          <span role="img" aria-label="birthday">🎂</span>
          {' '}HBD WEBSITE{' '}
          <span role="img" aria-label="birthday">🎉</span>
        </h1>
        
        <form onSubmit={handleSubmit} style={formStyle} className="login-card">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <h3>
            HINT :username yg biasa kamu pake | Password : panggilanmu dari akuh
          </h3>
          <button type="submit" className="login-button" style={buttonStyle}>
            Login
          </button>
          {error && <div style={errorStyle}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;