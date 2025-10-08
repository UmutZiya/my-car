// Payment page functionality
let currentStep = 1;
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayCartItems();
    updateOrderSummary();
});

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// Display cart items in step 1
function displayCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart before proceeding to checkout.</p>
                <a href="all-products.html" class="btn-shop">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                   onchange="setQuantity(${index}, this.value)">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div class="cart-item-price">${itemTotal.toFixed(2)} €</div>
                            <button class="remove-item" onclick="removeItem(${index})" title="Remove item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsList.innerHTML = cartHTML;
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        displayCartItems();
        updateOrderSummary();
    }
}

// Set specific quantity
function setQuantity(index, quantity) {
    const qty = parseInt(quantity);
    if (cart[index] && qty > 0) {
        cart[index].quantity = qty;
        saveCart();
        displayCartItems();
        updateOrderSummary();
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
    updateOrderSummary();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal; // Free shipping
    
    // Update all summary sections
    const subtotalElements = ['subtotal', 'subtotal2', 'subtotal3'];
    const totalElements = ['total', 'total2', 'total3'];
    
    subtotalElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = `${subtotal.toFixed(2)} €`;
    });
    
    totalElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = `${total.toFixed(2)} €`;
    });
}

// Navigate to next step
function nextStep() {
    if (currentStep === 1) {
        // Validate cart is not empty
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding.');
            return;
        }
    } else if (currentStep === 2) {
        // Validate billing form
        const form = document.getElementById('billingForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    }
    
    if (currentStep < 3) {
        // Hide current step
        document.getElementById(`step${currentStep}`).style.display = 'none';
        
        // Update progress
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('completed');
        
        currentStep++;
        
        // Show next step
        document.getElementById(`step${currentStep}`).style.display = 'block';
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        
        // Update order summary for new step
        updateOrderSummary();
    }
}

// Navigate to previous step
function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).style.display = 'none';
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        
        currentStep--;
        
        // Show previous step
        document.getElementById(`step${currentStep}`).style.display = 'block';
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('completed');
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    }
}

// Complete order
function completeOrder() {
    // Validate payment form
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'creditCard') {
        const creditCardForm = document.getElementById('creditCardForm');
        const inputs = creditCardForm.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.focus();
                return;
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required payment fields.');
            return;
        }
    }
    
    // Simulate order processing
    const orderTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    alert(`Order completed successfully! Total: ${orderTotal.toFixed(2)} €\n\nThank you for your purchase!`);
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Payment method change handler
document.addEventListener('change', function(e) {
    if (e.target.name === 'paymentMethod') {
        const creditCardForm = document.getElementById('creditCardForm');
        if (e.target.value === 'creditCard') {
            creditCardForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
        }
    }
});