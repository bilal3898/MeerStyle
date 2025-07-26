// client/src/context/types/ThemeTypes.ts

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextType = {
  theme: Theme;
  systemTheme: Exclude<Theme, 'system'>;
  resolvedTheme: Exclude<Theme, 'system'>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};