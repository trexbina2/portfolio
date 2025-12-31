// Main JavaScript for Portfolio Website
// Handles all interactive components and animations

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTypewriter();
    initializeSkillsRadar();
    initializeProjectCarousel();
    initializeStatsCounters();
    initializeScrollReveal();
    initializeMobileMenu();
    initializeParticles();
});

// Initialize all animations
function initializeAnimations() {
    // Animate navigation on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
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
}

// Initialize typewriter effect
function initializeTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Developer',
            'Engineer',
            'Problem Solver',
            'Innovator'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Initialize skills radar chart
function initializeSkillsRadar() {
    const chartDom = document.getElementById('skills-radar');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Frontend', max: 100 },
                { name: 'Backend', max: 100 },
                { name: 'Database', max: 100 },
                { name: 'Cloud/DevOps', max: 100 },
                { name: 'Mobile', max: 100 },
                { name: 'UI/UX', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 'bold'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 80, 75, 70],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(37, 99, 235, 0.3)'
                },
                lineStyle: {
                    color: '#2563eb',
                    width: 3
                },
                itemStyle: {
                    color: '#f59e0b',
                    borderColor: '#ffffff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Add hover effects
    myChart.on('mouseover', function(params) {
        if (params.componentType === 'radar') {
            myChart.setOption({
                series: [{
                    data: [{
                        value: [95, 90, 85, 80, 75, 70],
                        areaStyle: {
                            color: 'rgba(37, 99, 235, 0.5)'
                        }
                    }]
                }]
            });
        }
    });
    
    myChart.on('mouseout', function() {
        myChart.setOption({
            series: [{
                data: [{
                    areaStyle: {
                        color: 'rgba(37, 99, 235, 0.3)'
                    }
                }]
            }]
        });
    });
    
    // Responsive resize
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// Initialize project carousel
function initializeProjectCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;
    
    new Splide('#projects-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            768: {
                perPage: 1,
            }
        },
        classes: {
            arrows: 'splide__arrows custom-arrows',
            arrow: 'splide__arrow custom-arrow',
            prev: 'splide__arrow--prev custom-prev',
            next: 'splide__arrow--next custom-next',
        }
    }).mount();
}

// Initialize stats counters
function initializeStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                statsObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700';
                mobileMenu.innerHTML = `
                    <div class="px-6 py-4 space-y-4">
                        <a href="#home" class="block text-white hover:text-blue-400">Home</a>
                        <a href="projects.html" class="block text-white hover:text-blue-400">Projects</a>
                        <a href="skills.html" class="block text-white hover:text-blue-400">Skills</a>
                        <a href="contact.html" class="block text-white hover:text-blue-400">Contact</a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            
            // Toggle menu visibility
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
        });
    }
}

// Initialize particle system
function initializeParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particleContainer.appendChild(canvas);
    
    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = particleContainer.offsetWidth;
        canvas.height = particleContainer.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth transitions for page navigation
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Console easter egg
console.log(`
👋 Hello, fellow developer!

Welcome to my portfolio codebase.
Built with modern web technologies:
- HTML5 & CSS3
- JavaScript ES6+
- Tailwind CSS
- Various animation libraries

Feel free to explore the code!
- Alex Chen
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}