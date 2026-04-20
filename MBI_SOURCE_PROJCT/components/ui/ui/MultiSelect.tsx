// components/ui/MultiSelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, value = [], onChange, placeholder = 'Select options...' }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };
  
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );
  
  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label);
  
  return (
    <div ref={containerRef} className="relative">
      <div
        className="neu-input cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedLabels.length > 0
            ? selectedLabels.join(', ')
            : placeholder}
        </span>
        <Icon
          icon={isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'}
          width={20}
          className="text-muted-foreground"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 neu-card z-10 max-h-64 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="max-h-48 overflow-y-auto neu-scrollbar">
            {filteredOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="rounded border-border"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
            
            {filteredOptions.length === 0 && (
              <div className="px-3 py-4 text-center text-muted-foreground text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}