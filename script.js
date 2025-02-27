document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        });
    });
    
    // // Form submission (prevent default for now)
    // const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
            
    //         // Get form values
    //         const name = document.getElementById('name').value;
    //         const email = document.getElementById('email').value;
    //         const message = document.getElementById('message').value;
            
    //         // Here you would typically send this data to a server
    //         // For now, just show an alert
    //         alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
            
    //         // Reset form
    //         contactForm.reset();
    //     });
    // }
    
     // Horizontal scrolling for projects
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (projectsGrid && prevBtn && nextBtn) {
         // Set scroll amount to the width of one project card plus gap
         const scrollAmount = 320; // 300px card width + 20px gap
        
        prevBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
         // Hide/show scroll buttons based on scroll position
        const toggleScrollButtons = () => {
            const isAtStart = projectsGrid.scrollLeft === 0;
            const isAtEnd = projectsGrid.scrollLeft + projectsGrid.clientWidth >= projectsGrid.scrollWidth - 5;
            
            prevBtn.style.visibility = isAtStart ? 'hidden' : 'visible';
            nextBtn.style.visibility = isAtEnd ? 'hidden' : 'visible';
        };
        
        projectsGrid.addEventListener('scroll', toggleScrollButtons);
        window.addEventListener('resize', toggleScrollButtons);
        
         // Initial check
        toggleScrollButtons();
    }

    // Add scroll event for navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});