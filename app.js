/* ==========================================================================
   THE CALVARY CHURCH VIJAYAWADA - CORE JS APPLICATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');
    
    // Toast notification container
    const toastContainer = document.getElementById('toast-container');

    /* ==========================================================================
       1. THEME TOGGLE & PERSISTENCE
       ========================================================================== */
    const initTheme = () => {
        const savedTheme = localStorage.getItem('tccv-theme') || 'dark';
        if (savedTheme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        } else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        }
    };

    const toggleTheme = () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('tccv-theme', 'light');
            showToast('Switched to Light Mode', 'fa-sun');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('tccv-theme', 'dark');
            showToast('Switched to Dark Mode', 'fa-moon');
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    initTheme();

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU
       ========================================================================== */
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // Header scroll background adjustments
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveNavOnScroll();
    });

    /* ==========================================================================
       3. INFINITE SUNDAY SERVICE COUNTDOWN TIMER WITH BRANCH TOGGLE
       ========================================================================== */
    let activeBranch = 'vja'; // Default: Vijayawada
    let countdownInterval = null;

    const getNextSundayService = () => {
        const now = new Date();
        const nextSunday = new Date();
        
        // Calculate days until next Sunday
        const currentDay = now.getDay();
        let daysUntilSunday = (7 - currentDay) % 7;
        
        // Determine service hour based on active branch
        // Vijayawada is 10:00 AM, Guntur is 06:00 AM
        const targetHour = activeBranch === 'vja' ? 10 : 6;
        nextSunday.setHours(targetHour, 0, 0, 0);
        
        // If it is Sunday today
        if (daysUntilSunday === 0) {
            // If it is after the service hour, target next Sunday
            if (now.getTime() > nextSunday.getTime()) {
                daysUntilSunday = 7;
            }
        }
        
        nextSunday.setDate(now.getDate() + daysUntilSunday);
        return nextSunday.getTime();
    };

    const startCountdown = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        const targetTime = getNextSundayService();
        
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                // Refresh countdown calculation for the next week
                clearInterval(countdownInterval);
                startCountdown();
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Bind values to UI elements
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        }, 1000);
    };

    // Branch Switcher Tab Event Listeners
    const btnBranchVja = document.getElementById('btn-branch-vja');
    const btnBranchGnt = document.getElementById('btn-branch-gnt');
    const countdownBranchLabel = document.getElementById('countdown-branch-label');

    if (btnBranchVja && btnBranchGnt) {
        btnBranchVja.addEventListener('click', () => {
            if (activeBranch === 'vja') return;
            activeBranch = 'vja';
            btnBranchVja.classList.add('active');
            btnBranchGnt.classList.remove('active');
            countdownBranchLabel.textContent = 'VIJAYAWADA';
            startCountdown();
            showToast('Swapped to Vijayawada Service (10:00 AM)', 'fa-church');
        });

        btnBranchGnt.addEventListener('click', () => {
            if (activeBranch === 'gnt') return;
            activeBranch = 'gnt';
            btnBranchGnt.classList.add('active');
            btnBranchVja.classList.remove('active');
            countdownBranchLabel.textContent = 'GUNTUR';
            startCountdown();
            showToast('Swapped to Guntur Service (06:00 AM)', 'fa-church icon-church-orange');
        });
    }

    startCountdown();

    /* ===================================================================================================================
       4. PRIVATE PRAYER REQUEST & TESTIMONY SUBMISSION FORM
       ========================================================================== */
    const prayerForm = document.getElementById('prayer-form');

    if (prayerForm) {
        prayerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value.trim() || 'Anonymous';
            const email = document.getElementById('form-email').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const age = document.getElementById('form-age').value.trim();
            const state = document.getElementById('form-state').value;
            const city = document.getElementById('form-city').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const type = document.getElementById('form-type').value;
            const message = document.getElementById('form-message').value.trim();

            const submission = {
                id: 'sub-' + Date.now(),
                name,
                email,
                phone,
                age,
                state,
                city,
                subject,
                type,
                message,
                timestamp: new Date().toISOString()
            };

            // Retrieve existing submissions or initialize
            const existingSubmissions = JSON.parse(localStorage.getItem('tccv-submissions')) || [];
            existingSubmissions.unshift(submission);
            localStorage.setItem('tccv-submissions', JSON.stringify(existingSubmissions));

            // Show a personalized success toast message
            let successMessage = 'Thank you! Your prayer request has been received. Standing in agreement!';
            let icon = 'fa-hands-praying';

            if (type === 'Testimony') {
                successMessage = 'Thank you! Your testimony has been received. Praise the Lord!';
                icon = 'fa-star';
            } else if (type === 'Healing') {
                successMessage = 'Thank you! Your healing request has been received. Praying for your recovery!';
                icon = 'fa-heart-pulse';
            }

            showToast(successMessage, icon);
            prayerForm.reset();
        });
    }

    /* ==========================================================================
       5. HELPER UTILITIES
       ========================================================================== */
    // Toast Notification System
    function showToast(message, iconClass = 'fa-check') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;
        toastContainer.appendChild(toast);

        // Remove toast after duration
        setTimeout(() => {
            toast.style.animation = 'toast-fade-in 0.4s ease reverse forwards';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    }

    // Relative Time Formatter
    function formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days === 1) return 'yesterday';
        return `${days} days ago`;
    }

    // Basic HTML escaping for security
    function escapeHtml(unsafeStr) {
        return unsafeStr
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Scroll Reveal Intersection Observer (Premium visual fade ins)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       HOLY COMMUNION CAROUSEL SYSTEM
       ========================================================================== */
    const track = document.getElementById('communion-carousel-track');
    const prevBtn = document.getElementById('communion-prev');
    const nextBtn = document.getElementById('communion-next');
    const indicatorsContainer = document.getElementById('communion-indicators');
    
    if (track && prevBtn && nextBtn && indicatorsContainer) {
        const slides = Array.from(track.children);
        const indicators = Array.from(indicatorsContainer.children);
        let currentIndex = 0;
        let autoplayTimer = null;
        const totalSlides = slides.length;

        const updateCarousel = (index) => {
            // Constrain index
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentIndex = index;

            // Move the track
            track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

            // Update indicators
            indicators.forEach((indicator, idx) => {
                indicator.classList.toggle('active', idx === currentIndex);
            });
        };

        const showNextSlide = () => {
            updateCarousel(currentIndex + 1);
        };

        const showPrevSlide = () => {
            updateCarousel(currentIndex - 1);
        };

        // Reset and start autoplay timer
        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer = setInterval(showNextSlide, 3000); // 3 seconds interval
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
            }
        };

        // Button Event Listeners
        nextBtn.addEventListener('click', () => {
            showNextSlide();
            startAutoplay(); // Reset autoplay on user action
        });

        prevBtn.addEventListener('click', () => {
            showPrevSlide();
            startAutoplay(); // Reset autoplay on user action
        });

        // Indicator Dot Click Handlers
        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                updateCarousel(idx);
                startAutoplay();
            });
        });

        // Pause autoplay on mouse enter and resume on leave
        const container = track.closest('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoplay);
            container.addEventListener('mouseleave', startAutoplay);
        }

        // Initialize Carousel
        updateCarousel(0);
        startAutoplay();
    }

    /* ==========================================================================
       HERO BACKGROUND SLIDESHOW SYSTEM
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlideIndex = 0;
        setInterval(() => {
            heroSlides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
            heroSlides[currentSlideIndex].classList.add('active');
        }, 5000); // Shift every 5 seconds
    }

    // Dynamic Navigation Active Highlight on scroll
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section, header');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});
