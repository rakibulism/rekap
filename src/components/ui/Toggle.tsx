import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, icon }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {icon && <span className="text-[var(--color-text-primary)]">{icon}</span>}
        <span className="text-[13px] text-[var(--color-text-primary)]">{label}</span>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-[var(--duration-default)] ease-in-out
          ${checked ? 'bg-[var(--color-interactive)]' : 'bg-[var(--color-border-default)]'}`}
      >
        <span
          className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow-[var(--shadow-xs)] transition-transform duration-[var(--duration-default)]
            ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};

export default Toggle;
