const categories = [
  'Electronics',
  'Smartphones',
  'Laptops',
  'Gaming',
  'Smart Home',
  'Accessories',
  'Audio',
  'Wearables',
  'Cameras',
  'Tablets'
];

const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'LG',
  'Dell',
  'HP',
  'Lenovo',
  'Asus',
  'Razer',
  'Google',
  'Microsoft',
  'Xiaomi',
  'OnePlus',
  'Huawei',
  'Nike',
  'Fitbit',
  'Bose',
  'JBL',
  'Canon',
  'Nikon'
];

const adjectives = [
  'Pro',
  'Ultra',
  'Max',
  'Elite',
  'Premium',
  'Advanced',
  'Smart',
  'Wireless',
  'Bluetooth',
  '4K',
  'HD',
  'Mini',
  'Plus',
  'X',
  'Air',
  'Edge',
  'Fold',
  'Flip',
  'Watch',
  'Pad'
];

const nouns = [
  'Phone',
  'Laptop',
  'Tablet',
  'Watch',
  'Earphones',
  'Headphones',
  'Speaker',
  'Camera',
  'Console',
  'Keyboard',
  'Mouse',
  'Monitor',
  'Printer',
  'Router',
  'Charger',
  'Case',
  'Stand',
  'Hub',
  'Dock',
  'Stick'
];

const materials = [
  'recycled aluminum',
  'sustainable bamboo',
  'recycled plastic',
  'organic cotton',
  'recycled steel',
  'biodegradable materials',
  'recycled glass',
  'sustainable wood',
  'recycled rubber',
  'eco-friendly polymers'
];

const sustainabilityFeatures = [
  'Energy Star certified',
  'Eco-friendly packaging',
  'Recyclable materials',
  'Low power consumption',
  'Sustainable manufacturing',
  'Carbon neutral',
  'Zero waste design',
  'Biodegradable components',
  'Recycled content',
  'Energy efficient'
];

const imageCDNs = [
  'https://source.unsplash.com/400x400/?electronics,minimal',
  'https://source.unsplash.com/400x400/?gadgets,white',
  'https://source.unsplash.com/400x400/?technology,clean',
  'https://source.unsplash.com/400x400/?devices,modern',
  'https://source.unsplash.com/400x400/?electronics,design'
];

const generateRandomPrice = (basePrice) => {
  const randomFactor = 0.8 + Math.random() * 0.4;
  return Math.round(basePrice * randomFactor);
};

const generateRandomRating = () => {
  return (3 + Math.random() * 2).toFixed(1);
};

const generateRandomReviews = () => {
  return Math.floor(Math.random() * 1000) + 50;
};

const generateRandomStock = () => {
  const stock = Math.floor(Math.random() * 100);
  return {
    quantity: stock,
    status: stock > 20 ? 'In Stock' : stock > 0 ? 'Limited Stock' : 'Out of Stock'
  };
};

const generateProduct = (id) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];
  const sustainabilityFeature = sustainabilityFeatures[Math.floor(Math.random() * sustainabilityFeatures.length)];
  const imageUrl = imageCDNs[Math.floor(Math.random() * imageCDNs.length)];
  const basePrice = Math.floor(Math.random() * 900) + 100;
  const price = generateRandomPrice(basePrice);
  const originalPrice = Math.random() > 0.5 ? generateRandomPrice(basePrice * 1.2) : null;
  const rating = generateRandomRating();
  const reviews = generateRandomReviews();
  const stock = generateRandomStock();
  const isNew = Math.random() > 0.7;
  const isSale = Math.random() > 0.7;

  return {
    id,
    name: `${brand} ${adjective} ${noun}`,
    category,
    brand,
    description: `Experience sustainable technology with the ${brand} ${adjective} ${noun}. Made with ${material}, this ${category.toLowerCase()} features ${sustainabilityFeature.toLowerCase()}.`,
    price,
    originalPrice,
    rating,
    reviews,
    stock: stock.quantity,
    stockStatus: stock.status,
    image: imageUrl,
    isNew,
    isSale,
    features: [
      sustainabilityFeature,
      'Premium Quality',
      'Latest Technology',
      'Energy Efficient',
      'User Friendly',
      'Durable Design'
    ],
    specifications: {
      'Brand': brand,
      'Model': `${adjective} ${noun}`,
      'Category': category,
      'Material': material,
      'Sustainability': sustainabilityFeature,
      'Warranty': '2 Years',
      'Color': 'Various'
    }
  };
};

export const generateProducts = (count = 1000) => {
  return Array.from({ length: count }, (_, index) => generateProduct(index + 1));
}; 