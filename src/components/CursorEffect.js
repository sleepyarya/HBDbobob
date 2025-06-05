import React, { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners to all buttons and links
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y - 15,
        left: position.x - 15,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 105, 180, 0.3)',
        border: '2px solid',
        borderColor: isHovering ? '#FF69B4' : 'white',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'all 0.1s ease',
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        mixBlendMode: 'difference'
      }}
    />
  );
};

export default CursorEffect; 