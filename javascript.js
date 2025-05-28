// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for all pages
    initializeNavigation();
    
    // Page-specific functionality
    if (document.querySelector('body').classList.contains('home-page')) {
        initializeHomePage();
    } else if (document.querySelector('body').classList.contains('courses-page')) {
        initializeCoursesPage();
    } else if (document.querySelector('body').classList.contains('resources-page')) {
        initializeResourcesPage();
    } else if (document.querySelector('body').classList.contains('feedback-page')) {
        initializeFeedbackPage();
    } else if (document.querySelector('body').classList.contains('about-page')) {
        initializeAboutPage();
    }
});

// Navigation Initialization
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle (will be added to CSS)
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '☰ Menu';
    document.querySelector('nav').prepend(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
}

// Home Page Functionality
function initializeHomePage() {
    // Animate containers on scroll
    const containers = document.querySelectorAll('.container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    containers.forEach(container => {
        observer.observe(container);
    });
    
    // Add click event to containers
    containers.forEach(container => {
        container.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

// Courses Page Functionality
function initializeCoursesPage() {
    // Course filtering functionality
    const filterInput = document.createElement('input');
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('placeholder', 'Search courses...');
    filterInput.classList.add('course-filter');
    document.querySelector('main').prepend(filterInput);
    
    filterInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const courseItems = document.querySelectorAll('.course-item');
        
        courseItems.forEach(item => {
            const courseTitle = item.querySelector('h3').textContent.toLowerCase();
            const courseDesc = item.querySelector('p').textContent.toLowerCase();
            
            if (courseTitle.includes(searchTerm) || courseDesc.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Course enrollment simulation
    const enrollButtons = document.querySelectorAll('.course-item');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const courseTitle = this.querySelector('h3').textContent;
                alert(`You've enrolled in "${courseTitle}"!`);
            }
        });
    });
}

// Resources Page Functionality
function initializeResourcesPage() {
    // Resource download counter
    const resourceLinks = document.querySelectorAll('.resource-list a');
    
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceName = this.textContent;
            alert(`Downloading "${resourceName}". This is a simulation.`);
            
            // In a real app, you would track downloads here
            console.log(`Downloaded: ${resourceName}`);
        });
    });
    
    // Category accordion
    const categories = document.querySelectorAll('.resource-category');
    categories.forEach(category => {
        const heading = category.querySelector('h2');
        const list = category.querySelector('ul');
        
        heading.style.cursor = 'pointer';
        heading.addEventListener('click', function() {
            list.classList.toggle('collapsed');
        });
    });
}

// Feedback Page Functionality
function initializeFeedbackPage() {
    const feedbackForm = document.querySelector('.feedback-form form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.elements['name'].value;
            const email = this.elements['email'].value;
            const message = this.elements['message'].value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log('Feedback submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your feedback!');
            this.reset();
        });
    }
}

// About Page Functionality
function initializeAboutPage() {
    // Team member interaction
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Mission statement animation
    const missionStatement = document.querySelector('.about-section:first-of-type p');
    if (missionStatement) {
        let originalText = missionStatement.textContent;
        let words = originalText.split(' ');
        
        missionStatement.textContent = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            missionStatement.appendChild(span);
            
            setTimeout(() => {
                span.style.transition = 'opacity 0.5s ease';
                span.style.opacity = '1';
            }, index * 100);
        });
    }
}