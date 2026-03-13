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
          className="w-full h-[3px] bg-[var(--color-bg-hover)] rounded-full appearance-none cursor-pointer outline-none transition-all
            accent-[var(--color-interactive)]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:h-3.5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-[var(--color-interactive)]
            [&::-webkit-slider-thumb]:shadow-[var(--shadow-xs)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:active:scale-110"
        />
        {/* Fill track (optional, tailwind accent usually handles it but for precise design:) */}
        <div 
          className="absolute left-0 h-[3px] bg-[var(--color-interactive)] rounded-full pointer-events-none"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;
