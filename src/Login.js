import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom hook to detect if device is mobile based on window width
function useIsMobile(breakpoint = 768) {
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
    if (username === 'pavana' && password === 'bobob') {
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
    }
  };

  // Card style based on device
  const cardStyle = isMobile
    ? {
        width: '98vw',
        maxWidth: '98vw',
        minWidth: '0',
        boxSizing: 'border-box',
        padding: '2rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : {
        width: '100%',
        maxWidth: '400px',
        minWidth: '320px',
        boxSizing: 'border-box',
        padding: '2.5rem 2rem 2rem 2rem',
      };

  return (
    <div className="login-container" style={{
      minHeight: isMobile ? '100vh' : 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      paddingTop: isMobile ? '0' : '5vh',
      paddingBottom: isMobile ? '0' : '5vh',
    }}>
      <h1 className="login-title" style={{
        textAlign: 'center',
        color: '#ff4d6d',
        fontWeight: 'bold',
        fontSize: isMobile ? '1.3rem' : '2.2rem',
        marginTop: isMobile ? '0.2rem' : '0.5rem',
        marginBottom: isMobile ? '0.7rem' : '1.2rem',
        letterSpacing: '1px',
        textShadow: '2px 2px 8px #fff0f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
      }}>
        <span role="img" aria-label="birthday">🎂</span> HBD WEBSITE <span role="img" aria-label="birthday">🎉</span>
      </h1>
      <form className="login-form" onSubmit={handleSubmit} style={{
        ...cardStyle,
        borderRadius: isMobile ? '14px' : '20px',
        fontSize: isMobile ? '0.98rem' : '1rem',
        margin: 0,
      }}>
        <h2 style={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ fontSize: isMobile ? '0.95rem' : '1rem', padding: isMobile ? '0.6rem' : '0.7rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontSize: isMobile ? '0.95rem' : '1rem', padding: isMobile ? '0.6rem' : '0.7rem' }}
        />
        <button type="submit" style={{ fontSize: isMobile ? '0.95rem' : '1rem', padding: isMobile ? '0.6rem' : '0.7rem' }}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login; 