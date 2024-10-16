import React, { useEffect } from 'react';

const AnimatedBackground = () => {
  useEffect(() => {
    const animateDrops = () => {
      document.querySelectorAll('.animated-drop').forEach(drop => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        drop.style.left = `${x}%`;
        drop.style.top = `${y}%`;
      });
    };
    const interval = setInterval(animateDrops, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="animated-drop" id="drop1"></div>
      <div className="animated-drop" id="drop2"></div>
    </>
  );
};

export default AnimatedBackground;