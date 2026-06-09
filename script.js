/* ===================================
   NETFLIX CLONE - JAVASCRIPT
   Vanilla JS for Interactive Features
   =================================== */

// ========== LOADER ANIMATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 2 seconds
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 2000);
});

// ========== STICKY NAVBAR & SCROLL EFFECTS ==========
const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add scrolled class to navbar after scrolling
    if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Detect scroll direction (optional)
    lastScrollPosition = scrollPosition;
});

// ========== SEARCH FUNCTIONALITY ==========
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm) {
        // You can add search filtering logic here
        console.log('Searching for:', searchTerm);
        // Example: filter movie cards based on search term
        filterMovies(searchTerm);
    } else {
        // Show all movies if search is empty
        showAllMovies();
    }
});

/**
 * Filter movies based on search term
 * @param {string} searchTerm - The search term
 */
function filterMovies(searchTerm) {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const movieTitle = card.querySelector('.movie-details h4').textContent.toLowerCase();
        const movieInfo = card.querySelector('.movie-info h3').textContent.toLowerCase();
        
        if (movieTitle.includes(searchTerm) || movieInfo.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Show all movies
 */
function showAllMovies() {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.style.display = 'block';
    });
}

// Clear search on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        showAllMovies();
    }
});

// ========== SLIDER FUNCTIONALITY ==========
/**
 * Scroll the movie slider horizontally
 * @param {HTMLElement} button - The button clicked
 * @param {number} direction - Direction: -1 for left, 1 for right
 */
function scrollSlider(button, direction) {
    // Find the closest slider container
    const sliderContainer = button.closest('.slider-container');
    const movieRow = sliderContainer.querySelector('.movie-row');
    
    // Calculate scroll amount (width of one movie card + gap)
    const cardWidth = movieRow.querySelector('.movie-card').offsetWidth;
    const gap = 12; // Same as --spacing-md in CSS
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
    
    // Smooth scroll animation
    movieRow.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
    
    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
}

// ========== NAVIGATION LINK ACTIVE STATE ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        e.target.classList.add('active');
    });
});

// ========== HERO BANNER BUTTONS ==========
const playButton = document.querySelector('.btn-play');
const infoButton = document.querySelector('.btn-info');

playButton.addEventListener('click', () => {
    // Add click feedback
    playButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        playButton.style.transform = '';
    }, 200);
    
    // Show alert or redirect to video player
    alert('🎬 Starting playback...\n\nThis is a demo. In a real app, this would play the video.');
});

infoButton.addEventListener('click', () => {
    // Add click feedback
    infoButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        infoButton.style.transform = '';
    }, 200);
    
    // Show alert or open modal with more info
    alert('ℹ️ More Information\n\nTitle: Stranger Things\nRating: 8.7/10\nGenre: Drama, Fantasy, Horror\nYear: 2016-present\nSeasons: 4\n\nWatch the story of a young boy who vanishes, leading to the discovery of secret government experiments and terrifying supernatural forces.');
});

// ========== MOVIE CARD INTERACTIONS ==========
document.querySelectorAll('.movie-card').forEach(card => {
    const playBtn = card.querySelector('.play-button');
    
    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const movieTitle = card.querySelector('.movie-details h4').textContent;
            
            // Visual feedback
            playBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn.style.transform = '';
            }, 200);
            
            // Simulated play action
            console.log('Playing:', movieTitle);
            alert(`🎬 Playing: ${movieTitle}\n\nIn a real Netflix app, the video player would load here.`);
        });
    }
    
    // Click on card for more info
    card.addEventListener('click', () => {
        const movieTitle = card.querySelector('.movie-details h4').textContent;
        const rating = card.querySelector('.rating').textContent;
        
        console.log('Card clicked:', movieTitle);
        // You can add modal or detail page here
    });
});

// ========== PROFILE DROPDOWN ==========
const profileAvatar = document.querySelector('.profile-avatar');

if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        // Toggle dropdown or perform action
        console.log('Profile clicked');
    });
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // Tab key for accessibility
    if (e.key === 'Tab') {
        // Enhance focus visibility
        document.body.style.outline = 'none';
    }
    
    // Arrow keys for slider navigation
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('slider-btn')) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            scrollSlider(focusedElement, direction);
        }
    }
});

// ========== SMOOTH SCROLL BEHAVIOR ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== RESPONSIVE IMAGE LOADING ==========
/**
 * Lazy load images for better performance
 * Uses Intersection Observer API
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.movie-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.5s ease-in-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.movie-section').forEach(section => {
    observer.observe(section);
});

// ========== WINDOW RESIZE HANDLER ==========
const handleResize = debounce(() => {
    // Adjust grid on window resize
    const windowWidth = window.innerWidth;
    console.log('Window resized to:', windowWidth);
}, 250);

window.addEventListener('resize', handleResize);

// ========== ACCESSIBILITY ENHANCEMENTS ==========
/**
 * Add keyboard accessibility to buttons
 */
document.querySelectorAll('.btn, .slider-btn, .play-button').forEach(button => {
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// ========== PERFORMANCE MONITORING ==========
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Performance:', entry.name, entry.duration);
            }
        });
        
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        console.log('Performance observer not supported');
    }
}

// ========== INITIALIZATION ==========
console.log('🎬 Netflix Clone Loaded Successfully!');
console.log('Tip: Use Search, Scroll Sliders, and Click on Movies to Interact');

// ========== EVENT DELEGATION FOR DYNAMIC CONTENT ==========
document.addEventListener('click', (e) => {
    // Handle dynamically added elements
    if (e.target.closest('.movie-card')) {
        console.log('Movie card clicked via delegation');
    }
});

// ========== LOCAL STORAGE FOR USER PREFERENCES ==========
/**
 * Save user theme preference
 */
function saveThemePreference() {
    localStorage.setItem('theme', 'dark');
}

/**
 * Load user theme preference
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Load theme on page load
loadThemePreference();

// ========== SERVICE WORKER REGISTRATION (Optional) ==========
/**
 * Register service worker for offline support (optional feature)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', (event) => {
    console.error('Global Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ========== HIDE PROFILE DROPDOWN WHEN CLICKING OUTSIDE ==========
document.addEventListener('click', (e) => {
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar && !profileAvatar.contains(e.target)) {
        // Close dropdown if open
    }
});
