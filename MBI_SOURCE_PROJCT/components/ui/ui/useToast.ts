// hooks/useToast.ts
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/context/ToastContext';

export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  
  const { dispatch } = context;
  
  const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now().toString();
    
    dispatch({
      type: 'ADD_TOAST',
      payload: { id, message, type, duration }
    });
    
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  };
  
  return { showToast };
}