export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'smart-home', name: 'Smart Home' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'laptops', name: 'Laptops' },
  { id: 'smartphones', name: 'Smartphones' },
  { id: 'tablets', name: 'Tablets' },
  { id: 'audio', name: 'Audio' },
  { id: 'cameras', name: 'Cameras' },
]

export const featuredProducts = [
  {
    id: 1,
    name: 'Sony WH-1000XM4',
    price: 279.99,
    originalPrice: 349.99,
    description: 'Industry-leading noise cancellation with exceptional sound quality and 30-hour battery life. Features include touch controls, voice assistant support, and automatic pausing when you remove the headphones.',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60',
    rating: 4.8,
    reviews: 128,
    stock: 15,
    isOnSale: true,
  },
  {
    id: 2,
    name: 'Apple Watch Series 8',
    price: 399.99,
    description: 'Advanced health monitoring with ECG, blood oxygen tracking, and temperature sensing. Features a stunning Retina display, GPS, cellular connectivity, and up to 18 hours of battery life.',
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60',
    rating: 4.6,
    reviews: 256,
    stock: 8,
    isOnSale: false,
  },
  {
    id: 3,
    name: 'Nest Learning Thermostat',
    price: 249.99,
    description: 'AI-powered temperature control that learns your preferences and saves energy. Features remote control, energy history, and integration with other smart home devices.',
    category: 'smart-home',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60',
    rating: 4.7,
    reviews: 89,
    stock: 3,
    isOnSale: false,
  },
  {
    id: 4,
    name: 'Ring Video Doorbell Pro',
    price: 169.99,
    description: '1080p HD video doorbell with two-way talk, advanced motion detection, and mobile alerts. Features include night vision, customizable motion zones, and cloud storage.',
    category: 'smart-home',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60',
    rating: 4.5,
    reviews: 167,
    stock: 12,
    isOnSale: false,
  },
  {
    id: 5,
    name: 'PlayStation 5 Digital Edition',
    price: 499.99,
    description: 'Next-gen gaming console with ray tracing, 4K graphics, and ultra-high speed SSD. Features include 3D audio, haptic feedback, and backward compatibility with PS4 games.',
    category: 'gaming',
    image: 'https://images.unsplash.com/photo-1606813907291-d86a9b56b911?w=800&auto=format&fit=crop&q=60',
    rating: 4.9,
    reviews: 342,
    stock: 5,
    isOnSale: false,
  },
  {
    id: 6,
    name: 'Razer BlackWidow V3 Pro',
    price: 179.99,
    originalPrice: 199.99,
    description: 'Wireless mechanical gaming keyboard with RGB lighting and premium switches. Features include multi-device connectivity, customizable macros, and a comfortable wrist rest.',
    category: 'gaming',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
    rating: 4.4,
    reviews: 78,
    stock: 20,
    isOnSale: true,
  },
  {
    id: 7,
    name: 'MacBook Pro 14"',
    price: 1999.99,
    description: 'Powerful laptop with M2 Pro chip, 14-inch Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals and content creators.',
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    rating: 4.8,
    reviews: 156,
    stock: 10,
    isOnSale: false,
  },
  {
    id: 8,
    name: 'iPhone 15 Pro',
    price: 999.99,
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features include USB-C, Action button, and improved battery life.',
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60',
    rating: 4.7,
    reviews: 289,
    stock: 15,
    isOnSale: false,
  },
  {
    id: 9,
    name: 'Sony A7 IV',
    price: 2499.99,
    description: 'Professional mirrorless camera with 33MP sensor, 4K 60p video, and advanced autofocus. Perfect for both photography and videography.',
    category: 'cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    rating: 4.9,
    reviews: 134,
    stock: 7,
    isOnSale: false,
  },
  {
    id: 10,
    name: 'iPad Pro 12.9"',
    price: 1099.99,
    description: 'Powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support. Features include Face ID, Thunderbolt port, and Magic Keyboard compatibility.',
    category: 'tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    rating: 4.6,
    reviews: 198,
    stock: 12,
    isOnSale: false,
  },
]

export const featuredCategories = [
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'High-performance laptops for work and gaming',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Latest smartphones with advanced features',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential accessories for your devices',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
  },
]

// Utility function to generate random products
export const generateProducts = (count) => {
  const products = []
  const categories = ['electronics', 'smart-home', 'gaming', 'accessories', 'laptops', 'smartphones', 'tablets', 'audio', 'cameras']
  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus', 'Razer', 'Google']
  const adjectives = ['Premium', 'Pro', 'Ultra', 'Elite', 'Max', 'Plus', 'Advanced', 'Smart', 'Wireless', 'Portable']
  const nouns = ['Phone', 'Laptop', 'Tablet', 'Watch', 'Headphones', 'Camera', 'Console', 'Keyboard', 'Mouse', 'Monitor']

  for (let i = 1; i <= count; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const basePrice = Math.floor(Math.random() * 1000) + 100
    const isOnSale = Math.random() > 0.7
    const originalPrice = isOnSale ? basePrice * 1.2 : null
    const stock = Math.floor(Math.random() * 20) + 1
    const rating = (Math.random() * 0.5 + 4).toFixed(1)
    const reviews = Math.floor(Math.random() * 500) + 50

    products.push({
      id: i,
      name: `${brand} ${adjective} ${noun}`,
      price: isOnSale ? basePrice : basePrice,
      originalPrice: originalPrice,
      description: `High-quality ${category} device with premium features and excellent performance. Perfect for both personal and professional use.`,
      category: category,
      image: `https://source.unsplash.com/800x600/?${category},${brand.toLowerCase()}`,
      rating: parseFloat(rating),
      reviews: reviews,
      stock: stock,
      isOnSale: isOnSale,
    })
  }

  return products
} 