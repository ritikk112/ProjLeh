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
      <div className="flex items-center shadow-lg rounded-full p-2 bg-white">
        <input
          aria-label="Search users"
          className="flex-1 px-4 py-3 rounded-l-full outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search users by first name, last name, or SSN"
        />
        <button
          aria-label="Search"
          className="p-3 rounded-full hover:bg-slate-100"
          onClick={() => {
            if (value.trim().length >= 3) onSearch(value.trim())
          }}
        >
          🔍
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">
        Enter at least 3 characters then press Enter or click search
      </p>
    </div>
  )
}
