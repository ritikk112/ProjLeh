// src/components/molecules/SortFilterBar.jsx
import React from 'react'

export default function SortFilterBar({
  roles = [],
  currentSort,
  onSortChange,
  onFilterChange,
}) {
  function toggleRole(role) {
    onFilterChange((prev) => {
      if (!Array.isArray(prev)) prev = []
      if (prev.includes(role)) return prev.filter((r) => r !== role)
      return [...prev, role]
    })
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
      {/* Sorting */}
      <div className="flex items-center gap-3">
        <label className="text-sm mr-2">Sort by:</label>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="age_asc">Age: Low → High</option>
          <option value="age_desc">Age: High → Low</option>
        </select>
      </div>

      {/* Filtering */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-sm">Filter by role:</div>
        {roles.length === 0 && (
          <div className="text-xs text-slate-500">No roles available</div>
        )}
        {roles.map((role) => (
          <label key={role} className="flex items-center gap-2 text-sm">
            <input type="checkbox" onChange={() => toggleRole(role)} />
            <span className="capitalize">{role}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
