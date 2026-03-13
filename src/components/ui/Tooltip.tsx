import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  delay = 0,
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  const show = () => {
    const t = setTimeout(() => setIsVisible(true), delay);
    setTimer(t);
  };

  const hide = () => {
    if (timer) clearTimeout(timer);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-primary)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-primary)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-primary)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-primary)]',
  };

  return (
    <div 
      className="relative flex items-center" 
      onMouseEnter={show} 
      onMouseLeave={hide}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positionClasses[position]} px-2.5 py-1.5 bg-[var(--color-primary)] text-white text-[11px] font-bold rounded-[var(--radius-sm)] whitespace-nowrap shadow-lg z-[999] animate-in fade-in zoom-in-95 duration-150`}>
          {content}
          <div className={`absolute border-[5px] border-transparent ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
