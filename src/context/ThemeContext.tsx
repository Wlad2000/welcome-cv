import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

const STRICT_MODE_STORAGE_KEY = 'skate-dev-card:strict-mode';

type ThemeContextValue = {
  strictMode: boolean;
  setStrictMode: (enabled: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredStrictMode() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STRICT_MODE_STORAGE_KEY) === 'true';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [strictMode, setStrictModeState] = useState(readStoredStrictMode);

  useEffect(() => {
    window.localStorage.setItem(STRICT_MODE_STORAGE_KEY, String(strictMode));
  }, [strictMode]);

  const value = useMemo(
    () => ({
      strictMode,
      setStrictMode: setStrictModeState,
    }),
    [strictMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
