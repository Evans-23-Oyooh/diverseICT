document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Create mobile overlay
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
        
        // Hamburger click handler
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Overlay click handler
        mobileOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Mobile dropdown handling
        document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    
                    dropdown.classList.toggle('active');
                    dropdownMenu.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                }
            });
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a:not(.dropdown > a)').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Page header slider
    const headerSlides = document.querySelectorAll('.header-slider .slide');
    if (headerSlides.length > 1) {
        let currentHeaderSlide = 0;
        
        function showHeaderSlide(index) {
            headerSlides.forEach(slide => slide.classList.remove('active'));
            headerSlides[index].classList.add('active');
        }
        
        function nextHeaderSlide() {
            currentHeaderSlide = (currentHeaderSlide + 1) % headerSlides.length;
            showHeaderSlide(currentHeaderSlide);
        }
        
        // Auto-slide every 4 seconds
        setInterval(nextHeaderSlide, 4000);
    }
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.hero-nav .prev');
    const nextBtn = document.querySelector('.hero-nav .next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    document.querySelectorAll('.quick-link-item, .program-card, .news-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current).toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Form validation (for future forms)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Add form validation to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Search functionality (basic)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', searchTerm);
        });
    }
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e3a8a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Dropdown menu for mobile
    document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Close dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // Focus management for mobile menu
    hamburger.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    });
    
    // Library resource access buttons
    document.querySelectorAll('.resource-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceCard = this.closest('.resource-card');
            const resourceTitle = resourceCard.querySelector('h4').textContent;
            
            // Show modal or redirect to resource portal
            alert(`Accessing ${resourceTitle}...\n\nThis would normally redirect to the digital library portal where students can log in with their credentials to access these resources.\n\nFor demo purposes, this shows the intended functionality.`);
            
            // In a real implementation, you would:
            // window.location.href = '/library-portal?category=' + encodeURIComponent(resourceTitle);
        });
    });
    
    // Quick access links
    document.querySelectorAll('.access-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkTitle = this.querySelector('h4').textContent;
            
            alert(`Opening ${linkTitle}...\n\nThis would normally redirect to the specific service or portal.\n\nFor demo purposes, this shows the intended functionality.`);
            
            // In a real implementation, you would redirect to actual services:
            // if (linkTitle.includes('Digital Catalog')) window.location.href = '/catalog';
            // if (linkTitle.includes('Student Portal')) window.location.href = '/student-portal';
            // if (linkTitle.includes('Book a Study Room')) window.location.href = '/room-booking';
            // if (linkTitle.includes('Ask a Librarian')) window.location.href = '/librarian-chat';
        });
    });
    
    // Handle admissions page links
    document.querySelectorAll('a[href="requirements.html"], a[href="undergraduate.html"], a[href="postgraduate.html"], a[href="fees.html"], a[href="history.html"], a[href="research.html"], a[href="student-life.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.textContent || this.getAttribute('href').replace('.html', '').replace('-', ' ');
            alert(`${pageName} page is under development.\n\nThis page will contain detailed information about ${pageName.toLowerCase()}.`);
        });
    });
    
    // Handle "Notify Me" buttons
    document.querySelectorAll('.btn-secondary').forEach(button => {
        if (button.textContent.includes('Notify Me')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const email = prompt('Enter your email address to receive notifications:');
                if (email && email.includes('@')) {
                    alert(`Thank you! We'll notify you at ${email} when applications open.`);
                } else if (email) {
                    alert('Please enter a valid email address.');
                }
            });
        }
    });
    

});