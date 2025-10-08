// News data
const newsData = [
    {
        id: 1,
        image: "/images/car-being-taking-care-workshop.jpg",
        title: "Latest Automotive Technology Trends",
        subtitle: "Discover the cutting-edge technologies that are revolutionizing the automotive industry. From electric vehicles to autonomous driving systems.",
        link: "blog-single-page.html?id=1"
    },
    {
        id: 2,
        image: "/images/car-detailing-concept-man-face-mask-with-orbital-polisher-repair-shop-polishing-roof-orange-suv-car.jpg",
        title: "Professional Car Detailing Tips",
        subtitle: "Learn professional car detailing techniques to keep your vehicle looking pristine. Expert tips and tricks from industry professionals.",
        link: "blog-single-page.html?id=2"
    },
    {
        id: 3,
        image: "/images/full-shot-man-wrapping-car.jpg",
        title: "Car Wrapping: Complete Guide",
        subtitle: "Everything you need to know about car wrapping. From choosing the right materials to professional installation techniques.",
        link: "blog-single-page.html?id=3"
    }
];

// Function to create news card HTML
function createNewsCard(news) {
    return `
        <div class="news-card" onclick="window.location.href='${news.link}'">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-subtitle">${news.subtitle}</p>
                <div class="news-footer">
                    <span class="news-date">${new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}</span>
                    <a href="${news.link}" class="read-more-btn">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to render news
function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;

    const newsHTML = newsData.map(news => createNewsCard(news)).join('');
    newsContainer.innerHTML = newsHTML;
}

// Initialize news when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderNews();
});