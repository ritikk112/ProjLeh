import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/molecules/SearchBar'

export default function Home() {
  const navigate = useNavigate()

  function onSearch(query) {
    // Navigate to /users?q=<query>
    navigate(`/users?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Search Users</h1>
          <p className="text-sm text-slate-600 mt-2">
            Enter first name, last name, or SSN (min 3 characters)
          </p>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  )
}
