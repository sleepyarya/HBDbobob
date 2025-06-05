import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Ambil Foto', path: '/photo', icon: '📸' },
    { name: 'Komentar', path: '/comments', icon: '💬' },
    { name: 'Pembuat Website', path: '/about', icon: '👩‍💻' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: '#FF69B4',
      padding: '1rem',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '1.5rem',
          textAlign: 'left',
          flex: 1,
          '@media (maxWidth: 768px)': {
            fontSize: '1.2rem',
            marginBottom: '0.5rem'
          }
        }}>
          HAPPY BIRTHDAY MY LOVE 💖
        </h2>
        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          '@media (maxWidth: 768px)': {
            display: 'none'
          }
        }}>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="nav-link"
              style={{
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.1rem',
                padding: '0.5rem 1rem'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="nav-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.1rem',
              padding: '0.5rem 1rem'
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>👋</span>
            <span>Logout</span>
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
          style={{
            marginLeft: '1rem',
            fontSize: '1.5rem',
            display: 'block'
          }}
        >
          ☰
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#FF69B4',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '100%',
          boxSizing: 'border-box',
          '@media (minWidth: 769px)': {
            display: 'none'
          }
        }}>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="nav-link"
              style={{
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderLeft: isActive(item.path) ? '3px solid white' : 'none',
                padding: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
              title={item.name}
            >
              {item.icon}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="nav-button"
            style={{
              width: '100%',
              padding: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}
            title="Logout"
          >
            👋
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 