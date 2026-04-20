// components/ui/Modal.tsx
'use client';

import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 neu-backdrop animate-fade-in">
      <div 
        className={`
          neu-card w-full ${sizeClasses[size]} 
          animate-scale-in relative
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <Icon icon="lucide:x" width={24} />
              </button>
            )}
          </div>
        )}
        
        <div className="max-h-[70vh] overflow-y-auto neu-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}