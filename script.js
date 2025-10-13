document.addEventListener('DOMContentLoaded', () => {

    // Typing animation
    if (document.querySelector('.typing')) {
        new Typed('.typing', {
            strings: ['Full Stack Developer', 'Programmer', 'Tech Enthusiast'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Fade-in animation on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    const projectData = {
        "Doctor Appointment": {
            why: "To provide a seamless and user-friendly interface for patients to book appointments with doctors. This improves efficiency and reduces manual booking efforts for hospital staff.",
            features: [
                "View detailed doctor profiles and specializations.",
                "Check doctor availability and select a suitable time slot.",
                "Responsive design for access on any device (mobile, tablet, desktop).",
                "Simple and intuitive booking process."
            ],
            tech: ["HTML5", "CSS3", "JavaScript"],
            liveDemo: "https://soumya28022005.github.io/soumya_doctor_frontend/",
            githubRepo: "https://github.com/soumya28022005/soumya_doctor_frontend"
        }
        // Add data for other projects here
    };

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCard = btn.closest('.project-card');
            // Change Here: Added .trim() to remove extra whitespace from the title
            const title = projectCard.querySelector('h3').textContent.trim();
            const data = projectData[title];

            if (data) {
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalWhy').textContent = data.why;

                const featuresList = document.getElementById('modalFeatures');
                featuresList.innerHTML = '';
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });

                const techContainer = document.getElementById('modalTech');
                techContainer.innerHTML = '';
                data.tech.forEach(techItem => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = techItem;
                    techContainer.appendChild(span);
                });
                
                modal.style.display = 'block';
            } else {
                console.error("Data not found for title:", `'${title}'`);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});

