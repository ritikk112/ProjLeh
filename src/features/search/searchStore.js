// src/features/search/searchStore.js
import create from 'zustand'
import { searchUsers } from '../../services/api'

/**
 * searchStore (Zustand)
 *
 * State:
 *  - query: current search query
 *  - users: fetched user array
 *  - total: total count from backend (or mock)
 *  - loading: boolean
 *  - error: string | null
 *
 * Actions:
 *  - setQuery(q)
 *  - setResults(users, total)
 *  - setLoading(flag)
 *  - setError(err)
 *  - clear()
 *  - performSearch(q, opts)  <-- performs async search and updates store safely
 *
 * Notes:
 *  - performSearch uses an incremental requestId to ignore stale responses.
 *  - callers should ensure queries are >=3 chars before calling (store also tolerates).
 */

export const useSearchStore = create((set, get) => {
  // local request counter (closure-scoped)
  let requestCounter = 0

  return {
    query: '',
    users: [],
    total: 0,
    loading: false,
    error: null,

    // simple setters
    setQuery: (q) => set({ query: q }),
    setResults: (users, total) => set({ users, total }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // clear store
    clear: () =>
      set({
        query: '',
        users: [],
        total: 0,
        loading: false,
        error: null,
      }),

    /**
     * performSearch
     * @param {string} q - query string
     * @param {object} opts - optional { limit }
     */
    performSearch: async (q, opts = {}) => {
      const trimmed = (q || '').toString().trim()
      // update stored query
      set({ query: trimmed })

      // always require non-empty query; callers can guard for length >=3
      if (!trimmed) {
        set({ users: [], total: 0, loading: false, error: null })
        return { users: [], total: 0 }
      }

      const thisRequestId = ++requestCounter
      set({ loading: true, error: null })

      try {
        const res = await searchUsers(trimmed, opts)
        // ignore if a newer request was started after this one
        if (thisRequestId !== requestCounter) {
          // stale response; do nothing
          return { users: [], total: 0, stale: true }
        }

        const users = Array.isArray(res.users) ? res.users : []
        const total = typeof res.total === 'number' ? res.total : users.length

        set({ users, total, loading: false, error: null })
        return { users, total }
      } catch (err) {
        if (thisRequestId !== requestCounter) {
          return { users: [], total: 0, stale: true }
        }
        const msg =
          err && err.message ? err.message : 'Failed to perform search'
        set({ loading: false, error: msg })
        return { users: [], total: 0, error: msg }
      }
    },
  }
})

export default useSearchStore
