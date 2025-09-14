// src/components/organisms/UsersGrid.jsx
import React from 'react'

export default function UsersGrid({ users, cols = 2 }) {
  if (!users) return null
  if (!Array.isArray(users)) {
    return <div className="p-6 text-red-600">Invalid user data format</div>
  }
  if (users.length === 0) {
    return <div className="p-6 text-slate-600">No users found</div>
  }

  // clamp cols to sensible range
  const c = Math.min(Math.max(Number(cols) || 1, 1), 6)

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))`,
  }

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNFMkU4RjAiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOTQ5NEE0Ij4KPHA+VXNlcjwvcD4KPHN2Zz4='
  }

  const validateUser = (user) => {
    return user && typeof user === 'object' && user.id
  }

  return (
    <div style={gridStyle}>
      {users.filter(validateUser).map((u) => (
        <article
          key={u.id}
          className="card-tg bg-white rounded-2xl border border-slate-100 shadow-lg p-4 flex flex-col gap-3
                     transform transition hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Header: Avatar + Name */}
          <div className="flex items-center gap-4">
            <img
              src={u.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNFMkU4RjAiLz4KPHRleHQgeD0iMzIiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTQ5NEE0Ij5Vc2VyPC90ZXh0Pgo8L3N2Zz4='}
              alt={`${u.firstName || 'Unknown'} ${u.lastName || 'User'}`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-50"
              loading="lazy"
              onError={handleImageError}
            />
            <div>
              <div className="font-semibold text-base">
                {u.firstName || 'Unknown'} {u.lastName || 'User'}
              </div>
              <div className="text-xs text-slate-500">
                {u.company?.title || 'N/A'} • {u.company?.department || 'N/A'}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="text-sm text-slate-700 space-y-1">
            <div>
              <span className="font-medium">Age:</span> {u.age || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Role:</span>{' '}
              <span className="capitalize">{u.role || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium">Email:</span>{' '}
              {u.email ? (
                <a
                  className="text-blue-600 underline-offset-2 hover:underline text-sm"
                  href={`mailto:${u.email}`}
                >
                  {u.email}
                </a>
              ) : (
                <span className="text-slate-400">N/A</span>
              )}
            </div>
            <div>
              <span className="font-medium">Location:</span>{' '}
              {u.address?.city || 'Unknown'}, {u.address?.country || 'Unknown'}
            </div>
            <div>
              <span className="font-medium">SSN:</span> {maskSSN(u.ssn)}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function maskSSN(ssn) {
  if (!ssn) return ''
  const parts = ssn.replace(/[^0-9]/g, '')
  const last4 = parts.slice(-4)
  return `***-**-${last4}`
}
