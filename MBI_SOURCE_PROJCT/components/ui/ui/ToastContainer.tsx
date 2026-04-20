// components/ui/ToastContainer.tsx
'use client';

import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';
import { Icon } from '@iconify/react';

const toastIcons = {
  success: 'lucide:check-circle',
  error: 'lucide:x-circle',
  warning: 'lucide:alert-triangle',
  info: 'lucide:info'
};

const toastColors = {
  success: 'neu-badge-success',
  error: 'neu-badge-error',
  warning: 'neu-badge-warning',
  info: 'neu-badge-info'
};

export function ToastContainer() {
  const context = useContext(ToastContext);
  
  if (!context) return null;
  
  const { state } = context;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
            animate-neu-toast-in ${toastColors[toast.type]}
          `}
        >
          <Icon icon={toastIcons[toast.type]} width={20} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}