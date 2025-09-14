// src/components/organisms/UsersGrid.jsx
import React from 'react'

export default function UsersGrid({ users }) {
  if (!users) return null
  if (users.length === 0) {
    return <div className="p-6 text-slate-600">No users found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((u) => (
        <article
          key={u.id}
          className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
        >
          {/* Header: Avatar + Name */}
          <div className="flex items-center gap-3">
            <img
              src={u.image}
              alt={`${u.firstName} ${u.lastName}`}
              className="w-14 h-14 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <div className="font-semibold">
                {u.firstName} {u.lastName}
              </div>
              <div className="text-xs text-slate-500">
                {u.company?.title} • {u.company?.department}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="text-sm text-slate-700">
            <div>Age: {u.age}</div>
            <div>Role: {u.role}</div>
            <div>
              Email:{' '}
              <a className="text-blue-600" href={`mailto:${u.email}`}>
                {u.email}
              </a>
            </div>
            <div>
              Location: {u.address?.city}, {u.address?.country}
            </div>
            <div>SSN: {maskSSN(u.ssn)}</div>
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
