import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...props
  }, ref) => {

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg',
    };

    const variantClasses = {
      primary:   'neu-badge-primary text-white',
      secondary: 'neu-raised-sm text-foreground hover:text-primary',
      success:   'neu-badge-success text-white',
      warning:   'neu-badge-warning text-white',
      error:     'neu-badge-error text-white',
      ghost:     'bg-transparent hover:neu-raised-sm text-foreground',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          neu-btn inline-flex items-center justify-center gap-2
          rounded-xl font-medium
          transition-all duration-[var(--transition-fast)]
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin w-4 h-4 shrink-0"
            viewBox="0 0 24 24" fill="none"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {!isLoading && Icon && iconPosition === 'left'  && <Icon size={18} className="shrink-0" />}
        {children}
        {!isLoading && Icon && iconPosition === 'right' && <Icon size={18} className="shrink-0" />}
      </button>
    );
  }
);

Button.displayName = 'Button';