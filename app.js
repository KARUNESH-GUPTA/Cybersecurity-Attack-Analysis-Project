// Cybersecurity Hub - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initSkillBars();
    initContactForm();
    initBinaryRain();
    initThreatMap();
    initNewsSlider();
    initParticleEffects();
    initGlitchEffects();
    initRealTimeClock();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navigation
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 15, 28, 0.98)';
                nav.style.backdropFilter = 'blur(15px)';
            } else {
                nav.style.background = 'rgba(10, 15, 28, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    // Typing animation for subtitle - FIXED
    const subtitle = document.getElementById('hero-subtitle');
    const text = "Protecting the Future | Real-Time Insights | Dark Web Defense";
    
    if (subtitle) {
        // Start typing immediately
        setTimeout(() => {
            typeWriter(subtitle, text, 80);
        }, 500);
    }

    // Cyber shield animation
    const cyberShield = document.querySelector('.cyber-shield');
    if (cyberShield) {
        cyberShield.style.transition = 'transform 0.3s ease-out';
        setInterval(() => {
            cyberShield.style.transform = 'scale(1.1) rotate(180deg)';
            setTimeout(() => {
                cyberShield.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 3000);
    }
}

// Typewriter effect - FIXED
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.minHeight = '30px'; // Prevent layout shift
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor after completion
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    // Add cursor blinking animation if not already added
    if (!document.querySelector('#cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.textContent = `
            .cursor {
                animation: blink 1s infinite;
                color: var(--color-primary);
                font-weight: bold;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    type(); // Start immediately
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animations for dashboard stats
                if (entry.target.classList.contains('dashboard-section')) {
                    setTimeout(animateCounters, 200);
                }
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('profile-section')) {
                    setTimeout(animateSkillBars, 300);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Observe cards and elements
    const cards = document.querySelectorAll('.research-card, .blog-card, .alert-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Counter animations
function initCounterAnimations() {
    // Make function globally available
    window.animateCounters = animateCounters;
}

function animateCounters() {
    const counters = [
        { id: 'global-attacks', target: 2847592, duration: 2000 },
        { id: 'blocked-threats', target: 1923847, duration: 2000 },
        { id: 'active-connections', target: 45892, duration: 1500 }
    ];

    counters.forEach(counter => {
        animateCounter(counter.id, counter.target, counter.duration);
    });
}

function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = formatNumber(Math.floor(current));
    }, 16);
}

function formatNumber(num) {
    return num.toLocaleString();
}

// Skill bars animation
function initSkillBars() {
    window.animateSkillBars = animateSkillBars;
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s ease-out';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }, index * 200);
    });
}

// Contact form handling - FIXED
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('.form-input');

    // Add focus/blur effects to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (!this.value) {
                this.style.borderColor = 'var(--color-border)';
                this.style.boxShadow = 'none';
            }
        });

        // Typing effect
        input.addEventListener('input', function() {
            const glow = this.parentElement.querySelector('.input-glow');
            if (glow) {
                glow.style.opacity = '1';
                clearTimeout(this.glowTimeout);
                this.glowTimeout = setTimeout(() => {
                    glow.style.opacity = '0';
                }, 1000);
            }
        });
    });

    // Form submission - FIXED
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[placeholder="Name"]');
            const emailInput = this.querySelector('input[placeholder="Email"]');
            const subjectInput = this.querySelector('input[placeholder="Subject"]');
            const messageInput = this.querySelector('textarea[placeholder="Message"]');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Submit animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = 'rgba(0, 255, 153, 0.2)';
                submitBtn.style.borderColor = 'var(--color-tertiary)';
                submitBtn.style.color = 'var(--color-tertiary)';
                submitBtn.style.opacity = '1';
                
                // Reset form
                this.reset();
                
                // Reset inputs styling
                inputs.forEach(input => {
                    input.style.borderColor = 'var(--color-border)';
                    input.style.boxShadow = 'none';
                });
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                }, 3000);
                
                showNotification('Message sent successfully! Karunesh will get back to you soon.', 'success');
            }, 2000);
        });
    }
}

// Notification system - Enhanced
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: var(--color-surface);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    
    if (type === 'error') {
        notification.style.borderColor = '#ff4444';
        notification.style.background = 'rgba(255, 68, 68, 0.15)';
        notification.style.color = '#ff6b6b';
        notification.style.boxShadow = '0 0 20px rgba(255, 68, 68, 0.3)';
    } else if (type === 'success') {
        notification.style.borderColor = 'var(--color-tertiary)';
        notification.style.background = 'rgba(0, 255, 153, 0.15)';
        notification.style.color = 'var(--color-tertiary)';
        notification.style.boxShadow = '0 0 20px rgba(0, 255, 153, 0.3)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Binary rain animation
function initBinaryRain() {
    const binaryRain = document.getElementById('binary-rain');
    if (!binaryRain) return;

    const characters = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${i * 20}px;
            color: var(--color-primary);
            font-family: var(--font-family-mono);
            font-size: 14px;
            line-height: 20px;
            animation: binary-fall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0.6;
        `;
        
        // Add random binary characters
        for (let j = 0; j < 20; j++) {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.marginBottom = '2px';
            column.appendChild(char);
        }
        
        binaryRain.appendChild(column);
    }
    
    // Add CSS animation for falling effect
    if (!document.querySelector('#binary-rain-style')) {
        const style = document.createElement('style');
        style.id = 'binary-rain-style';
        style.textContent = `
            @keyframes binary-fall {
                from { transform: translateY(-100px); opacity: 0; }
                10% { opacity: 0.6; }
                90% { opacity: 0.6; }
                to { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Threat map animations
function initThreatMap() {
    const threatPoints = document.querySelectorAll('.threat-point');
    const threatLines = document.querySelectorAll('.threat-line');
    
    // Randomize threat point appearances
    setInterval(() => {
        threatPoints.forEach(point => {
            const shouldShow = Math.random() > 0.3;
            point.style.opacity = shouldShow ? '1' : '0.3';
            point.style.transform = shouldShow ? 'scale(1.2)' : 'scale(1)';
        });
    }, 2000);
    
    // Animate threat lines
    setInterval(() => {
        threatLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'pulse-line 1s ease-out';
                setTimeout(() => {
                    line.style.opacity = '0.3';
                }, 1000);
            }, index * 200);
        });
    }, 4000);
}

// News ticker animation
function initNewsSlider() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;
    
    const newsItems = [
        "🚨 Major ransomware group dismantled by international law enforcement",
        "🤖 New AI-powered threat detection system reduces false positives by 90%",
        "🔐 Quantum-resistant encryption standards approved by NIST",
        "⚠️ Critical vulnerability discovered in widely-used IoT devices",
        "📊 Cybersecurity workforce shortage reaches 3.5 million globally",
        "🔍 Zero-day exploit discovered in popular web browser",
        "🌐 Nation-state actors target critical infrastructure worldwide",
        "🦠 New malware strain bypasses traditional antivirus solutions"
    ];
    
    // Create scrolling effect
    tickerContent.innerHTML = '';
    
    newsItems.forEach(news => {
        const span = document.createElement('span');
        span.textContent = news;
        span.style.display = 'block';
        span.style.marginBottom = '16px';
        span.style.paddingBottom = '8px';
        span.style.borderBottom = '1px solid rgba(0, 255, 255, 0.1)';
        tickerContent.appendChild(span);
    });
    
    // Duplicate content for seamless loop
    newsItems.forEach(news => {
        const span = document.createElement('span');
        span.textContent = news;
        span.style.display = 'block';
        span.style.marginBottom = '16px';
        span.style.paddingBottom = '8px';
        span.style.borderBottom = '1px solid rgba(0, 255, 255, 0.1)';
        tickerContent.appendChild(span);
    });
}

// Particle effects
function initParticleEffects() {
    const particlesBg = document.querySelector('.particles-bg');
    if (!particlesBg) return;
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
        createParticle(particlesBg);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const colors = ['#00FFFF', '#9D4EDD', '#00FF99'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 6px ${color};
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
            createParticle(container); // Create new particle
        }
    }, 20000);
}

// Glitch effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch-text 0.3s linear';
            }, 10);
        }, Math.random() * 5000 + 3000);
    });
}

// Real-time clock for dashboard
function initRealTimeClock() {
    const clockElement = document.createElement('div');
    clockElement.id = 'real-time-clock';
    clockElement.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: var(--color-primary);
        padding: 8px 16px;
        border-radius: 6px;
        font-family: var(--font-family-mono);
        font-size: 12px;
        border: 1px solid var(--color-border);
        z-index: 999;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
    `;
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            timeZone: 'Asia/Kolkata'
        });
        const dateString = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
        clockElement.innerHTML = `<div style="font-size: 10px; opacity: 0.7;">${dateString}</div><div>${timeString} IST</div>`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
    
    document.body.appendChild(clockElement);
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Make scrollToSection globally available for button clicks
window.scrollToSection = scrollToSection;

// Add CSS for floating particles and enhancements
const enhancementStyles = document.createElement('style');
enhancementStyles.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-10px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .research-card, .blog-card {
        transform-style: preserve-3d;
    }
    
    .research-card:hover, .blog-card:hover {
        transform: translateY(-8px) rotateX(2deg);
    }
    
    .nav-link.active {
        color: var(--color-primary) !important;
        text-shadow: 0 0 10px var(--color-primary);
    }
    
    .nav-link.active:after {
        width: 100% !important;
        box-shadow: 0 0 10px var(--color-primary);
    }
    
    .skill-progress {
        position: relative;
        overflow: visible;
    }
    
    .skill-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        filter: blur(4px);
        opacity: 0.3;
        z-index: -1;
    }
    
    .neon-btn:active {
        transform: translateY(-1px) scale(0.98);
    }
    
    @media (max-width: 768px) {
        #real-time-clock {
            top: 20px !important;
            right: 20px !important;
            font-size: 10px !important;
            padding: 6px 12px !important;
        }
    }
`;
document.head.appendChild(enhancementStyles);

// Enhanced scroll effects with active navigation
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Update navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= (sectionTop - 200)) {
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

// Add keyboard shortcuts for better UX
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                scrollToSection('hero');
                break;
            case '2':
                e.preventDefault();
                scrollToSection('profile');
                break;
            case '3':
                e.preventDefault();
                scrollToSection('dashboard');
                break;
            case '4':
                e.preventDefault();
                scrollToSection('research');
                break;
            case '5':
                e.preventDefault();
                scrollToSection('knowledge');
                break;
            case '6':
                e.preventDefault();
                scrollToSection('contact');
                break;
        }
    }
});

// Preload and optimize performance
function preloadResources() {
    const links = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap'
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
preloadResources();

// Add loading state management
document.addEventListener('DOMContentLoaded', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Trigger initial animations after short delay
    setTimeout(() => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
    }, 100);
});

console.log('🚀 Cybersecurity Hub initialized successfully!');