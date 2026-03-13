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
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            {label}
          </label>
          <span className="text-[13px] tabular-nums text-[var(--color-text-primary)]">
            {value}{unit}
          </span>
        </div>
      )}
      <div className="relative flex items-center h-6 group">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            background: `linear-gradient(to right, var(--color-interactive) 0%, var(--color-interactive) ${((value - min) / (max - min)) * 100}%, var(--color-bg-hover) ${((value - min) / (max - min)) * 100}%, var(--color-bg-hover) 100%)`
          }}
          className="rekap-slider"
        />
      </div>
    </div>
  );
};

export default Slider;
