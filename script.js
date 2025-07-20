const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const businessCard = document.querySelector('.business-card');

// Toggle navigation menu
function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('show');
}

// Close menu with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Scroll animation trigger
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
});

// Business card touch support for mobile
if (businessCard) {
    businessCard.addEventListener('click', () => {
        businessCard.classList.toggle('touched');
    });
}

// Placeholder form submission handlers
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const testimonialForm = document.getElementById('testimonial-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Contact form submission coming soon!');
        });
    }

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Testimonial submission coming soon!');
        });
    }
});