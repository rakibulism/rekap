

interface Option<T> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

const SegmentedControl = <T extends string | number>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) => {
  return (
    <div className={`flex p-1 bg-[var(--color-bg-panel)] rounded-[var(--radius-sm)] flex-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 h-7 flex items-center justify-center text-[12px] font-medium rounded-[3px] transition-all
            ${
              value === option.value
                ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-xs)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
