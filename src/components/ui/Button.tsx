import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  as?: any;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className = '',
  as: Component = 'button',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-1.5 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-[var(--radius-sm)]';
  
  const variantStyles = {
    primary: 'bg-[var(--color-interactive)] text-[var(--color-text-inverse)] hover:bg-[var(--color-gray-800)] dark:hover:bg-[var(--color-gray-200)]',
    secondary: 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-panel)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]',
    danger: 'bg-[var(--color-bg-surface)] text-red-600 border border-red-200 hover:bg-red-50',
  };

  const sizeStyles = {
    sm: 'h-7 px-2 text-[12px]',
    md: 'h-8 px-3 text-[13px]',
    lg: 'h-9 px-4 text-[14px]',
  };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </Component>
  );
};

export default Button;
