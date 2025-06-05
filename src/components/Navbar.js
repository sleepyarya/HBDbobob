import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          fontSize: '2rem',
          textAlign: 'left',
          flex: 1,
          marginRight: '4rem',
          '@media (maxWidth: 768px)': {
            fontSize: '1.5rem',
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
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '5px',
          marginTop: '1rem',
          '&::-webkit-scrollbar': {
            height: '6px',
            display: 'block'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.7)'
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
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <span style={{ fontSize: '1.3rem', cursor: 'pointer' }}>{item.icon}</span>
              <span style={{ cursor: 'pointer' }}>{item.name}</span>
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
      </div>
      <div style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '1rem',
        marginTop: '0.5rem',
        letterSpacing: '0.5px',
        fontWeight: 500
      }}>
        ⬅️ Scroll ke kiri jika menu tidak terlihat sampai tombol logout
      </div>
    </nav>
  );
};

export default Navbar; 