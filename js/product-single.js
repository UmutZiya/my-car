// Load product data from URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        loadProductById(productId);
    }
});

// Load specific product by ID
function loadProductById(productId) {
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Update page title
        document.title = `${product.name} - May Car Automotive`;
        
        // Update product details on the page
        updateProductDetails(product);
    } else {
        // Product not found, redirect to all products
        window.location.href = 'all-products.html';
    }
}

// Update product details on the page
function updateProductDetails(product) {
    // Update product name
    const titleElements = document.querySelectorAll('.product-title, .product-name');
    titleElements.forEach(el => {
        if (el) el.textContent = product.name;
    });
    
    // Update product code
    const codeElements = document.querySelectorAll('.product-code strong');
    codeElements.forEach(el => {
        if (el) el.textContent = product.code;
    });
    
    // Update price
    const priceElements = document.querySelectorAll('.price-amount');
    priceElements.forEach(el => {
        if (el) el.textContent = `${product.price.toFixed(2)} ${product.currency}`;
    });
    
    // Update badge
    const badgeElements = document.querySelectorAll('.new-badge');
    badgeElements.forEach(el => {
        if (el) el.textContent = product.badge || 'NEW';
    });
    
    // Update main product image
    const mainImages = document.querySelectorAll('#mainProductImage');
    mainImages.forEach(img => {
        if (img) {
            img.src = product.image;
            img.alt = product.name;
        }
    });
    
    // Update thumbnail images
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        if (thumb) {
            thumb.src = product.image;
            thumb.alt = product.name;
        }
    });
    
    // Update breadcrumb
    if (product.breadcrumb) {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = product.breadcrumb.map((item, index) => {
                if (index === product.breadcrumb.length - 1) {
                    return `<li class="breadcrumb-item active">${item.name}</li>`;
                }
                return `<li class="breadcrumb-item"><a href="${item.url}">${item.name}</a></li>`;
            }).join('');
        }
    }
    
    // Update product description
    if (product.description) {
        const descriptionContainer = document.querySelector('.product-details');
        if (descriptionContainer) {
            descriptionContainer.innerHTML = `
                <h3>${product.description.title}</h3>
                <div class="description-content">
                    <p>${product.description.content}</p>
                    
                    <h4>Features:</h4>
                    <ul>
                        ${product.description.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h4>Specifications:</h4>
                    <div class="specifications">
                        ${product.description.specifications.map(spec => 
                            `<div class="spec-item"><strong>${spec.label}:</strong> ${spec.value}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    }
}