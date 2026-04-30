// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/context/ToastContext';
// import { ToastContainer } from '@/components/ui/ToastContainer';
import { ToastContainer } from '@/components/ui/ui/ToastContainer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  );
}