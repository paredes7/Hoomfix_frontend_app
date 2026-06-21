export const Colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',

  secondary: '#F97316',
  secondaryDark: '#EA6C0A',

  background: '#0B1929',
  surface: '#FFFFFF',

  text: '#0F172A',
  textSoft: '#64748B',
  textDisabled: '#CBD5E1',

  border: '#E2E8F0',

  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
