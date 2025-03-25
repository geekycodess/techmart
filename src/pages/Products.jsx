import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateProducts } from '../utils/productGenerator'
import ProductCard from '../components/sections/ProductCard'
import FilterButton from '../components/common/FilterButton'
import { XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { categories } from '../data/products'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(null)

  const productsPerPage = 12

  useEffect(() => {
    const generatedProducts = generateProducts(1000)
    setProducts(generatedProducts)
    setFilteredProducts(generatedProducts)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    )

    if (selectedRating) {
      filtered = filtered.filter((product) => Math.floor(product.rating) >= selectedRating)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, selectedCategory, priceRange, searchQuery, sortBy, selectedRating])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Products hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-light text-white mb-6">Our Products</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Discover our collection of thoughtfully designed tech products that blend
            performance with sustainability.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 text-sm bg-gray-50 border-none focus:ring-0 focus:outline-none"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-3 text-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 text-sm bg-gray-50 border-none focus:ring-0 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </div>

        {/* Active Filters */}
        {(selectedCategory !== 'all' ||
          priceRange.min > 0 ||
          priceRange.max < 1000 ||
          selectedRating) && (
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-gray-50">
            <span className="text-sm text-gray-500">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-white text-gray-600 hover:bg-gray-100"
              >
                {categories.find((c) => c.id === selectedCategory)?.name}
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            {(priceRange.min > 0 || priceRange.max < 1000) && (
              <button
                onClick={() => setPriceRange({ min: 0, max: 1000 })}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-white text-gray-600 hover:bg-gray-100"
              >
                ${priceRange.min} - ${priceRange.max}
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            {selectedRating && (
              <button
                onClick={() => setSelectedRating(null)}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-white text-gray-600 hover:bg-gray-100"
              >
                {selectedRating}+ Stars
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all')
                setPriceRange({ min: 0, max: 1000 })
                setSelectedRating(null)
              }}
              className="text-sm text-black hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:text-black disabled:text-gray-300"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 text-sm transition-colors duration-200 ${
                    currentPage === index + 1
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:text-black disabled:text-gray-300"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 text-center mt-8">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </p>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-medium">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Minimum ($)
                        </label>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange({ ...priceRange, min: Number(e.target.value) })
                          }
                          className="w-full px-4 py-2 text-sm bg-gray-50 border-none focus:ring-0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">
                          Maximum ($)
                        </label>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange({ ...priceRange, max: Number(e.target.value) })
                          }
                          className="w-full px-4 py-2 text-sm bg-gray-50 border-none focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(rating)}
                          className={`flex items-center w-full gap-2 p-2 text-sm ${
                            selectedRating === rating
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex text-yellow-400">
                            {[...Array(rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-gray-600">& Up</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => {
                      setPriceRange({ min: 0, max: 1000 })
                      setSelectedRating(null)
                      setIsFilterOpen(false)
                    }}
                    className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-4 py-2 text-sm text-white bg-black hover:bg-gray-900"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Products 