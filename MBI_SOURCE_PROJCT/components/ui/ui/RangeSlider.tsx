// components/ui/RangeSlider.tsx
'use client';

import { useState } from 'react';

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  label
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  
  const percentage = ((currentValue - min) / (max - min)) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (value === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">{currentValue}</span>
        </div>
      )}
      
      <div className="relative pt-1">
        <div className="neu-inset-sm rounded-full h-2">
          <div
            className="neu-progress-fill rounded-full h-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}