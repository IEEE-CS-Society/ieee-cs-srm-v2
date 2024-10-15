// ui.aceternity.com
// added these for 3d effect on cards, heheheheh -_-

export const CardContainer = ({ children, className }) => {
  return (
    <div
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardBody = ({ children, className }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <div
      className={`transform-gpu transition-transform duration-800 ease-out hover:shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export const CardItem = ({ children, translateZ, className, as = 'div', ...props }) => {
  const Component = as;

  return (
    <Component
      className={`transition-transform duration-150 ease-out ${className}`}
      style={{ transform: `translateZ(${translateZ}px)` }}
      {...props}
    >
      {children}
    </Component>
  );
};