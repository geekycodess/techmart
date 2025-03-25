import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const footerSections = [
    {
      title: 'About Us',
      links: [
        { label: 'Our Story', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Shipping Info', path: '/shipping' },
        { label: 'Returns', path: '/returns' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Connect With Us',
      links: [
        { label: 'Facebook', path: 'https://facebook.com' },
        { label: 'Twitter', path: 'https://twitter.com' },
        { label: 'Instagram', path: 'https://instagram.com' },
        { label: 'LinkedIn', path: 'https://linkedin.com' },
      ],
    },
    {
      title: 'Newsletter',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Subscribe to get special offers, free giveaways, and updates.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-black"
            />
            <motion.button
              className="w-full px-4 py-2 text-sm text-white bg-black hover:bg-gray-800 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      ),
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-sm font-medium text-black mb-4">
                {section.title}
              </h3>
              {section.content ? (
                section.content
              ) : (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 TechMart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 