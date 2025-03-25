// Account State
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const userProfile = document.getElementById('user-profile');
const profileNavBtns = document.querySelectorAll('.profile-nav-btn');
const profileTabs = document.querySelectorAll('.profile-tab');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    setupProfileNavigation();
});

// Check Authentication Status
function checkAuthStatus() {
    if (currentUser) {
        showUserProfile();
    } else {
        showLoginForm();
    }
}

// Toggle Forms
function toggleForms() {
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    try {
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll simulate a successful login
        const user = {
            id: 1,
            name: 'John Doe',
            email: email,
            avatar: 'https://via.placeholder.com/150'
        };

        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }

        showUserProfile();
        showSuccessMessage('Successfully logged in!');
    } catch (error) {
        showErrorMessage('Invalid email or password');
    }
}

// Handle Register
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll simulate a successful registration
        const user = {
            id: 1,
            name: name,
            email: email,
            avatar: 'https://via.placeholder.com/150'
        };

        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showUserProfile();
        showSuccessMessage('Account created successfully!');
    } catch (error) {
        showErrorMessage('Error creating account');
    }
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginForm();
    showSuccessMessage('Successfully logged out!');
}

// Show User Profile
function showUserProfile() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    userProfile.style.display = 'block';

    // Update profile information
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-picture').src = currentUser.avatar;

    // Load user data
    loadOrders();
    loadWishlist();
    loadAddresses();
}

// Show Login Form
function showLoginForm() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    userProfile.style.display = 'none';

    // Pre-fill email if remembered
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
}

// Setup Profile Navigation
function setupProfileNavigation() {
    profileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update active states
            profileNavBtns.forEach(b => b.classList.remove('active'));
            profileTabs.forEach(t => t.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });
}

// Load Orders
function loadOrders() {
    const ordersList = document.querySelector('.orders-list');
    // Here you would typically fetch orders from your backend
    const orders = [
        {
            id: 1,
            date: '2024-03-15',
            total: 299.99,
            status: 'Delivered',
            items: [
                {
                    name: 'Sony WH-1000XM4',
                    quantity: 1,
                    price: 299.99
                }
            ]
        }
    ];

    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h4>Order #${order.id}</h4>
                    <p>${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name}</span>
                        <span>${item.quantity}x</span>
                        <span>$${item.price}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <span>Total: $${order.total}</span>
                <button class="view-order-btn" onclick="viewOrder(${order.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Load Wishlist
function loadWishlist() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.length === 0) {
        wishlistGrid.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
                <a href="/products" class="cta-button">Browse Products</a>
            </div>
        `;
        return;
    }

    // Here you would typically fetch product details from your backend
    const products = [
        {
            id: 1,
            name: 'Sony WH-1000XM4',
            price: 299.99,
            image: 'images/products/headphones.jpg'
        }
    ];

    wishlistGrid.innerHTML = products.map(product => `
        <div class="wishlist-item">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Load Addresses
function loadAddresses() {
    const addressesList = document.querySelector('.addresses-list');
    // Here you would typically fetch addresses from your backend
    const addresses = [
        {
            id: 1,
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            isDefault: true
        }
    ];

    addressesList.innerHTML = addresses.map(address => `
        <div class="address-card">
            <div class="address-header">
                <h4>${address.name}</h4>
                ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <p>${address.street}</p>
            <p>${address.city}, ${address.state} ${address.zip}</p>
            <div class="address-actions">
                <button onclick="editAddress(${address.id})">Edit</button>
                <button onclick="deleteAddress(${address.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle Settings Update
async function handleSettingsUpdate(event) {
    event.preventDefault();
    
    const name = document.getElementById('update-name').value;
    const email = document.getElementById('update-email').value;
    const password = document.getElementById('update-password').value;
    const confirmPassword = document.getElementById('update-confirm-password').value;

    if (password && password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        currentUser.name = name;
        currentUser.email = email;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showSuccessMessage('Profile updated successfully!');
    } catch (error) {
        showErrorMessage('Error updating profile');
    }
}

// Show Address Form
function showAddressForm() {
    // Implement address form modal
    console.log('Show address form');
}

// View Order Details
function viewOrder(orderId) {
    // Implement order details view
    console.log('View order:', orderId);
}

// Edit Address
function editAddress(addressId) {
    // Implement address editing
    console.log('Edit address:', addressId);
}

// Delete Address
function deleteAddress(addressId) {
    // Implement address deletion
    console.log('Delete address:', addressId);
}

// Show Success Message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Show Error Message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Google OAuth Integration
function initGoogleAuth() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID'
        }).then(function(auth2) {
            auth2.signIn().then(function(googleUser) {
                const profile = googleUser.getBasicProfile();
                
                // Create or update user with Google profile
                const user = {
                    id: profile.getId(),
                    name: profile.getName(),
                    email: profile.getEmail(),
                    avatar: profile.getImageUrl()
                };

                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                showUserProfile();
                showSuccessMessage('Successfully logged in with Google!');
            });
        });
    });
}

// Export functions for use in other files
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;
window.toggleForms = toggleForms;
window.initGoogleAuth = initGoogleAuth;
window.showAddressForm = showAddressForm;
window.viewOrder = viewOrder;
window.editAddress = editAddress;
window.deleteAddress = deleteAddress; 