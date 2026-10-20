import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import GaleriaPage from './pages/GaleriaPage.jsx'
import ZdjeciePage from './pages/ZdjeciePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<GaleriaPage />} />
        <Route path="zdjecie/:id" element={<ZdjeciePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
