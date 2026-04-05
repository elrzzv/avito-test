import { BrowserRouter } from 'react-router';
import type { JSX, ReactNode } from 'react';

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps): JSX.Element {
  return <BrowserRouter>{children}</BrowserRouter>;
}