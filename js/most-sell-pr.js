// Most Selling Products Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('mostSellingSlider');
    const prevBtn = document.getElementById('mostSellingPrevBtn');
    const nextBtn = document.getElementById('mostSellingNextBtn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    
    // Most selling products data
    const mostSellingProducts = [
        {
            id: 1,
            title: "Premium Brake Pads Set",
            price: "89.99",
            currency: "€",
            image: "/images/new-p1.jpeg",
            badge: "BEST SELLER",
            description: "High-performance brake pads for superior stopping power"
        },
        {
            id: 2,
            title: "LED Headlight Bulbs",
            price: "45.50",
            currency: "€",
            image: "/images/new-p2.jpeg",
            badge: "BEST SELLER",
            description: "Ultra-bright LED headlight bulbs with 5-year warranty"
        },
        {
            id: 3,
            title: "Air Filter Premium",
            price: "32.99",
            currency: "€",
            image: "/images/new-p3.jpeg",
            badge: "BEST SELLER",
            description: "High-quality air filter for better engine performance"
        },
        {
            id: 4,
            title: "Oil Filter Kit",
            price: "28.75",
            currency: "€",
            image: "/images/new-p4.jpeg",
            badge: "BEST SELLER",
            description: "Complete oil filter kit for regular maintenance"
        },
        {
            id: 5,
            title: "Spark Plugs Set",
            price: "67.25",
            currency: "€",
            image: "/images/new-p5.jpeg",
            badge: "BEST SELLER",
            description: "Iridium spark plugs for optimal engine performance"
        },
        {
            id: 6,
            title: "Wiper Blades Set",
            price: "24.99",
            currency: "€",
            image: "/images/new-p1.jpeg",
            badge: "BEST SELLER",
            description: "Premium wiper blades for clear visibility in all weather"
        },
        {
            id: 7,
            title: "Battery Terminal Cleaner",
            price: "15.50",
            currency: "€",
            image: "/images/new-p2.jpeg",
            badge: "BEST SELLER",
            description: "Professional battery terminal cleaning solution"
        },
        {
            id: 8,
            title: "Engine Oil 5W-30",
            price: "42.99",
            currency: "€",
            image: "/images/new-p3.jpeg",
            badge: "BEST SELLER",
            description: "Synthetic engine oil for maximum protection"
        }
    ];
    
    // Create product cards
    function createProductCards() {
        slider.innerHTML = '';
        
        mostSellingProducts.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'most-selling-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <div class="product-badge">${product.badge}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        ${product.price} <span class="currency">${product.currency}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            slider.appendChild(card);
        });
    }
    
    // Update slider position
    function updateSlider() {
        if (isAnimating) return;
        
        isAnimating = true;
        const cardWidth = slider.querySelector('.most-selling-card').offsetWidth;
        const translateX = -currentIndex * cardWidth;
        
        slider.style.transform = `translateX(${translateX}px)`;
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Next slide
    function nextSlide() {
        if (isAnimating) return;
        
        const totalCards = mostSellingProducts.length;
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        } else {
            // Loop to beginning
            currentIndex = 0;
            updateSlider();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (isAnimating) return;
        
        const totalCards = mostSellingProducts.length;
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else {
            // Loop to end
            currentIndex = maxIndex;
            updateSlider();
        }
    }
    
    // Get number of cards per view based on screen size
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1200) return 3;
        return 4;
    }
    
    // Handle window resize
    function handleResize() {
        const newCardsPerView = getCardsPerView();
        const totalCards = mostSellingProducts.length;
        const maxIndex = Math.max(0, totalCards - newCardsPerView);
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSlider();
    }
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (slider.matches(':hover') || slider.querySelector('.most-selling-card:hover')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
    
    // Initialize
    createProductCards();
    updateSlider();
    startAutoPlay();
    
    // Add to cart function (global)
    window.addToCart = function(productId) {
        const product = mostSellingProducts.find(p => p.id === productId);
        if (product) {
            // Add to cart logic here
            console.log(`Added ${product.title} to cart`);
            
            // Show success message
            showNotification(`${product.title} added to cart!`, 'success');
        }
    };
    
    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
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
});
