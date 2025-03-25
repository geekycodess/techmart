import { createSlice } from '@reduxjs/toolkit'
import { generateProducts } from '../../utils/productGenerator'

const initialState = {
  items: generateProducts(1000),
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  },
  sortBy: 'featured',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload
      state.filters[key] = value
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { setLoading, setError, setFilter, setSortBy, clearFilters } = productsSlice.actions

export const selectFilteredProducts = (state) => {
  const { items, filters, sortBy } = state.products

  let filtered = [...items]

  // Apply filters
  if (filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category)
  }

  filtered = filtered.filter(product => 
    product.price >= filters.priceRange[0] && 
    product.price <= filters.priceRange[1]
  )

  if (filters.rating > 0) {
    filtered = filtered.filter(product => product.rating >= filters.rating)
  }

  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock)
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    default:
      // Featured sorting (default)
      filtered.sort((a, b) => {
        if (a.isOnSale && !b.isOnSale) return -1
        if (!a.isOnSale && b.isOnSale) return 1
        return b.rating - a.rating
      })
  }

  return filtered
}

export default productsSlice.reducer 