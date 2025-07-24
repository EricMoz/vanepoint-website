const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const businessCard = document.querySelector('.business-card');

function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('show');
    console.log('Toggled menu, show:', navLinks.classList.contains('show'));
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        console.log('Closed menu via Escape');
    }
});

if (businessCard) {
    businessCard.addEventListener('click', () => {
        businessCard.classList.toggle('touched');
        console.log('Business card toggled');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    console.log('Nav height on load:', navHeight);

    // Make all animate-on-scroll elements visible
    const elements = document.querySelectorAll('.animate-on-scroll');
    console.log('Animate-on-scroll elements:', elements.length);
    elements.forEach(el => {
        el.classList.add('visible');
        console.log('Added visible to:', el);
    });

    // Scroll to top if URL has #home
    if (window.location.hash === '#home') {
        console.log('URL has #home, scrolling to:', navHeight);
        window.scrollTo({
            top: navHeight, // Clear 70px nav
            behavior: 'smooth'
        });
    }

    // Debug hash changes
    window.addEventListener('hashchange', () => {
        console.log('Hash changed to:', window.location.hash);
    });

    // Handle Home link on index.html
    const homeLink = document.querySelector('a[href="#home"]');
    console.log('Home link found:', homeLink);
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            console.log('Home link clicked:', homeLink.href);
            e.preventDefault(); // Prevent default to control scroll
            const headerHeight = document.querySelector('nav')?.offsetHeight || 0;
            console.log('Header height:', headerHeight);
            window.scrollTo({
                top: headerHeight, // Clear 70px nav
                behavior: 'smooth'
            });
            window.location.hash = 'home'; // Set URL to #home
            if (navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    } else {
        console.log('Home link not found');
    }

    // Handle Home link on blog.html
    const blogHomeLink = document.querySelector('a[href*="#home"]');
    console.log('Blog home link found:', blogHomeLink);
    if (blogHomeLink) {
        blogHomeLink.addEventListener('click', (e) => {
            console.log('Blog home link clicked:', blogHomeLink.href);
            // Let browser navigate to /#home or index.html#home
            if (navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    } else {
        console.log('Blog home link not found');
    }

    // Debug nav clicks
    const navList = document.querySelector('.nav-links ul');
    if (navList) {
        navList.addEventListener('click', (e) => {
            console.log('Nav list clicked:', e.target);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Contact form submission coming soon!');
        });
    }

    // Testimonial form
    const testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = testimonialForm.querySelector('input[name="name"]').value;
            const role = testimonialForm.querySelector('input[name="role"]').value;
            const testimonial = testimonialForm.querySelector('textarea[name="testimonial"]').value;
            try {
                const response = await fetch('http://localhost:3001/submit-testimonial', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, role, testimonial })
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    testimonialForm.reset();
                } else {
                    alert(result.error || 'Failed to submit testimonial');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                alert('Error submitting testimonial. Please try again.');
            }
        });
    }
});