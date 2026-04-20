// components/ui/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full neu-raised-sm animate-pulse"></div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="neu-btn neu-raised-sm p-2 rounded-full transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Icon icon="lucide:sun" width={24} className="text-yellow-500" />
      ) : (
        <Icon icon="lucide:moon" width={24} className="text-slate-700" />
      )}
    </button>
  );
}