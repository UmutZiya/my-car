// Import blog data from blog-single-page.js
const allNewsData = [
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
    },
    {
        id: 4,
        image: "/images/car-being-taking-care-workshop.jpg",
        title: "Electric Vehicle Maintenance Guide",
        subtitle: "Essential maintenance tips for electric vehicles. Learn how to keep your EV running efficiently and extend battery life.",
        link: "blog-single-page.html?id=4"
    },
    {
        id: 5,
        image: "/images/car-detailing-concept-man-face-mask-with-orbital-polisher-repair-shop-polishing-roof-orange-suv-car.jpg",
        title: "Advanced Safety Features in Modern Cars",
        subtitle: "Explore the latest safety technologies in modern vehicles. From collision avoidance to lane departure warnings.",
        link: "blog-single-page.html?id=5"
    },
    {
        id: 6,
        image: "/images/full-shot-man-wrapping-car.jpg",
        title: "Future of Autonomous Vehicles",
        subtitle: "A comprehensive look at the future of self-driving cars and their impact on transportation and society.",
        link: "blog-single-page.html?id=6"
    }
];

// Function to truncate subtitle to 2 sentences
function truncateToTwoSentences(text) {
    const sentences = text.match(/[^.!?]*[.!?]/g);
    if (sentences && sentences.length >= 2) {
        return sentences.slice(0, 2).join(' ').trim() + '...';
    }
    return text + '...';
}

// Function to create news card HTML
function createNewsCard(news) {
    const truncatedSubtitle = truncateToTwoSentences(news.subtitle);
    return `
        <div class="all-news-card" onclick="window.location.href='${news.link}'">
            <div class="all-news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            <div class="all-news-content">
                <h3 class="all-news-title">${news.title}</h3>
                <p class="all-news-subtitle">${truncatedSubtitle}</p>
                <div class="all-news-footer">
                    <span class="all-news-date">${new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}</span>
                    <a href="${news.link}" class="all-news-read-more-btn">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to render all news
function renderAllNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;

    const newsHTML = allNewsData.map(news => createNewsCard(news)).join('');
    newsGrid.innerHTML = newsHTML;
}

// Initialize news when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderAllNews();
});