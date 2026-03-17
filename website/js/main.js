// ==================== VIBE CODING TUTORIAL - ENHANCED INTERACTIONS ====================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();

    // Initialize navbar
    initNavbar();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize back to top button
    initBackToTop();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize code interactions
    initCodeInteractions();

    // Initialize page progress (for content pages)
    if (document.querySelector('.content-section')) {
        initPageProgress();
    }

    // Log welcome message
    console.log('%c🚀 Vibe Coding Tutorial', 'font-size: 24px; font-weight: bold; color: #00f5ff; text-shadow: 0 0 10px #00f5ff;');
    console.log('%cWelcome to the future of coding!', 'font-size: 14px; color: #bf00ff;');
});

// ==================== LOADING SCREEN ====================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just a hash
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
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

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// ==================== CODE INTERACTIONS ====================
function initCodeInteractions() {
    // Code blocks click to select
    document.querySelectorAll('.code-content').forEach(block => {
        block.addEventListener('click', function() {
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            showToast('代码已选中，按 Ctrl+C 复制');
        });

        // Add hover cursor hint
        block.style.cursor = 'pointer';
        block.title = '点击选中代码';
    });
}

// ==================== PAGE PROGRESS BAR ====================
function initPageProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'page-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: linear-gradient(135deg, #00f5ff 0%, #bf00ff 100%);
        color: #0a0a0f;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 245, 255, 0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration}ms forwards;
    `;

    // Add animation keyframes
    if (!document.getElementById('toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration + 300);
}

// ==================== HERO TYPING EFFECT (Optional Enhancement) ====================
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let index = 0;
    const typingSpeed = 100;

    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// Uncomment to enable typing effect
// initTypingEffect();

// ==================== PARTICLE EFFECT (Optional Visual Enhancement) ====================
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #00f5ff, #bf00ff);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 9999;
        animation: particleFade 1s ease forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
}

// Add particle effect on click (optional)
document.addEventListener('click', (e) => {
    // Create multiple particles
    for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        createParticle(e.clientX + offsetX, e.clientY + offsetY);
    }
});

// Add particle animation keyframes
if (!document.getElementById('particle-animations')) {
    const style = document.createElement('style');
    style.id = 'particle-animations';
    style.textContent = `
        @keyframes particleFade {
            0% {
                transform: scale(1) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(0) translate(var(--tx, 20px), var(--ty, -20px));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== DYNAMIC CURSOR (Optional Enhancement) ====================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00f5ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease, border-color 0.2s ease;
        mix-blend-mode: difference;
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hover effects
    document.querySelectorAll('a, button, .btn, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ff00ff';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00f5ff';
        });
    });
}

// Uncomment to enable custom cursor (may not work on all devices)
// initCustomCursor();

// ==================== GLITCH EFFECT (Optional Enhancement) ====================
function addGlitchEffect(element) {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iteration = 0;
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }

        iteration += 1 / 3;
    }, 30);
}

// Apply glitch effect to hero title on hover
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        addGlitchEffect(heroTitle);
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based operations here
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==================== EASTER EGG ====================
// Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    showToast('🎮 你发现了秘密彩蛋！', 3000);

    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

console.log('%c💡 提示：试试输入 Konami Code！', 'font-size: 12px; color: #6b6b80;');
