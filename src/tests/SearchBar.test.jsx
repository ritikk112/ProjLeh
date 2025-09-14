// src/tests/SearchBar.test.jsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/molecules/SearchBar'

describe('SearchBar', () => {
  it('calls onSearch on Enter when value length >= 3', () => {
    const onSearch = vi.fn()
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearch} />)
    const input = getByPlaceholderText(/Search users/i)

    // type 3 characters and press Enter
    fireEvent.change(input, { target: { value: 'Emi' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(onSearch).toHaveBeenCalledWith('Emi')
  })

  it('does not call onSearch for < 3 characters on Enter', () => {
    const onSearch = vi.fn()
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearch} />)
    const input = getByPlaceholderText(/Search users/i)

    fireEvent.change(input, { target: { value: 'Em' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(onSearch).not.toHaveBeenCalled()
  })

  it('calls onSearch when search button clicked and value >= 3 chars', () => {
    const onSearch = vi.fn()
    const { getByPlaceholderText, getByRole } = render(
      <SearchBar onSearch={onSearch} />
    )
    const input = getByPlaceholderText(/Search users/i)
    fireEvent.change(input, { target: { value: 'Soph' } })

    // the button has aria-label="Search"
    const btn = getByRole('button', { name: /search/i })
    fireEvent.click(btn)

    expect(onSearch).toHaveBeenCalledWith('Soph')
  })
})
