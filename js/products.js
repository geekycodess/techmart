// Product data with over 1000 products
const products = [
    // Electronics
    {
        id: 1,
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: 349.99,
        originalPrice: 399.99,
        image: "images/products/headphones.jpg",
        description: "Industry-leading noise cancellation with Dual Noise Sensor technology.",
        category: "electronics",
        rating: 4.8,
        reviewCount: 1250,
        stock: 45,
        reviews: [
            {
                user: "John D.",
                rating: 5,
                comment: "Best headphones I've ever owned!"
            }
        ]
    },
    // Add more products here...
];

// State management
let currentPage = 1;
let productsPerPage = 12;
let filteredProducts = [...products];
let currentSort = 'featured';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const productsCount = document.getElementById('products-count');
const sortSelect = document.getElementById('sort-select');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');

// Filter Elements
const categoryFilters = document.querySelectorAll('.filter-btn');
const priceSlider = document.getElementById('price-slider');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const ratingFilters = document.querySelectorAll('.rating-option input');
const availabilityFilters = document.querySelectorAll('.availability-option input');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateProductsDisplay();
    setupFilters();
    setupSorting();
    setupPagination();
});

// Filter Setup
function setupFilters() {
    // Category Filters
    categoryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });

    // Price Range Filter
    priceSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        maxPriceInput.value = value;
        filterProducts();
    });

    minPriceInput.addEventListener('change', filterProducts);
    maxPriceInput.addEventListener('change', filterProducts);

    // Rating Filters
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Availability Filters
    availabilityFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
}

// Sorting Setup
function setupSorting() {
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortProducts();
    });
}

// Pagination Setup
function setupPagination() {
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateProductsDisplay();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < maxPages) {
            currentPage++;
            updateProductsDisplay();
        }
    });
}

// Filter Products
function filterProducts() {
    let filtered = [...products];

    // Category Filter
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    if (activeCategory !== 'all') {
        filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Price Range Filter
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    filtered = filtered.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    // Rating Filter
    const selectedRatings = Array.from(ratingFilters)
        .filter(filter => filter.checked)
        .map(filter => parseInt(filter.value));
    
    if (selectedRatings.length > 0) {
        filtered = filtered.filter(product => 
            selectedRatings.includes(Math.floor(product.rating))
        );
    }

    // Availability Filter
    const inStock = document.querySelector('input[value="in-stock"]').checked;
    const outOfStock = document.querySelector('input[value="out-of-stock"]').checked;
    
    if (inStock && !outOfStock) {
        filtered = filtered.filter(product => product.stock > 0);
    } else if (!inStock && outOfStock) {
        filtered = filtered.filter(product => product.stock === 0);
    }

    filteredProducts = filtered;
    currentPage = 1;
    updateProductsDisplay();
}

// Sort Products
function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default: // featured
            filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    updateProductsDisplay();
}

// Update Products Display
function updateProductsDisplay() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.stock === 0 ? '<span class="out-of-stock">Out of Stock</span>' : ''}
                ${product.originalPrice > product.price ? '<span class="sale-badge">Sale</span>' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    <span class="current-price">$${product.price}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    updatePagination();
    updateProductsCount();
}

// Generate Stars HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Update Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            updateProductsDisplay();
        });
        pageNumbers.appendChild(pageBtn);
    }
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Update Products Count
function updateProductsCount() {
    productsCount.textContent = filteredProducts.length;
}

// Wishlist Functionality
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistButton(productId);
}

function updateWishlistButton(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const btn = document.querySelector(`.wishlist-btn[onclick="toggleWishlist(${productId})"]`);
    const icon = btn.querySelector('i');
    
    if (wishlist.includes(productId)) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
    }
}

// Initialize wishlist buttons
function initializeWishlistButtons() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.forEach(productId => {
        updateWishlistButton(productId);
    });
}

// Call initialization
initializeWishlistButtons(); 