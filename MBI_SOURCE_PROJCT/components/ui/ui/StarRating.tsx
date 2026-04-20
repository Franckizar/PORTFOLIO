// components/ui/StarRating.tsx
'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface StarRatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readonly = false,
  size = 'md'
}: StarRatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);
  const currentValue = value !== undefined ? value : internalValue;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const handleClick = (rating: number) => {
    if (readonly) return;
    if (value === undefined) setInternalValue(rating);
    onChange?.(rating);
  };
  
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          onClick={() => handleClick(rating)}
          onMouseEnter={() => !readonly && setHoverValue(rating)}
          onMouseLeave={() => !readonly && setHoverValue(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
          disabled={readonly}
        >
          <Icon
            icon={rating <= (hoverValue || currentValue) ? 'lucide:star' : 'lucide:star'}
            className={`
              ${sizeClasses[size]}
              ${rating <= (hoverValue || currentValue) 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-400'}
              transition-colors duration-200
            `}
          />
        </button>
      ))}
    </div>
  );
}