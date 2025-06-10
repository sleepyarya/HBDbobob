// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import MobileView from './views/MobileView';
import DesktopView from './views/DesktopView';

const Dashboard = () => {
  // Langsung set isMobile berdasarkan ukuran layar saat pertama load
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    // Function untuk update state ketika ukuran window berubah
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    // Tambahkan event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener saat component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render view yang sesuai
  return isMobile ? <MobileView /> : <DesktopView />;
};

export default Dashboard;