import { useEffect, useState } from 'react';

export function useTheme() {
  // O tema padrão é 'light' (branco)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
} 