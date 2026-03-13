import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          {label}
        </label>
        <span className="text-[13px] tabular-nums text-[var(--color-text-primary)]">
          {value}{unit}
        </span>
      </div>
      <div className="relative flex items-center h-4 group">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        {/* Track Background */}
        <div className="w-full h-[3px] bg-[var(--color-bg-hover)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-interactive)] rounded-full"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
        </div>
        {/* Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-interactive)] shadow-[var(--shadow-xs)] pointer-events-none transition-transform group-active:scale-110"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 7px)` }}
        />
      </div>
    </div>
  );
};

export default Slider;
