// src/utils/sorters.js
// Reusable sorter functions for users

export function sortByAgeAsc(a, b) {
  const aa = typeof a.age === 'number' ? a.age : 0
  const bb = typeof b.age === 'number' ? b.age : 0
  return aa - bb
}

export function sortByAgeDesc(a, b) {
  const aa = typeof a.age === 'number' ? a.age : 0
  const bb = typeof b.age === 'number' ? b.age : 0
  return bb - aa
}
