// Get DOM elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const scrollProgress = document.getElementById('scrollProgress');
const navLinks = document.querySelectorAll('.nav-link');
const effectNotice = document.getElementById('effectNotice');
const cartCount = document.getElementById('cartCount');

// Show effect notice on page load
setTimeout(() => {
    effectNotice.classList.add('show');
    setTimeout(() => {
        effectNotice.classList.remove('show');
    }, 4000);
}, 1000);

// SCROLL EVENT - CHANGES BACKGROUND COLOR AND FONT COLOR
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Add/remove scrolled class for color changes
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollY / windowHeight) * 100;
    scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
});

// HOVER EFFECTS for menu items
navLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        // Show notification for first hover
        if (index === 0) {
            effectNotice.textContent = '✨ Hover effects active! Try other menu items!';
            effectNotice.classList.add('show');
            setTimeout(() => {
                effectNotice.classList.remove('show');
            }, 2000);
        }
    });
});

// Mobile menu toggle functionality
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Simulate cart updates
let cartItems = 3;
setInterval(() => {
    cartItems = Math.floor(Math.random() * 9) + 1;
    cartCount.textContent = cartItems;
}, 8000);

// Add entrance animations to food cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply entrance animations to food cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.food-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add notification when scroll effect activates
    let scrollNotificationShown = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 && !scrollNotificationShown) {
            effectNotice.textContent = '🌈 Navigation color changed! Keep scrolling to explore!';
            effectNotice.classList.add('show');
            setTimeout(() => {
                effectNotice.classList.remove('show');
            }, 3000);
            scrollNotificationShown = true;
        }
    });

    // Reset scroll notification when back to top
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 50) {
            scrollNotificationShown = false;
        }
    });
});