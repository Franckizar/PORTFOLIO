// components/ui/Badge.tsx
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const variantClasses = {
    default: 'neu-badge-default',
    primary: 'neu-badge-primary',
    success: 'neu-badge-success',
    warning: 'neu-badge-warning',
    error: 'neu-badge-error',
    info: 'neu-badge-info'
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
}