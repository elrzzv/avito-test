import { type JSX } from 'react'
import { Routes, Route } from 'react-router'
import { PATHS } from './router'

import AdsPage from '../pages/ads/AdsPage'
import ProductPage from '../pages/product/ProductPage'
import EditPage from '../pages/edit/EditPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import '../app/styles.css'

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path={PATHS.Ads} element={<AdsPage />} />
      <Route path={`${PATHS.Ads}/:id`} element={<ProductPage />} />
      <Route path={`${PATHS.Ads}/:id/edit`} element={<EditPage />} />
      <Route path={PATHS.NotFound} element={<NotFoundPage />} />
    </Routes>
  )
}