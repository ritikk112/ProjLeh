// src/components/molecules/SearchBar.jsx
import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim().length >= 3) {
      onSearch(value.trim())
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Google-like centered search bar */}
      <div className="flex justify-center">
        <div
          className="w-full bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-150
                     px-3 py-2 flex items-center gap-3"
          role="search"
          aria-label="Global search"
        >
          {/* Search icon (left) */}
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200
                       transition-colors duration-150 cursor-pointer"
            onClick={() => {
              if (value.trim().length >= 3) onSearch(value.trim())
            }}
            title="Search"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          {/* Input */}
          <input
            aria-label="Search users"
            className="flex-1 h-10 text-sm md:text-base outline-none px-3 bg-transparent
                       placeholder:text-slate-400 focus-visible:ring-0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search users by first name, last name, or SSN"
          />

          {/* Rounded search button (right) */}
          <button
            aria-label="Search"
            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200
                       transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
            onClick={() => {
              if (value.trim().length >= 3) onSearch(value.trim())
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        Enter at least 3 characters then press Enter or click search
      </p>
    </div>
  )
}
