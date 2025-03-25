import { motion } from 'framer-motion'

const FilterButton = ({ active, children, onClick, variant = 'default' }) => {
  const styles = {
    default: `px-4 py-2 text-sm transition-all duration-200 ${
      active
        ? 'bg-black text-white'
        : 'bg-white text-gray-600 hover:bg-gray-50'
    } border border-gray-200`,
    pill: `px-6 py-2 rounded-full whitespace-nowrap ${
      active
        ? 'bg-black text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`,
  }

  return (
    <motion.button
      onClick={onClick}
      className={styles[variant]}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

export default FilterButton 