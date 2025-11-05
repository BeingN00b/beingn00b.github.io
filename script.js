// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.background = 'var(--card-bg)';
            navMenu.style.borderBottom = '2px solid var(--primary)';
            navMenu.style.gap = '1rem';
            navMenu.style.padding = '1.5rem';
            navMenu.style.zIndex = '999';
        });
    }

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.style.display = 'none';
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Create mailto link
        const mailtoLink = `mailto:rdeepakjm1999@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Open mailto
        window.location.href = mailtoLink;

        // Reset form
        this.reset();

        // Show success message
        showNotification('Message prepared! Opening your email client...', 'success');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary)' : 'var(--info)'};
        color: var(--dark-bg);
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 2000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Typing effect for terminal
function typeTerminal() {
    const lines = [
        { selector: '.terminal-line:nth-child(1)', delay: 0 },
        { selector: '.terminal-line:nth-child(2)', delay: 800 },
        { selector: '.terminal-line:nth-child(3)', delay: 1600 },
        { selector: '.terminal-line:nth-child(4)', delay: 2400 }
    ];

    lines.forEach(line => {
        const element = document.querySelector(line.selector);
        if (element) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.animation = 'fadeIn 0.5s ease';
            }, line.delay);
        }
    });
}

// Run terminal animation on page load
window.addEventListener('load', typeTerminal);

// Particle Animation Background (Optional Enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 300 + 100}px;
            height: ${Math.random() * 300 + 100}px;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .nav-link.active {
        color: var(--primary) !important;
    }
`;
document.head.appendChild(style);

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--dark-bg);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-weight: 700;
        transition: all 0.3s ease;
    `;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.2)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);
}

createScrollToTopButton();

// Add hover effect to skill cards
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
    });

    skill.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Add click ripple effect
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 255, 0, 0.5);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple to buttons
document.querySelectorAll('.btn-submit, .project-link').forEach(button => {
    button.addEventListener('click', function(e) {
        createRipple(e, this);
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

console.log('Portfolio loaded successfully! Welcome to Deepak Raj\'s cybersecurity portfolio.');
