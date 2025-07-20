const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const businessCard = document.querySelector('.business-card');

function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('show');
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

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

if (businessCard) {
    businessCard.addEventListener('click', () => {
        businessCard.classList.toggle('touched');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Contact form submission coming soon!');
        });
    }

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