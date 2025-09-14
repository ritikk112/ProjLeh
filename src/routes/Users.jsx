import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchUsers } from '../services/api'
import { useSearchStore } from '../features/search/searchStore'
import UsersGrid from '../components/organisms/UsersGrid'
import SortFilterBar from '../components/molecules/SortFilterBar'

export default function Users() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  // Zustand store
  const {
    users,
    setResults,
    setLoading,
    setError,
    loading,
    error,
  } = useSearchStore()

  // UI state for client-side sorting/filtering
  const [sortOrder, setSortOrder] = useState('age_asc')
  // Note: SortFilterBar expects onFilterChange to be the state setter (it calls with updater)
  const [roleFilter, setRoleFilter] = useState([])

  // Fetch from API (or mock) when query changes and length >= 3
  useEffect(() => {
    let mounted = true

    async function doSearch() {
      if (!q || q.length < 3) {
        // clear results if query is too short
        if (mounted) setResults([], 0)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await searchUsers(q)
        if (!mounted) return
        // Expecting { users, total }
        setResults(data.users || [], data.total || 0)
      } catch (err) {
        if (!mounted) return
        setError(err?.message || 'Failed to fetch users')
        setResults([], 0)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    doSearch()

    return () => {
      mounted = false
    }
    // Intentionally only depend on q; store setters are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  // derive available roles from fetched users (for filter UI)
  const roles = useMemo(() => {
    const setRoles = new Set((users || []).map((u) => u.role).filter(Boolean))
    return Array.from(setRoles)
  }, [users])

  // Apply client-side filtering and sorting (no extra API calls)
  const displayed = useMemo(() => {
    let list = (users || []).slice()

    // filter by role (if any selected)
    if (roleFilter && roleFilter.length) {
      list = list.filter((u) => roleFilter.includes(u.role))
    }

    // sort by age
    if (sortOrder === 'age_asc') {
      list.sort((a, b) => (a.age ?? 0) - (b.age ?? 0))
    } else if (sortOrder === 'age_desc') {
      list.sort((a, b) => (b.age ?? 0) - (a.age ?? 0))
    }

    return list
  }, [users, sortOrder, roleFilter])

  return (
    <div>
      <div className="mb-4">
        <SortFilterBar
          roles={roles}
          currentSort={sortOrder}
          onSortChange={setSortOrder}
          onFilterChange={setRoleFilter} // pass setter so component can use updater form
        />
      </div>

      {loading && <div className="p-6">Loading results...</div>}
      {error && <div className="p-6 text-red-600">{error}</div>}

      {!loading && !error && <UsersGrid users={displayed} />}
    </div>
  )
}
