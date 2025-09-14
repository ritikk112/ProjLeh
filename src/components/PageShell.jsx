// src/components/PageShell.jsx
import React from 'react'

export default function PageShell({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-6">
      {children}
    </div>
  )
}
