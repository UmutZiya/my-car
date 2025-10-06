// New Products Slider JavaScript
class NewProductsSlider {
    constructor() {
        this.slider = document.getElementById('productsSlider');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        this.productsPerView = this.getProductsPerView();
        this.products = this.getProductsData();
        
        this.init();
    }

    getProductsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1200) return 3;
        return 4;
    }

    getProductsData() {
        return [
            {
                id: 1,
                title: "Mercedes-Benz E-Class Premium Headlights",
                price: 1250.00,
                image: "/images/new-p1.jpeg",
                badge: "New"
            },
            {
                id: 2,
                title: "BMW 3 Series LED Taillights Set",
                price: 890.00,
                image: "/images/new-p2.jpeg",
                badge: "Hot"
            },
            {
                id: 3,
                title: "Audi A4 Sport Grille Chrome",
                price: 450.00,
                image: "/images/new-p3.jpeg",
                badge: "Sale"
            },
            {
                id: 4,
                title: "Volkswagen Golf GTI Carbon Fiber Spoiler",
                price: 320.00,
                image: "/images/new-p4.jpeg",
                badge: "New"
            },
            {
                id: 5,
                title: "Porsche 911 Turbo Side Mirrors",
                price: 2100.00,
                image: "/images/new-p5.jpeg",
                badge: "Premium"
            },
            {
                id: 5,
                title: "Porsche 911 Turbo Side Mirrors",
                price: 2100.00,
                image: "/images/new-p5.jpeg",
                badge: "Premium"
            },
            {
                id: 5,
                title: "Porsche 911 Turbo Side Mirrors",
                price: 2100.00,
                image: "/images/new-p5.jpeg",
                badge: "Premium"
            }
        ];
    }

    init() {
        this.renderProducts();
        this.bindEvents();
        this.updateSliderPosition();
        
        // Update products per view on resize
        window.addEventListener('resize', () => {
            this.productsPerView = this.getProductsPerView();
            this.updateSliderPosition();
        });
    }

    renderProducts() {
        this.slider.innerHTML = '';
        
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            this.slider.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    ${product.price.toLocaleString('de-DE', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                    })} €
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="newProductsSlider.addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        });
        
        this.slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
        });
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = Math.max(0, this.products.length - this.productsPerView);
        }
        this.updateSliderPosition();
    }

    nextSlide() {
        const maxIndex = Math.max(0, this.products.length - this.productsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const cardWidth = 300 + 30; // card width + margin
        const translateX = -(this.currentIndex * cardWidth);
        this.slider.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.updateButtonStates();
    }

    updateButtonStates() {
        const maxIndex = Math.max(0, this.products.length - this.productsPerView);
        
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            // Add to cart logic here
            console.log(`Added to cart: ${product.title}`);
            
            // Show success message
            this.showNotification(`${product.title} added to cart!`, 'success');
        }
    }


    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newProductsSlider = new NewProductsSlider();
});
