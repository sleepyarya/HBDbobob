import React, { useState, useEffect } from 'react';
import MobileView from './views/MobileView';
import DesktopView from './views/DesktopView';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default Dashboard;