document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Animate skill bars when section is in view
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.2
    });
    
    skillObserver.observe(skillSection);
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Sample projects data - replace with your actual projects
    const projects = [
        {
            title: "E-commerce Website",
            description: "A fully responsive e-commerce platform with shopping cart and payment integration.",
            tags: ["HTML", "CSS", "JavaScript"],
            category: "web",
            image: "project1.jpg",
            demo: "#",
            code: "#"
        },
        {
            title: "Inventory Management System",
            description: "Java application for managing inventory with database integration.",
            tags: ["Java", "MySQL", "Swing"],
            category: "java",
            image: "project2.jpg",
            demo: "#",
            code: "#"
        },
        {
            title: "Task Manager App",
            description: "Web application for managing daily tasks with user authentication.",
            tags: ["HTML", "CSS", "JavaScript", "Firebase"],
            category: "web",
            image: "project3.jpg",
            demo: "#",
            code: "#"
        },
        {
            title: "Weather Dashboard",
            description: "Dashboard displaying weather information from API with interactive charts.",
            tags: ["JavaScript", "API", "Chart.js"],
            category: "web",
            image: "project4.jpg",
            demo: "#",
            code: "#"
        },
        {
            title: "Banking System",
            description: "Console-based banking application with account management features.",
            tags: ["Java", "OOP"],
            category: "java",
            image: "project5.jpg",
            demo: "#",
            code: "#"
        },
        {
            title: "Portfolio Website",
            description: "Responsive portfolio website to showcase skills and projects.",
            tags: ["HTML", "CSS", "JavaScript"],
            category: "web",
            image: "project6.jpg",
            demo: "#",
            code: "#"
        }
    ];
    
    // Display projects
    function displayProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
            
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.category = project.category;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demo}" target="_blank">Live Demo</a>
                        <a href="${project.code}" target="_blank">View Code</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Initialize projects
    displayProjects();
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter projects
            displayProjects(this.dataset.filter);
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Add these to your existing script.js

// Typing animation for hero section
const dynamicText = document.querySelector('.dynamic-text');
const phrases = [
    "Web Developer",
    "UI/UX Designer",
    "Java Programmer",
    "Problem Solver",
    "Creative Thinker"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
    } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
}
const typingTexts = [
    "Web Developer",
    "UI/UX Designer",
    "Java Programmer",
    "Creative Thinker"
];
let currentTextIndex = 0;
const typingElement = document.querySelector('.typing-animation');

function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
        typingElement.innerHTML = text.substring(0, i+1);
        setTimeout(function() { typeWriter(text, i + 1, fnCallback) }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 1500);
    }
}

function startTypingAnimation() {
    if (currentTextIndex < typingTexts.length) {
        typeWriter(typingTexts[currentTextIndex], 0, function() {
            setTimeout(startTypingAnimation, 500);
        });
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    }
}

// Initialize particles.js
// Replace particles.js initialization with this scroll animation code
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add floating animation to specific elements after they appear
                if (entry.target.classList.contains('about-image') || 
                    entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('floating-element');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Add scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code
    initScrollAnimations();
    
    // Add animation order to elements
    document.querySelectorAll('.about-content > *').forEach((el, index) => {
        el.style.setProperty('--animation-order', index);
    });
    
    // Add hover effects to all links
    document.querySelectorAll('a').forEach(link => {
        link.classList.add('animated-underline');
    });

    // Add these new initializations
    startTypingAnimation();
    initParticles();
    initScrollAnimations();
    
    // Add animate-on-scroll class to sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
    setTimeout(typeWriter, 1000);
    
    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05)';
            profileImage.style.borderColor = 'rgba(52, 152, 219, 0.3)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
            profileImage.style.borderColor = 'rgba(52, 152, 219, 0.1)';
        });
    }
});
