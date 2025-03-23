// Import all CSS files
import './css/style.css';
import './css/animations.css';
import './css/about.css';
import './css/support.css';

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav) {
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            
            header.insertBefore(mobileMenuBtn, nav);
            
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    };
    
    // Add mobile menu functionality when needed
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Animation for elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animation classes to elements
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Statistics counter animation
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.textContent.replace(/,|\+/g, ''));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    statNumber.textContent = statNumber.textContent.includes('+') ? 
                        target.toLocaleString() + '+' : 
                        target.toLocaleString();
                    return;
                }
                
                statNumber.textContent = statNumber.textContent.includes('+') ? 
                    current.toLocaleString() + '+' : 
                    current.toLocaleString();
                
                requestAnimationFrame(updateCounter);
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.disconnect();
                }
            });
            
            observer.observe(statNumber);
        });
    };
    
    // Initialize counter animation
    animateCounters();

    // Team filter functionality
    const initTeamFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const teamMembers = document.querySelectorAll('.team-member');
        
        if (filterBtns.length && teamMembers.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    teamMembers.forEach(member => {
                        if (filter === 'all') {
                            member.style.display = 'block';
                        } else {
                            if (member.getAttribute('data-category') === filter) {
                                member.style.display = 'block';
                            } else {
                                member.style.display = 'none';
                            }
                        }
                    });
                });
            });
        }
    };
    
    // Initialize team filter
    initTeamFilter();
});
