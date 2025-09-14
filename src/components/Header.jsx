// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container p-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          UsersSearch
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/users" className="hover:underline">
            Results
          </Link>
        </nav>
      </div>
    </header>
  )
}
