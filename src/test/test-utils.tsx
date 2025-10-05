import { render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {ui}
    </ThemeProvider>
  );
}