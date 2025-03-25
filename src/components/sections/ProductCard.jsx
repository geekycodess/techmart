import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cartSlice'
import { toast } from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast.success('Added to cart', {
      style: {
        background: '#000',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '14px',
      },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative flex flex-col"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {product.isOnSale && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1">
            Sale
          </div>
        )}
        {product.stockCount <= 5 && product.stockCount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1">
            Only {product.stockCount} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        <h3 className="text-base font-medium text-black mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-medium text-black">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!product.inStock}
            className={`w-full py-2.5 text-sm font-medium transition-colors duration-200 ${
              product.inStock
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard 