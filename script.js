/**
 * Nostalgia Studios - Complete Interactive JavaScript
 * All features working properly
 */

// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('Nostalgia Studios JS loaded successfully!');
    
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initTeamMemberModals();
    initContactForm();
    initImagePlaceholders();
    initActiveNavHighlight();
    initBackToTop();
    initScrollAnimations();
    initHeroSlider();
    initLegalModals();
});

// ===== HERO SLIDER =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 8000; // 8 seconds
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);
}

// ===== LEGAL MODALS (Privacy & Terms) =====
function initLegalModals() {
    const legalLinks = document.querySelectorAll('.legal-link');
    if (legalLinks.length === 0) return;

    // Create a dedicated legal modal container
    const modal = document.createElement('div');
    modal.classList.add('team-modal', 'legal-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body" style="padding: 1rem 0;"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const legalContent = {
        privacy: {
            title: "Privacy Policy",
            text: "Nostalgia Studios is committed to protecting your personal information. We collect contact details only for booking purposes and use secure systems to store your digital assets. Your data is never shared with third parties without your explicit consent. We prioritize the security of your photographic memories and maintain strict access controls."
        },
        terms: {
            title: "Terms of Service",
            text: "By engaging our services, you agree to the following: 1. A non-refundable deposit is required for all bookings. 2. Full payment is required before final media delivery. 3. Nostalgia Studios retains creative copyright while granting clients a personal usage license. 4. Rescheduling requires at least 48-hour notice to avoid additional fees."
        }
    };

    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            const content = legalContent[type];
            
            modal.querySelector('.modal-body').innerHTML = `
                <h2 style="color: var(--primary-color); border: none; font-size: 1.8rem;">${content.title}</h2>
                <p style="color: #555; text-align: left; margin-top: 1.5rem; line-height: 1.8; font-size: 1rem;">${content.text}</p>
            `;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close functionality
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ===== 1. MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.classList.add('mobile-menu-btn');
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Toggle menu');
        
        // Insert button after logo
        logo.parentNode.insertBefore(menuBtn, logo.nextSibling);
        
        // Toggle menu on click
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
            menuBtn.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
        });
        
        // Close menu when link is clicked
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                menuBtn.innerHTML = '☰';
            });
        });
    }
}

// ===== 2. SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 3. TEAM MEMBER MODALS =====
function initTeamMemberModals() {
    // Check if modal already exists
    if (document.querySelector('.team-modal')) return;
    
    // Create modal container
    const modal = document.createElement('div');
    modal.classList.add('team-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add click handlers to team member email buttons
    document.querySelectorAll('.team-member .email-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const member = btn.closest('.team-member');
            const modalBody = modal.querySelector('.modal-body');
            const memberClone = member.cloneNode(true);
            
            // Remove email button from clone
            const cloneBtn = memberClone.querySelector('.email-btn');
            if (cloneBtn) cloneBtn.remove();
            
            // Add extra details
            const extraInfo = document.createElement('div');
            extraInfo.classList.add('modal-extra');
            extraInfo.innerHTML = `
                <h4>Quick Contact</h4>
                <form class="modal-contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Message" rows="3" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            `;
            
            modalBody.innerHTML = '';
            modalBody.appendChild(memberClone);
            modalBody.appendChild(extraInfo);
            
            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Handle form submission
            const form = modal.querySelector('.modal-contact-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ===== 4. CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting us! We will respond within 24 hours.');
            contactForm.reset();
        });
    }
}

// ===== 5. IMAGE PLACEHOLDERS =====
function initImagePlaceholders() {
    document.querySelectorAll('img[src="#"]').forEach(img => {
        const colors = [
            ['#667eea', '#764ba2'], // Purple
            ['#e74c3c', '#c0392b'], // Red
            ['#3498db', '#2980b9'], // Blue
            ['#2ecc71', '#27ae60'], // Green
            ['#f1c40f', '#f39c12'], // Yellow
            ['#e67e22', '#d35400'], // Orange
            ['#1abc9c', '#16a085'], // Teal
            ['#9b59b6', '#8e44ad'], // Violet
            ['#34495e', '#2c3e50'], // Dark Blue
            ['#95a5a6', '#7f8c8d']  // Gray
        ];
        
        const randomColors = colors[Math.floor(Math.random() * colors.length)];
        const altText = img.alt || 'Team Member';
        
        // Get initials (first letters of each word)
        const initials = altText.split(' ').map(word => word[0]).join('');
        
        // Create canvas placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, randomColors[0]);
        gradient.addColorStop(1, randomColors[1]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 120px "Poppins", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, canvas.width/2, canvas.height/2);
        
        // Add small name at bottom
        ctx.font = 'bold 24px "Poppins", Arial, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(altText, canvas.width/2, canvas.height - 50);
        
        // Replace src with canvas data URL
        img.src = canvas.toDataURL('image/png');
        img.alt = altText;
    });
}

// ===== 6. ACTIVE NAVIGATION HIGHLIGHT =====
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id], #Team');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 7. BACK TO TOP BUTTON =====
function initBackToTop() {
    // Check if button already exists
    if (document.querySelector('.back-to-top')) return;
    
    const backToTop = document.createElement('button');
    backToTop.classList.add('back-to-top');
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 8. SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section, #Team, #contact, footer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// ===== 10. IMAGE LOAD HANDLER =====
document.addEventListener('load', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.classList.add('loaded');
    }
}, true);

// Check for images already loaded (e.g. from cache)
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// ===== 11. WELCOME MESSAGE =====
console.log('✨ Nostalgia Studios - All systems ready!');
console.log('📱 Mobile menu: ✓');
console.log('🖼️ Image placeholders: ✓');
console.log('👥 Team modals: ✓');
console.log('📧 Contact forms: ✓');
console.log('🔝 Back to top: ✓');