import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/sections/ProductCard'
import FilterButton from '../components/common/FilterButton'
import { categories, featuredProducts } from '../data/products'

const Deals = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter out products that are on sale
  const deals = featuredProducts.filter(product => product.isOnSale || product.discount)

  const filteredDeals = deals.filter(deal => 
    activeFilter === 'all' || deal.category.toLowerCase() === activeFilter
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Special Deals</h1>
        <p className="text-gray-600">
          Discover amazing discounts on premium tech products
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={activeFilter === category.id}
            onClick={() => setActiveFilter(category.id)}
            variant="pill"
          >
            {category.name}
          </FilterButton>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative">
              <ProductCard product={deal} />
              {deal.discount && (
                <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-sm">
                  {deal.discount}% OFF
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No deals found in this category.</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="btn btn-primary"
          >
            View All Deals
          </button>
        </div>
      )}
    </div>
  )
}

export default Deals 