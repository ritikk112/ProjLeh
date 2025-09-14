// src/services/api.js
import axios from 'axios'
import mockData from '../mocks/users.json'

/**
 * API client + fallback logic
 *
 * Behavior:
 * - If VITE_API_URL is set, try the backend first.
 * - If the backend request fails (network error or non-2xx), fall back to mockSearch.
 * - If VITE_API_URL is empty, use mockSearch immediately.
 *
 * Returns: { users: Array, total: Number }
 */

const BASE = import.meta.env.VITE_API_URL || '' // empty string => use mock
const api = BASE ? axios.create({ baseURL: BASE, timeout: 8000 }) : null

// Basic client-side mock search which mimics a free-text backend search
function normalize(q) {
  return (q || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function mockSearch(q, { limit = 50 } = {}) {
  const needle = normalize(q)
  const all = Array.isArray(mockData.users) ? mockData.users : []
  const users = all.filter((u) => {
    if (!u) return false
    const first = (u.firstName || '').toString().toLowerCase()
    const last = (u.lastName || '').toString().toLowerCase()
    const ssnCompact = (u.ssn || '').toString().replace(/[^0-9]/g, '')
    // match partial: check if normalized query is substring of first, last, or ssn
    return (
      (first && first.includes(needle)) ||
      (last && last.includes(needle)) ||
      (ssnCompact && ssnCompact.includes(needle))
    )
  }).slice(0, limit)

  // Simulate latency like a real network
  await new Promise((r) => setTimeout(r, 200))
  return { users, total: users.length }
}

/**
 * loadUsers - POST request to load users into memory
 * @returns {Promise<void>}
 */
export async function loadUsers() {
  if (!api) {
    console.log('[api] No backend configured, skipping load request')
    return
  }

  try {
    await api.post('/api/v1/users/load', {})
    console.log('[api] Users loaded into memory successfully')
  } catch (err) {
    console.error('[api] Failed to load users into memory:', err?.message || err)
    throw err
  }
}

/**
 * searchUsers - primary entry
 * @param {string} q - query string (min 3 chars recommended)
 * @param {object} opts - { limit: number }
 * @returns {Promise<{users: Array, total: number}>}
 */
export async function searchUsers(q, opts = {}) {
  const limit = opts.limit ?? 50

  if (!q || String(q).trim().length < 1) {
    return { users: [], total: 0 }
  }

  // If no backend configured, use mock immediately
  if (!api) {
    return mockSearch(q, { limit })
  }

  // Try backend first
  try {
    // Adjust endpoint path if your backend differs
    const res = await api.get('/api/v1/users/search', { params: { q, limit } })

    // If backend returns expected shape, return it
    if (res && res.data) {
      // normalize to { users, total }
      const users = Array.isArray(res.data.users) ? res.data.users : []
      const total =
        typeof res.data.total === 'number' ? res.data.total : users.length
      return { users, total }
    }

    // Unexpected shape -> fallback to mock
    console.warn(
      '[api] Unexpected response shape from backend, falling back to mock'
    )
    return await mockSearch(q, { limit })
  } catch (err) {
    // Network or server error -> fallback to mock
    console.warn(
      `[api] Backend search failed (${err?.message || err}). Falling back to mock data.`
    )
    try {
      return await mockSearch(q, { limit })
    } catch (mockErr) {
      // If even mock fails (unlikely), throw the original error
      console.error('[api] Mock search failed', mockErr)
      throw err
    }
  }
}

// default export for convenience if needed
export default {
  searchUsers,
  loadUsers,
}
