import { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Resumes from './pages/Resumes'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Suspense>
        <main style={{ width: '100%' }}>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/resumes/*" element={
              <ProtectedRoute>
                <Resumes />
              </ProtectedRoute>
            } />
            <Route index element={<Home />} />
          </Routes>
        </main>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
