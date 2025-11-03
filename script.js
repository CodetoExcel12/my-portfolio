// ==========================================
// Smooth Scrolling
// ==========================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        updateActiveNav(sectionId);
    }
}

// ==========================================
// Update Active Navigation
// ==========================================
function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId || 
            link.textContent.trim().toLowerCase() === sectionId) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('nav-mobile');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('nav-mobile');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// ==========================================
// Active Section on Scroll
// ==========================================
function updateActiveSectionOnScroll() {
    const sections = ['home', 'about', 'achievements', 'projects', 'education', 'contact'];
    const scrollPosition = window.scrollY + 150;

    for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                updateActiveNav(sectionId);
                break;
            }
        }
    }
}

// ==========================================
// Intersection Observer for Fade-in Animations
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ==========================================
// Scroll Event Listener
// ==========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveSectionOnScroll();
    });
});

// ==========================================
// Close Mobile Menu on Click Outside
// ==========================================
document.addEventListener('click', (event) => {
    const mobileMenu = document.getElementById('nav-mobile');
    const navToggle = document.getElementById('nav-toggle');
    
    if (mobileMenu && navToggle) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }
});

// ==========================================
// Close Mobile Menu on Escape
// ==========================================
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
});

// ==========================================
// Update Copyright Year
// ==========================================
function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// Initialize on DOM Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // Update active section on load
    updateActiveSectionOnScroll();
    
    // Update copyright year
    updateCopyrightYear();
});

// ==========================================
// Handle Window Resize
// ==========================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});