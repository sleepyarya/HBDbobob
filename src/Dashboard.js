import React, { useState, useEffect } from 'react';
import MobileView from './views/MobileView';
import DesktopView from './views/DesktopView';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    // Check initial device width
    checkDevice();

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default Dashboard;