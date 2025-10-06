// How Products Made - Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const stepItems = document.querySelectorAll('.step-item');
    const visualItems = document.querySelectorAll('.visual-item');
    const processSection = document.querySelector('.how-products-made');
    
    if (!processSection) return;
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe step items for scroll animations
    stepItems.forEach((item, index) => {
        observer.observe(item);
        
        // Add click functionality
        item.addEventListener('click', () => {
            activateStep(index + 1);
        });
    });
    
    // Function to activate a specific step
    function activateStep(stepNumber) {
        // Remove active class from all items
        stepItems.forEach(item => item.classList.remove('active'));
        visualItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to selected step and corresponding visual
        const selectedStep = document.querySelector(`[data-step="${stepNumber}"]`);
        const selectedVisual = document.querySelector(`[data-visual="${stepNumber}"]`);
        
        if (selectedStep) selectedStep.classList.add('active');
        if (selectedVisual) selectedVisual.classList.add('active');
    }
    
    // Scroll-based activation
    let isScrolling = false;
    let scrollTimeout;
    
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const sectionTop = processSection.offsetTop;
            const sectionHeight = processSection.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            // Check if we're in the section
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                const stepPositions = Array.from(stepItems).map(item => {
                    const rect = item.getBoundingClientRect();
                    return {
                        element: item,
                        top: rect.top + window.scrollY,
                        bottom: rect.bottom + window.scrollY,
                        center: rect.top + window.scrollY + rect.height / 2
                    };
                });
                
                // Find the step closest to the center of the viewport
                let closestStep = null;
                let minDistance = Infinity;
                
                stepPositions.forEach((pos, index) => {
                    const distance = Math.abs(scrollPosition - pos.center);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestStep = index + 1;
                    }
                });
                
                if (closestStep) {
                    activateStep(closestStep);
                }
            }
            
            isScrolling = false;
        }, 100);
    }
    
    // Throttled scroll event
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Initialize with first step active
    activateStep(1);
    
    // Add smooth scroll behavior for step clicks
    stepItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Smooth scroll to the step
            const stepTop = item.offsetTop + processSection.offsetTop;
            const headerHeight = 80; // Adjust based on your header height
            const targetPosition = stepTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!processSection.matches(':hover') && !Array.from(stepItems).some(item => item.matches(':hover'))) {
            return;
        }
        
        const currentActive = document.querySelector('.step-item.active');
        if (!currentActive) return;
        
        const currentIndex = Array.from(stepItems).indexOf(currentActive);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % stepItems.length;
            activateStep(nextIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? stepItems.length - 1 : currentIndex - 1;
            activateStep(prevIndex + 1);
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    processSection.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    processSection.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const currentActive = document.querySelector('.step-item.active');
            if (!currentActive) return;
            
            const currentIndex = Array.from(stepItems).indexOf(currentActive);
            
            if (diffX > 0) {
                // Swipe left - next step
                const nextIndex = (currentIndex + 1) % stepItems.length;
                activateStep(nextIndex + 1);
            } else {
                // Swipe right - previous step
                const prevIndex = currentIndex === 0 ? stepItems.length - 1 : currentIndex - 1;
                activateStep(prevIndex + 1);
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
});
