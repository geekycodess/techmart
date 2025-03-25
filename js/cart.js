// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = []; // This will be populated from products.js

// DOM Elements
const cartItems = document.querySelector('.cart-items');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const creditCardForm = document.getElementById('credit-card-form');
const paymentOptions = document.querySelectorAll('input[name="payment"]');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupPaymentOptions();
    setupShippingOptions();
});

// Load Cart
function loadCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart to see them here!</p>
                <a href="/products" class="cta-button">Continue Shopping</a>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';

        return `
            <div class="cart-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <div class="item-price">$${product.price}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Calculate Subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Calculate Shipping
function calculateShipping() {
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    return shippingMethod === 'express' ? 12.99 : 5.99;
}

// Calculate Tax
function calculateTax(subtotal) {
    return subtotal * 0.1; // 10% tax rate
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Setup Payment Options
function setupPaymentOptions() {
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            creditCardForm.style.display = 
                e.target.value === 'credit-card' ? 'block' : 'none';
        });
    });
}

// Setup Shipping Options
function setupShippingOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateCartSummary);
    });
}

// Proceed to Checkout
async function proceedToCheckout() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;

    // Validate credit card form if credit card is selected
    if (paymentMethod === 'credit-card') {
        if (!validateCreditCardForm()) {
            return;
        }
    }

    try {
        // Create order object
        const order = {
            items: cart,
            paymentMethod,
            shippingMethod,
            subtotal: calculateSubtotal(),
            shipping: calculateShipping(),
            tax: calculateTax(calculateSubtotal()),
            total: calculateTotal(),
            timestamp: new Date().toISOString()
        };

        // Here you would typically send this to your backend
        console.log('Processing order:', order);

        // Simulate order processing
        await simulateOrderProcessing();

        // Clear cart and redirect to success page
        localStorage.removeItem('cart');
        window.location.href = 'order-success.html';
    } catch (error) {
        console.error('Error processing order:', error);
        showError('There was an error processing your order. Please try again.');
    }
}

// Validate Credit Card Form
function validateCreditCardForm() {
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('card-name').value;

    if (!cardNumber || !expiry || !cvv || !cardName) {
        showError('Please fill in all credit card details.');
        return false;
    }

    // Basic validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        showError('Please enter a valid 16-digit card number.');
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        showError('Please enter a valid 3-digit CVV.');
        return false;
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
        showError('Please enter a valid expiry date (MM/YY).');
        return false;
    }

    return true;
}

// Show Error Message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const cartSummary = document.querySelector('.cart-summary');
    cartSummary.insertBefore(errorDiv, cartSummary.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Simulate Order Processing
function simulateOrderProcessing() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

// Calculate Total
function calculateTotal() {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax(subtotal);
    return subtotal + shipping + tax;
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Export functions for use in other files
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout; 