import type { JSX } from 'react'
import { Routes, Route } from 'react-router'
import { Paths } from './const'

import AdsPage from './pages/ads/AdsPage'
import ProductPage from './pages/product/ProductPage'
import EditPage from './pages/edit/EditPage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import './App.css'

export default function App(): JSX.Element {
  return(
    <Routes>
      <Route path={Paths.Ad} element={<AdsPage />} />
      <Route path={Paths.Product} element={<ProductPage />} />
      <Route path={Paths.Edit} element={<EditPage />} />
      <Route path={Paths.NotFound} element={<NotFoundPage />} />
    </Routes>
  )
}
