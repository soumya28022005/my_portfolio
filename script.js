// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== TYPING ANIMATION ====================
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: [
                'Full Stack Developer', 
                'Problem Solver', 
                'Tech Enthusiast',
                'Code Craftsman'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // ==================== MOBILE MENU TOGGLE ====================
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // ==================== FADE-IN ANIMATION ON SCROLL ====================
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
    
    // ==================== PROJECT MODAL ====================
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    // Project data
    const projectData = {
        'emotion-ai': {
            title: 'Emotion-Aware AI Companion',
            icon: 'fas fa-brain',
            description: 'An empathetic AI companion that detects facial emotions using computer vision and provides compassionate, context-aware responses based on emotional analysis.',
            why: 'Mental health awareness is crucial in today\'s world. This project helps detect when someone might be hiding their true feelings by comparing facial expressions with their words, enabling more empathetic and supportive conversations.',
            features: [
                'Real-time facial emotion detection using face-api.js',
                'Sentiment analysis of text messages to detect emotional tone',
                'Emotion mismatch detection - identifies when face expressions don\'t match words',
                'Tracks emotional patterns and volatility over time',
                'Voice input support using Web Speech API',
                'Daily emotional summaries and insights',
                'Generates empathetic AI responses based on detected emotions',
                'PostgreSQL database for conversation history and emotion tracking'
            ],
            technologies: ['Node.js', 'Express.js', 'face-api.js', 'Web Speech API', 'PostgreSQL', 'JavaScript', 'CSS3', 'HTML5'],
            github: 'https://github.com/soumya28022005/face-ditection-ai',
            demo: null
        },
        'doctor': {
            title: 'Med-Connect: Clinic Management System',
            icon: 'fas fa-user-md',
            description: 'A comprehensive full-stack clinic management system with multi-role authentication and appointment scheduling.',
            why: 'To streamline clinic operations and provide a seamless interface for patients to book appointments with doctors. This system improves efficiency and reduces manual booking efforts for hospital staff while enhancing patient experience.',
            features: [
                'Multi-role authentication (Admin, Doctor, Patient, Receptionist)',
                'Real-time appointment scheduling with conflict detection',
                'Patient records management and medical history tracking',
                'Doctor availability management and calendar integration',
                'Dashboard analytics for admins and doctors',
                'Responsive design for access on any device',
                'Secure user authentication with Passport.js',
                'RESTful API architecture for scalability'
            ],
            technologies: ['Node.js', 'Express.js', 'EJS', 'PostgreSQL', 'Passport.js', 'Bootstrap', 'JavaScript', 'CSS3'],
            github: 'https://github.com/soumya28022005/doctor_name',
            demo: 'https://soumya28022005.github.io/soumya_doctor_frontend/'
        },
        'bank': {
            title: 'Digital Bank Platform',
            icon: 'fas fa-university',
            description: 'A secure digital banking simulation platform with complete account management, transaction tracking, and RESTful API implementation.',
            why: 'To demonstrate proficiency in building secure financial applications with proper authentication, authorization, and data management. This project showcases RESTful API design and secure backend development practices.',
            features: [
                'Secure user authentication and authorization',
                'Account creation and management (Savings, Checking, etc.)',
                'Real-time balance tracking and transaction history',
                'Money transfer between accounts with validation',
                'Transaction categorization and filtering',
                'Account statements and PDF generation',
                'RESTful API with full CRUD operations',
                'Responsive dashboard with data visualization',
                'Session management and security best practices'
            ],
            technologies: ['Node.js', 'Express.js', 'EJS', 'PostgreSQL', 'REST API', 'Passport.js', 'JavaScript', 'CSS3'],
            github: 'https://github.com/soumya28022005/digital_bank',
            demo: null
        }
    };
    
    // Open modal with project details
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                displayProjectDetails(project);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    function displayProjectDetails(project) {
        const featuresHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        const techTagsHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        const demoButtonHTML = project.demo 
            ? `<a href="${project.demo}" target="_blank" class="btn btn-primary" style="margin-right: 15px;">
                   <i class="fas fa-external-link-alt"></i> Live Demo
               </a>`
            : '';
        
        const githubButtonHTML = project.github
            ? `<a href="${project.github}" target="_blank" class="btn btn-secondary">
                   <i class="fab fa-github"></i> View Code
               </a>`
            : '';
        
        modalBody.innerHTML = `
            <h2><i class="${project.icon}"></i> ${project.title}</h2>
            
            <p style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 30px;">
                ${project.description}
            </p>
            
            <h3>Why This Project?</h3>
            <p>${project.why}</p>
            
            <h3>Key Features</h3>
            <ul>
                ${featuresHTML}
            </ul>
            
            <h3>Technologies Used</h3>
            <div class="tech-tags">
                ${techTagsHTML}
            </div>
            
            <div class="modal-footer-links">
                ${demoButtonHTML}
                ${githubButtonHTML}
            </div>
        `;
    }
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for modal close or other non-section links
            if (href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ==================== THEME TOGGLE (OPTIONAL) ====================
    // You can add a theme toggle button later if needed
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    };
    
    initTheme();
    
    // ==================== CONSOLE MESSAGE ====================
    console.log('%c👋 Hello Developer!', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for something? Check out my GitHub: https://github.com/soumya28022005', 'color: #A0AEC0; font-size: 14px;');
    console.log('%c💼 Hire me: soumyachatterjee2802@gmail.com', 'color: #00D9FF; font-size: 14px;');
});

// ==================== ADDITIONAL UTILITIES ====================

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add animation on scroll (reusable)
function animateOnScroll(selector, animationClass = 'visible') {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
