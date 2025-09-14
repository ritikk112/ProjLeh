import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Header from './components/Header'
import PageShell from './components/PageShell'

// Lazy load Users route for better performance
const Users = React.lazy(() => import('./routes/Users'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container">
        <PageShell>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Suspense>
        </PageShell>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} UsersSearch
      </footer>
    </div>
  )
}
