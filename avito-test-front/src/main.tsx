import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app/App'
import { RouterProvider } from './app/providers/router'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </HelmetProvider>
  </StrictMode>,
)