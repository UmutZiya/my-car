// Blog data
const blogData = {
    1: {
        id: 1,
        title: "Latest Automotive Technology Trends",
        author: "Admin",
        date: "December 15, 2024",
        category: "Technology",
        image: "/images/car-being-taking-care-workshop.jpg",
        lead: "The automotive industry is experiencing a revolutionary transformation with cutting-edge technologies that are reshaping how we think about transportation, safety, and environmental sustainability.",
        content: [
            {
                type: "paragraph",
                text: "Electric vehicles (EVs) have moved from niche products to mainstream alternatives, with major manufacturers investing billions in battery technology and charging infrastructure. The latest developments in lithium-ion batteries are extending range while reducing charging times, making EVs more practical for everyday use."
            },
            {
                type: "heading",
                text: "Autonomous Driving Systems"
            },
            {
                type: "paragraph",
                text: "Self-driving technology continues to advance with sophisticated sensor arrays, machine learning algorithms, and real-time data processing. Level 3 and Level 4 autonomous features are becoming more common in luxury vehicles, promising safer roads and reduced traffic congestion."
            },
            {
                type: "quote",
                text: "The future of automotive technology lies in the seamless integration of artificial intelligence, sustainable energy, and human-centered design.",
                cite: "Automotive Technology Expert"
            },
            {
                type: "heading",
                text: "Connected Car Technologies"
            },
            {
                type: "paragraph",
                text: "Modern vehicles are becoming mobile computing platforms with 5G connectivity, over-the-air updates, and integrated IoT systems. These technologies enable real-time traffic optimization, predictive maintenance, and enhanced infotainment experiences."
            },
            {
                type: "paragraph",
                text: "Advanced driver assistance systems (ADAS) are also evolving rapidly, incorporating features like adaptive cruise control, lane-keeping assistance, and automatic emergency braking. These systems are laying the groundwork for fully autonomous vehicles while improving safety in current models."
            },
            {
                type: "heading",
                text: "Sustainable Manufacturing"
            },
            {
                type: "paragraph",
                text: "Automotive manufacturers are adopting sustainable practices throughout the production process, from using recycled materials to implementing carbon-neutral manufacturing facilities. This shift towards sustainability is driven by both regulatory requirements and consumer demand for environmentally responsible products."
            },
            {
                type: "paragraph",
                text: "The integration of these technologies represents a fundamental shift in the automotive landscape, promising a future of safer, more efficient, and environmentally friendly transportation solutions."
            }
        ],
        tags: ["Technology", "Electric Vehicles", "Autonomous Driving", "Innovation"],
        link: "blog-single-page.html?id=1"
    },
    2: {
        id: 2,
        title: "Professional Car Detailing Tips",
        author: "Expert Team",
        date: "December 10, 2024",
        category: "Maintenance",
        image: "/images/car-detailing-concept-man-face-mask-with-orbital-polisher-repair-shop-polishing-roof-orange-suv-car.jpg",
        lead: "Learn professional car detailing techniques to keep your vehicle looking pristine. Expert tips and tricks from industry professionals.",
        content: [
            {
                type: "paragraph",
                text: "Professional car detailing goes beyond a simple wash and wax. It's a comprehensive process that involves cleaning, restoring, and protecting every surface of your vehicle to achieve a showroom-quality finish."
            },
            {
                type: "heading",
                text: "Essential Tools and Products"
            },
            {
                type: "paragraph",
                text: "Quality tools make all the difference in achieving professional results. Invest in microfiber towels, foam applicators, and pH-balanced cleaning products specifically designed for automotive use."
            }
        ],
        tags: ["Detailing", "Maintenance", "Car Care", "Tips"],
        link: "blog-single-page.html?id=2"
    },
    3: {
        id: 3,
        title: "Car Wrapping: Complete Guide",
        author: "Design Team",
        date: "December 5, 2024",
        category: "Customization",
        image: "/images/full-shot-man-wrapping-car.jpg",
        lead: "Everything you need to know about car wrapping. From choosing the right materials to professional installation techniques.",
        content: [
            {
                type: "paragraph",
                text: "Car wrapping has become increasingly popular as a way to customize vehicle appearance while protecting the original paint. Modern vinyl wraps offer durability, variety, and reversibility."
            },
            {
                type: "heading",
                text: "Types of Wrap Materials"
            },
            {
                type: "paragraph",
                text: "From matte finishes to carbon fiber textures, the variety of wrap materials available today allows for unlimited customization possibilities while maintaining professional quality."
            }
        ],
        tags: ["Wrapping", "Customization", "Design", "Installation"],
        link: "blog-single-page.html?id=3"
    }
};

// Get blog ID from URL parameters
function getBlogId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

// Render content based on type
function renderContent(contentArray) {
    return contentArray.map(item => {
        switch(item.type) {
            case 'paragraph':
                return `<p>${item.text}</p>`;
            case 'heading':
                return `<h3>${item.text}</h3>`;
            case 'quote':
                return `<blockquote class="blog-quote">
                    <p>"${item.text}"</p>
                    <cite>- ${item.cite}</cite>
                </blockquote>`;
            default:
                return '';
        }
    }).join('');
}

// Render blog article
function renderBlog() {
    const blogId = getBlogId();
    const blog = blogData[blogId];
    
    if (!blog) {
        document.querySelector('.blog-article').innerHTML = '<p>Blog post not found.</p>';
        return;
    }

    // Update breadcrumb
    document.querySelector('.breadcrumb-item.active').textContent = blog.title;
    
    // Update article header
    document.querySelector('.article-title').textContent = blog.title;
    document.querySelector('.article-meta').innerHTML = `
        <span class="meta-item">
            <i class="fas fa-calendar"></i>
            ${blog.date}
        </span>
        <span class="meta-item">
            <i class="fas fa-user"></i>
            By ${blog.author}
        </span>
        <span class="meta-item">
            <i class="fas fa-tag"></i>
            ${blog.category}
        </span>
    `;
    
    // Update article image
    const articleImage = document.querySelector('.article-image img');
    articleImage.src = blog.image;
    articleImage.alt = blog.title;
    
    // Update article content
    document.querySelector('.article-content').innerHTML = `
        <p class="lead">${blog.lead}</p>
        ${renderContent(blog.content)}
    `;
    
    // Update tags
    const tagsHtml = blog.tags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('');
    document.querySelector('.article-tags').innerHTML = `
        <span class="tag-label">Tags:</span>
        ${tagsHtml}
    `;
    
    // Update page title
    document.title = `${blog.title} - May Car Automotive`;
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderBlog();
});