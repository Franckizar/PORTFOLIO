'use client';

import { createContext, useReducer, ReactNode } from 'react';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  // | { type: 'ADD_TOAST'; payload: Toast }
  // | { type: 'REMOVE_TOAST'; id: string }
   | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }  ;
  

interface ToastContextValue {
  state: ToastState;
  dispatch: React.Dispatch<ToastAction>;
}

// Context
export const ToastContext = createContext<ToastContextValue | null>(null);

// Reducer
function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return { toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { toasts: state.toasts.filter((t) => t.id !== action.payload) }; // ← action.payload not action.id
    default:
      return state;
  }
}

// Provider
export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
}