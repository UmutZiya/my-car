// Load products from localStorage (added via add-product.js)
let allProducts = JSON.parse(localStorage.getItem('products')) || [];

// Filter data structure (from product-filter.js)
const filterData = {
    brands: [
        'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Toyota', 'Honda', 
        'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volvo', 'Peugeot', 
        'Renault', 'Citroen', 'Fiat', 'Alfa Romeo', 'Jaguar', 'Land Rover'
    ],
    
    models: {
        'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'CLA', 'CLS'],
        'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7'],
        'Audi': ['A1', 'A3', 'A4', 'A6', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8'],
        'Volkswagen': ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'T-Cross', 'T-Roc', 'Arteon'],
        'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Explorer', 'Mustang', 'Ranger'],
        'Toyota': ['Yaris', 'Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser'],
        'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Insight'],
        'Nissan': ['Micra', 'Sentra', 'Altima', 'Qashqai', 'X-Trail', 'Pathfinder'],
        'Hyundai': ['i10', 'i20', 'i30', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
        'Kia': ['Picanto', 'Rio', 'Ceed', 'Optima', 'Sportage', 'Sorento'],
        'Mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9'],
        'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Ascent'],
        'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90'],
        'Peugeot': ['208', '308', '508', '2008', '3008', '5008'],
        'Renault': ['Clio', 'Megane', 'Talisman', 'Captur', 'Kadjar', 'Koleos'],
        'Citroen': ['C1', 'C3', 'C4', 'C5', 'C3 Aircross', 'C5 Aircross'],
        'Fiat': ['500', 'Panda', 'Tipo', '500X', '500L'],
        'Alfa Romeo': ['Giulietta', 'Giulia', 'Stelvio'],
        'Jaguar': ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace'],
        'Land Rover': ['Range Rover Evoque', 'Range Rover Sport', 'Range Rover', 'Discovery', 'Defender']
    },
    
    versions: [
        '1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '2.2', '2.4', '2.5', '2.8', '3.0', '3.5', '4.0',
        '1.0 TSI', '1.4 TSI', '1.5 TSI', '2.0 TSI', '2.5 TSI', '3.0 TSI',
        '1.6 TDI', '2.0 TDI', '2.2 TDI', '3.0 TDI',
        '1.0 EcoBoost', '1.5 EcoBoost', '2.0 EcoBoost', '2.3 EcoBoost',
        'Hybrid', 'Plug-in Hybrid', 'Electric', 'AMG', 'M Performance', 'S-Line', 'R-Line', 'ST', 'GTI', 'RS'
    ],
    
    generations: [
        '2015-2018', '2016-2019', '2017-2020', '2018-2021', '2019-2022', '2020-2023', '2021-2024', '2022-present',
        '2013-2016', '2014-2017', '2012-2015', '2011-2014', '2010-2013', '2009-2012', '2008-2011', '2007-2010'
    ],
    
    types: [
        'Hatchback', 'Sedan', 'Estate/Wagon', 'SUV', 'Crossover', 'Coupe', 'Convertible', 
        'Pickup', 'Van', 'MPV', 'Roadster', 'Limousine'
    ]
};

let filteredProducts = [];
let currentSort = 'name';

// Load products from localStorage
function loadProducts() {
    allProducts = JSON.parse(localStorage.getItem('products')) || [];
    filteredProducts = [...allProducts];
}

// Go to product single page
function goToProductPage(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product && product.link) {
        window.location.href = product.link;
    } else {
        window.location.href = `product-single-page.html?id=${productId}`;
    }
}

// DOM elements
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const versionSelect = document.getElementById('versionSelect');
const generationSelect = document.getElementById('generationSelect');
const typeSelect = document.getElementById('typeSelect');
const clearFilterBtn = document.getElementById('clearFilter');
const searchFilterBtn = document.getElementById('searchFilter');
const sortSelect = document.getElementById('sortSelect');
const productsContainer = document.getElementById('productsContainer');
const productsCount = document.getElementById('productsCount');
const noProducts = document.getElementById('noProducts');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeFilters();
    
    // Check for URL parameters and apply filters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        applyUrlFilters(urlParams);
    } else {
        displayProducts(allProducts);
        updateProductsCount(allProducts.length);
    }
    
    // Add event listeners
    brandSelect.addEventListener('change', handleBrandChange);
    modelSelect.addEventListener('change', handleModelChange);
    versionSelect.addEventListener('change', handleVersionChange);
    generationSelect.addEventListener('change', handleGenerationChange);
    typeSelect.addEventListener('change', handleTypeChange);
    clearFilterBtn.addEventListener('click', clearFilters);
    searchFilterBtn.addEventListener('click', applyFilters);
    sortSelect.addEventListener('change', handleSortChange);
});

// Initialize filter dropdowns
function initializeFilters() {
    // Populate brands
    filterData.brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

// Handle brand selection
function handleBrandChange() {
    const selectedBrand = brandSelect.value;
    
    // Reset and populate models
    resetSelect(modelSelect, 'Select Model');
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedBrand && filterData.models[selectedBrand]) {
        modelSelect.disabled = false;
        filterData.models[selectedBrand].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    } else {
        modelSelect.disabled = true;
        versionSelect.disabled = true;
        generationSelect.disabled = true;
        typeSelect.disabled = true;
    }
}

// Handle model selection
function handleModelChange() {
    const selectedModel = modelSelect.value;
    
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedModel) {
        versionSelect.disabled = false;
        filterData.versions.forEach(version => {
            const option = document.createElement('option');
            option.value = version;
            option.textContent = version;
            versionSelect.appendChild(option);
        });
    } else {
        versionSelect.disabled = true;
        generationSelect.disabled = true;
        typeSelect.disabled = true;
    }
}

// Handle version selection
function handleVersionChange() {
    const selectedVersion = versionSelect.value;
    
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedVersion) {
        generationSelect.disabled = false;
        filterData.generations.forEach(generation => {
            const option = document.createElement('option');
            option.value = generation;
            option.textContent = generation;
            generationSelect.appendChild(option);
        });
    } else {
        generationSelect.disabled = true;
        typeSelect.disabled = true;
    }
}

// Handle generation selection
function handleGenerationChange() {
    const selectedGeneration = generationSelect.value;
    
    resetSelect(typeSelect, 'Select Type');
    
    if (selectedGeneration) {
        typeSelect.disabled = false;
        filterData.types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    } else {
        typeSelect.disabled = true;
    }
}

// Handle type selection
function handleTypeChange() {
    // Type is the last filter, no additional dropdowns to populate
}

// Reset select dropdown
function resetSelect(selectElement, placeholder) {
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
    selectElement.disabled = true;
}

// Clear all filters
function clearFilters() {
    brandSelect.value = '';
    resetSelect(modelSelect, 'Select Model');
    resetSelect(versionSelect, 'Select Version');
    resetSelect(generationSelect, 'Select Generation');
    resetSelect(typeSelect, 'Select Type');
    
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
    updateProductsCount(filteredProducts.length);
}

// Apply filters
function applyFilters() {
    const filters = {
        brand: brandSelect.value,
        model: modelSelect.value,
        version: versionSelect.value,
        generation: generationSelect.value,
        type: typeSelect.value
    };
    
    filteredProducts = allProducts.filter(product => {
        return (!filters.brand || product.brand === filters.brand) &&
               (!filters.model || product.model === filters.model) &&
               (!filters.version || product.version === filters.version) &&
               (!filters.generation || product.generation === filters.generation) &&
               (!filters.type || product.type === filters.type);
    });
    
    sortProducts(currentSort);
    displayProducts(filteredProducts);
    updateProductsCount(filteredProducts.length);
}

// Handle sort change
function handleSortChange() {
    currentSort = sortSelect.value;
    sortProducts(currentSort);
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts(sortType) {
    switch(sortType) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
    }
}

// Display products
function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.style.display = 'none';
        noProducts.style.display = 'block';
        return;
    }
    
    productsContainer.style.display = 'grid';
    noProducts.style.display = 'none';
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" onclick="goToProductPage(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge || 'NEW'}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-code">Code: ${product.code}</div>
                <div class="product-price">
                    <span class="price-main">${product.price.toFixed(2)} ${product.currency}</span>
                    <span class="price-unit">${product.unit}</span>
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-wishlist" onclick="addToWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update products count
function updateProductsCount(count) {
    productsCount.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
}

// Add to cart function
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if function exists
    if (typeof updateCartDisplay === 'function') {
        updateCartDisplay();
    }
    
    showAddToCartMessage();
}

// Add to wishlist function
function addToWishlist(productId) {
    const button = event.target.closest('.btn-wishlist');
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
    }
}

// Apply filters from URL parameters
function applyUrlFilters(urlParams) {
    const brand = urlParams.get('brand');
    const model = urlParams.get('model');
    const version = urlParams.get('version');
    const generation = urlParams.get('generation');
    const type = urlParams.get('type');
    
    // Set filter values
    if (brand) {
        brandSelect.value = brand;
        handleBrandChange();
    }
    if (model) {
        setTimeout(() => {
            modelSelect.value = model;
            handleModelChange();
        }, 100);
    }
    if (version) {
        setTimeout(() => {
            versionSelect.value = version;
            handleVersionChange();
        }, 200);
    }
    if (generation) {
        setTimeout(() => {
            generationSelect.value = generation;
            handleGenerationChange();
        }, 300);
    }
    if (type) {
        setTimeout(() => {
            typeSelect.value = type;
        }, 400);
    }
    
    // Apply filters after setting values
    setTimeout(() => {
        applyFilters();
    }, 500);
}

// Show add to cart success message
function showAddToCartMessage() {
    const notification = document.createElement('div');
    notification.className = 'notification notification-success';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Product added to cart!</span>
        </div>
    `;
    
    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            }
            .notification-success {
                border-left: 4px solid #28a745;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 20px;
            }
            .notification-success i {
                color: #28a745;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}