import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/molecules/SearchBar'
import { loadUsers } from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  function onSearch(query) {
    // Navigate to /users?q=<query>
    navigate(`/users?q=${encodeURIComponent(query)}`)
  }

  async function handleLoadUsers() {
    setLoading(true)
    try {
      await loadUsers()
      setShowPopup(true)
      // Auto-close popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to load users:', error)
      // You can add error handling here if needed
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center relative">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Search Users</h1>
          <p className="text-sm text-slate-600 mt-2">
            Enter first name, last name, or SSN (min 3 characters)
          </p>
        </div>
        <SearchBar onSearch={onSearch} />
        <div className="text-center mt-6">
          <button
            onClick={handleLoadUsers}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Load Data'}
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-1000 absolute inset-0"></div>
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg z-10 max-w-sm mx-4">
            <div className="text-center">
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium">Data loaded into the main memory</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
