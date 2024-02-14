import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  let timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      if (tooltipRef.current && !tooltipRef.current.contains(document.activeElement)) {
        setIsVisible(false);
      }
    }, 120); // 100ms delay
  };

  return (
    <div className="relative top-0">
      <div
        ref={tooltipRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="absolute z-10 px-2 py-1 mb-2 text-sm bg-[#556BB1] text-white rounded-md  shadow-lg top-1/2 left-1/2 transform -translate-y-[120%] -translate-x-1/2"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
