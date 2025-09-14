import React from 'react'

export default function SortFilterBar({
  roles = [],
  currentSort,
  onSortChange,
  onFilterChange,
  gridCols = 2,
  onGridColsChange = () => {},
}) {
  function toggleRole(role) {
    onFilterChange((prev) => {
      if (!Array.isArray(prev)) prev = []
      if (prev.includes(role)) return prev.filter((r) => r !== role)
      return [...prev, role]
    })
  }

  // small helper labels for select
  const gridOptions = [
    { value: 1, label: '1 column' },
    { value: 2, label: '2 columns (2×2)' },
    { value: 3, label: '3 columns' },
    { value: 4, label: '4 columns' },
  ]

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
      {/* Left: Sorting and Grid dimension */}
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

        {/* Grid dimension control */}
        <div className="ml-3 flex items-center gap-2">
          <label className="text-sm mr-1">Grid:</label>
          <select
            value={gridCols}
            onChange={(e) => onGridColsChange(Number(e.target.value))}
            className="px-2 py-1 border rounded text-sm"
            aria-label="Grid columns"
          >
            {gridOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Filtering */}
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
