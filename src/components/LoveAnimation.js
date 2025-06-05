import React, { useEffect, useRef } from 'react';

const LoveAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerText = '❤️';

      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = Math.random() * 80 + 20 + 'vh';
      heart.style.fontSize = Math.random() * 20 + 16 + 'px';

      containerRef.current.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 4000);
    };

    const interval = setInterval(createHeart, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="love-animation" />;
};

export default LoveAnimation; 