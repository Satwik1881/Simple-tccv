/* ==========================================================================
   THE CALVARY CHURCH VIJAYAWADA - CORE JS APPLICATION
   Cinematic Church Platform Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');
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

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    initTheme();

    /* ==========================================================================
       2. MOBILE NAVIGATION MENU & HEADER SCROLL
       ========================================================================== */
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // Header scroll background adjustments
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. CINEMATIC HERO CAROUSEL CONTROLLER
       ========================================================================== */
    const initHeroCarousel = () => {
        const heroSection = document.getElementById('hero');
        const heroSlides = document.querySelectorAll('.hero-slide');
        const prevBtn = document.getElementById('hero-prev-btn');
        const nextBtn = document.getElementById('hero-next-btn');
        const indicators = document.querySelectorAll('.hero-indicator');

        if (!heroSlides || heroSlides.length === 0) return;

        let currentHeroIndex = 0;
        let heroTimer = null;
        const totalSlides = heroSlides.length;
        const slideDuration = 6500; // 6.5s per slide

        const showHeroSlide = (index) => {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentHeroIndex = index;

            heroSlides.forEach((slide, idx) => {
                const isActive = idx === currentHeroIndex;
                slide.classList.toggle('active', isActive);

                // Re-trigger Ken Burns animation
                if (isActive) {
                    const bg = slide.querySelector('.hero-slide-bg');
                    if (bg) {
                        bg.style.animation = 'none';
                        // Trigger reflow
                        void bg.offsetWidth;
                        bg.style.animation = '';
                    }
                }
            });

            // Update indicators
            indicators.forEach((indicator, idx) => {
                indicator.classList.toggle('active', idx === currentHeroIndex);
            });
        };

        const nextHeroSlide = () => {
            showHeroSlide(currentHeroIndex + 1);
        };

        const prevHeroSlide = () => {
            showHeroSlide(currentHeroIndex - 1);
        };

        const startHeroAutoplay = () => {
            stopHeroAutoplay();
            heroTimer = setInterval(nextHeroSlide, slideDuration);
        };

        const stopHeroAutoplay = () => {
            if (heroTimer) {
                clearInterval(heroTimer);
                heroTimer = null;
            }
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextHeroSlide();
                startHeroAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevHeroSlide();
                startHeroAutoplay();
            });
        }

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                showHeroSlide(idx);
                startHeroAutoplay();
            });
        });

        // Pause on hover
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopHeroAutoplay);
            heroSection.addEventListener('mouseleave', startHeroAutoplay);

            // Touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            heroSection.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            heroSection.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleHeroSwipe();
            }, { passive: true });

            const handleHeroSwipe = () => {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 50) {
                    if (diff < 0) {
                        nextHeroSlide();
                    } else {
                        prevHeroSlide();
                    }
                    startHeroAutoplay();
                }
            };
        }

        // Initialize hero
        showHeroSlide(0);
        startHeroAutoplay();
    };

    initHeroCarousel();

    /* ==========================================================================
       4. REUSABLE CARD CAROUSEL SYSTEM (.c-carousel-wrapper)
       ========================================================================== */
    const initCardCarousels = () => {
        const carouselWrappers = document.querySelectorAll('.c-carousel-wrapper');

        carouselWrappers.forEach((wrapper) => {
            const track = wrapper.querySelector('.c-carousel-track');
            const prevBtn = wrapper.querySelector('.c-nav-btn.prev-btn');
            const nextBtn = wrapper.querySelector('.c-nav-btn.next-btn');
            const dotsContainer = wrapper.querySelector('.c-dots');

            if (!track) return;

            const cards = Array.from(track.children);
            if (cards.length === 0) return;

            let currentIndex = 0;
            let touchStartX = 0;
            let touchEndX = 0;

            const getVisibleCount = () => {
                if (window.innerWidth <= 640) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            };

            const getMaxIndex = () => {
                const visible = getVisibleCount();
                return Math.max(0, cards.length - visible);
            };

            const updateDots = () => {
                if (!dotsContainer) return;
                dotsContainer.innerHTML = '';
                const maxIdx = getMaxIndex();
                for (let i = 0; i <= maxIdx; i++) {
                    const dot = document.createElement('span');
                    dot.className = `c-dot ${i === currentIndex ? 'active' : ''}`;
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        updateCarousel();
                    });
                    dotsContainer.appendChild(dot);
                }
            };

            const updateCarousel = () => {
                const maxIdx = getMaxIndex();
                if (currentIndex > maxIdx) currentIndex = maxIdx;
                if (currentIndex < 0) currentIndex = 0;

                const cardWidth = cards[0].getBoundingClientRect().width;
                const gap = 24; // matches CSS gap
                const shift = currentIndex * (cardWidth + gap);

                track.style.transform = `translateX(-${shift}px)`;

                if (prevBtn) prevBtn.disabled = currentIndex === 0;
                if (nextBtn) nextBtn.disabled = currentIndex >= maxIdx;

                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.c-dot');
                    dots.forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));
                }
            };

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < getMaxIndex()) {
                        currentIndex++;
                        updateCarousel();
                    }
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                });
            }

            // Touch Swipe
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 40) {
                    if (diff < 0 && currentIndex < getMaxIndex()) {
                        currentIndex++;
                    } else if (diff > 0 && currentIndex > 0) {
                        currentIndex--;
                    }
                    updateCarousel();
                }
            }, { passive: true });

            window.addEventListener('resize', () => {
                updateDots();
                updateCarousel();
            });

            updateDots();
            updateCarousel();
        });
    };

    initCardCarousels();

    /* ==========================================================================
       5. HOLY COMMUNION LEGACY CAROUSEL CONTROLLER
       ========================================================================== */
    const initCommunionCarousel = () => {
        const track = document.getElementById('communion-carousel-track');
        const prevBtn = document.getElementById('communion-prev');
        const nextBtn = document.getElementById('communion-next');
        const indicatorsContainer = document.getElementById('communion-indicators');

        if (!track || !prevBtn || !nextBtn || !indicatorsContainer) return;

        const slides = Array.from(track.children);
        const indicators = Array.from(indicatorsContainer.children);
        let currentIndex = 0;
        let autoplayTimer = null;
        const totalSlides = slides.length;

        const updateCarousel = (index) => {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentIndex = index;

            track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

            indicators.forEach((indicator, idx) => {
                indicator.classList.toggle('active', idx === currentIndex);
            });
        };

        const showNext = () => updateCarousel(currentIndex + 1);
        const showPrev = () => updateCarousel(currentIndex - 1);

        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer = setInterval(showNext, 4000);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) clearInterval(autoplayTimer);
        };

        nextBtn.addEventListener('click', () => {
            showNext();
            startAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            showPrev();
            startAutoplay();
        });

        indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => {
                updateCarousel(idx);
                startAutoplay();
            });
        });

        const container = track.closest('.carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoplay);
            container.addEventListener('mouseleave', startAutoplay);
        }

        updateCarousel(0);
        startAutoplay();
    };

    initCommunionCarousel();

    /* ==========================================================================
       6. DUAL-BRANCH SUNDAY SERVICE COUNTDOWN TIMER
       ========================================================================== */
    const initCountdown = () => {
        let activeBranch = 'vja'; // Default: Vijayawada
        let countdownInterval = null;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const btnBranchVja = document.getElementById('btn-branch-vja');
        const btnBranchGnt = document.getElementById('btn-branch-gnt');
        const countdownBranchLabel = document.getElementById('countdown-branch-label');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const getNextSundayService = () => {
            const now = new Date();
            const nextSunday = new Date();

            const currentDay = now.getDay();
            let daysUntilSunday = (7 - currentDay) % 7;

            // Vijayawada: 10:00 AM | Guntur: 06:00 AM
            const targetHour = activeBranch === 'vja' ? 10 : 6;
            nextSunday.setHours(targetHour, 0, 0, 0);

            if (daysUntilSunday === 0) {
                if (now.getTime() > nextSunday.getTime()) {
                    daysUntilSunday = 7;
                }
            }

            nextSunday.setDate(now.getDate() + daysUntilSunday);
            return nextSunday.getTime();
        };

        const updateTimer = () => {
            const targetTime = getNextSundayService();
            const now = new Date().getTime();
            const diff = targetTime - now;

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        if (btnBranchVja && btnBranchGnt) {
            btnBranchVja.addEventListener('click', () => {
                if (activeBranch === 'vja') return;
                activeBranch = 'vja';
                btnBranchVja.classList.add('active');
                btnBranchGnt.classList.remove('active');
                if (countdownBranchLabel) countdownBranchLabel.textContent = 'VIJAYAWADA';
                updateTimer();
                showToast('Swapped to Vijayawada Service (10:00 AM)', 'fa-church');
            });

            btnBranchGnt.addEventListener('click', () => {
                if (activeBranch === 'gnt') return;
                activeBranch = 'gnt';
                btnBranchGnt.classList.add('active');
                btnBranchVja.classList.remove('active');
                if (countdownBranchLabel) countdownBranchLabel.textContent = 'GUNTUR';
                updateTimer();
                showToast('Swapped to Guntur Service (06:00 AM)', 'fa-church');
            });
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    };

    initCountdown();

    /* ==========================================================================
       7. VIDEO PLAYER MODAL (YOUTUBE EMBED)
       ========================================================================== */
    const initVideoModal = () => {
        let modal = document.getElementById('sermon-video-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'sermon-video-modal';
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-dialog">
                    <div class="video-modal-header">
                        <h4 class="video-modal-title" id="video-modal-title">Watch Sermon</h4>
                        <button class="video-modal-close" id="video-modal-close-btn" aria-label="Close video player">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div class="video-modal-body">
                        <iframe id="video-modal-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const iframe = document.getElementById('video-modal-iframe');
        const titleEl = document.getElementById('video-modal-title');
        const closeBtn = document.getElementById('video-modal-close-btn');

        const openVideoModal = (youtubeId, title) => {
            if (!iframe) return;
            iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
            if (titleEl) titleEl.textContent = title || 'Watch Sermon';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeVideoModal = () => {
            modal.classList.remove('active');
            if (iframe) iframe.src = '';
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeVideoModal();
            }
        });

        // Delegate click for any element with data-youtube-id
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-youtube-id]');
            if (trigger) {
                e.preventDefault();
                const videoId = trigger.getAttribute('data-youtube-id');
                const title = trigger.getAttribute('data-video-title') || trigger.querySelector('.sermon-title')?.textContent;
                openVideoModal(videoId, title);
            }
        });
    };

    initVideoModal();

    /* ==========================================================================
       8. FULLSCREEN PHOTO GALLERY LIGHTBOX
       ========================================================================== */
    const initLightbox = () => {
        let lightbox = document.getElementById('gallery-lightbox-modal');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'gallery-lightbox-modal';
            lightbox.className = 'lightbox-modal';
            lightbox.innerHTML = `
                <button class="lightbox-close-btn" id="lightbox-close-btn" aria-label="Close full view">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button class="lightbox-nav-btn lightbox-prev" id="lightbox-prev-btn" aria-label="Previous photo">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="lightbox-nav-btn lightbox-next" id="lightbox-next-btn" aria-label="Next photo">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="lightbox-content">
                    <img id="lightbox-active-img" class="lightbox-image" src="" alt="Church Memory">
                </div>
                <div class="lightbox-caption-box">
                    <h4 class="lightbox-caption-title" id="lightbox-caption-title"></h4>
                    <p class="lightbox-caption-desc" id="lightbox-caption-desc"></p>
                </div>
            `;
            document.body.appendChild(lightbox);
        }

        const activeImg = document.getElementById('lightbox-active-img');
        const captionTitle = document.getElementById('lightbox-caption-title');
        const captionDesc = document.getElementById('lightbox-caption-desc');
        const closeBtn = document.getElementById('lightbox-close-btn');
        const prevBtn = document.getElementById('lightbox-prev-btn');
        const nextBtn = document.getElementById('lightbox-next-btn');

        let galleryItems = [];
        let currentPhotoIndex = 0;

        const updateLightboxPhoto = (index) => {
            if (galleryItems.length === 0) return;
            if (index < 0) index = galleryItems.length - 1;
            if (index >= galleryItems.length) index = 0;
            currentPhotoIndex = index;

            const item = galleryItems[currentPhotoIndex];
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title') || img?.getAttribute('alt') || 'Church Memory';
            const desc = item.getAttribute('data-desc') || '';

            if (activeImg && img) {
                activeImg.src = img.src;
                activeImg.alt = title;
            }
            if (captionTitle) captionTitle.textContent = title;
            if (captionDesc) captionDesc.textContent = desc;
        };

        const openLightbox = (startIndex) => {
            galleryItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]), .lightbox-trigger'));
            if (galleryItems.length === 0) return;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateLightboxPhoto(startIndex);
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', () => updateLightboxPhoto(currentPhotoIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => updateLightboxPhoto(currentPhotoIndex + 1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') updateLightboxPhoto(currentPhotoIndex - 1);
            if (e.key === 'ArrowRight') updateLightboxPhoto(currentPhotoIndex + 1);
        });

        // Bind clicks on gallery items
        document.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item, .lightbox-trigger');
            if (item) {
                e.preventDefault();
                galleryItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]), .lightbox-trigger'));
                const idx = galleryItems.indexOf(item);
                openLightbox(idx >= 0 ? idx : 0);
            }
        });
    };

    initLightbox();

    /* ==========================================================================
       9. GALLERY CATEGORY FILTERING
       ========================================================================== */
    const initGalleryFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length === 0 || galleryItems.length === 0) return;

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter') || 'all';

                galleryItems.forEach((item) => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.4s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    };

    initGalleryFilters();

    /* ==========================================================================
       10. EVENT CALENDAR ICS EXPORT GENERATOR
       ========================================================================== */
    const initCalendarExport = () => {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.event-cal-btn');
            if (!btn) return;

            e.preventDefault();
            const title = btn.getAttribute('data-title') || 'Church Service - The Calvary Church';
            const location = btn.getAttribute('data-location') || 'Swarnas Convention, Vijayawada';
            const description = btn.getAttribute('data-desc') || 'Sunday Worship Service led by Pastor N. Michael Paul.';
            const timeStr = btn.getAttribute('data-time') || '10:00';

            const now = new Date();
            const nextSunday = new Date();
            const daysUntilSunday = (7 - now.getDay()) % 7;
            nextSunday.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));

            const [hours, mins] = timeStr.split(':').map(Number);
            nextSunday.setHours(hours || 10, mins || 0, 0);

            const endSunday = new Date(nextSunday.getTime() + 2 * 60 * 60 * 1000);

            const formatICSDate = (d) => {
                return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
            };

            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//The Calvary Church Vijayawada//EN',
                'BEGIN:VEVENT',
                `SUMMARY:${title}`,
                `DESCRIPTION:${description}`,
                `LOCATION:${location}`,
                `DTSTART:${formatICSDate(nextSunday)}`,
                `DTEND:${formatICSDate(endSunday)}`,
                'STATUS:CONFIRMED',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Calendar event downloaded! Add it to your schedule.', 'fa-calendar-check');
        });
    };

    initCalendarExport();

    /* ==========================================================================
       11. FIREBASE CLOUD FIRESTORE & PRAYER REQUEST SUBMISSION
       ========================================================================== */
    const firebaseConfig = {
        apiKey: "AIzaSyBrwxl_qOCrmlgmR6_MF2fusHVIYXX5ft4",
        authDomain: "the-calvary-church-f8917.firebaseapp.com",
        projectId: "the-calvary-church-f8917",
        storageBucket: "the-calvary-church-f8917.firebasestorage.app",
        messagingSenderId: "320866691778",
        appId: "1:320866691778:web:84b7099f48adde392b695b",
        measurementId: "G-JKNSQGVKFY"
    };

    let db = null;
    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log('Firebase Cloud Firestore initialized successfully.');
        }
    } catch (err) {
        console.warn('Firebase initialization notice:', err);
    }

    const prayerForm = document.getElementById('prayer-form');

    if (prayerForm) {
        prayerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = prayerForm.querySelector('.touch-submit-btn, button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'SUBMIT';

            const name = document.getElementById('form-name')?.value.trim() || 'Anonymous';
            const email = document.getElementById('form-email')?.value.trim() || '';
            const phone = document.getElementById('form-phone')?.value.trim() || '';
            const age = document.getElementById('form-age')?.value.trim() || '';
            const state = document.getElementById('form-state')?.value || '';
            const city = document.getElementById('form-city')?.value.trim() || '';
            const subject = document.getElementById('form-subject')?.value.trim() || '';
            const type = document.getElementById('form-type')?.value || 'Prayer Request';
            const message = document.getElementById('form-message')?.value.trim() || '';

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

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SUBMITTING...';
            }

            // 1. Save to Firebase Firestore
            if (db) {
                try {
                    await db.collection('prayer_requests').add({
                        ...submission,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                } catch (firebaseErr) {
                    console.error('Firebase save error:', firebaseErr);
                }
            }

            // 2. Backup to LocalStorage
            try {
                const existing = JSON.parse(localStorage.getItem('tccv-submissions')) || [];
                existing.unshift(submission);
                localStorage.setItem('tccv-submissions', JSON.stringify(existing));
            } catch (storageErr) {
                console.warn('LocalStorage notice:', storageErr);
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }

            let successMessage = 'Thank you! Your prayer request has been received. Standing with you in faith!';
            let icon = 'fa-hands-praying';

            if (type === 'Testimony') {
                successMessage = 'Praise the Lord! Your testimony has been received with joy!';
                icon = 'fa-star';
            } else if (type === 'Healing') {
                successMessage = 'We are believing God with you for complete healing and restoration!';
                icon = 'fa-heart-pulse';
            }

            showToast(successMessage, icon);
            prayerForm.reset();
        });
    }

    /* ==========================================================================
       12. TOAST NOTIFICATION UTILITY
       ========================================================================== */
    window.showToast = function(message, iconClass = 'fa-check') {
        const container = document.getElementById('toast-container') || createToastContainer();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toast-fade-in 0.4s ease reverse forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    };

    function createToastContainer() {
        const c = document.createElement('div');
        c.id = 'toast-container';
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
    }

    /* ==========================================================================
       13. INTERSECTION OBSERVER (SCROLL ANIMATIONS)
       ========================================================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => observer.observe(el));
});
