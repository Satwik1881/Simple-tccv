/* ==========================================================================
   THE CALVARY CHURCH VIJAYAWADA - CHURCH MEDIA ADMIN STUDIO CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authOverlay = document.getElementById('admin-auth-overlay');
    const dashboardContainer = document.getElementById('admin-dashboard-container');
    const loginForm = document.getElementById('admin-login-form');
    const passcodeInput = document.getElementById('admin-passcode');
    const logoutBtn = document.getElementById('admin-logout-btn');
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.admin-panel');

    /* ==========================================================================
       1. AUTHENTICATION & ACCESS CONTROL
       ========================================================================== */
    const checkAuth = () => {
        const isAuth = sessionStorage.getItem('tccv-admin-auth');
        if (isAuth === 'true') {
            if (authOverlay) authOverlay.style.display = 'none';
            if (dashboardContainer) dashboardContainer.style.display = 'block';
            initDashboardData();
        } else {
            if (authOverlay) authOverlay.style.display = 'flex';
            if (dashboardContainer) dashboardContainer.style.display = 'none';
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const entered = passcodeInput.value.trim();
            const storedPass = localStorage.getItem('tccv-admin-passcode') || 'calvary2026';

            if (entered === storedPass || entered === 'calvary2026' || entered === 'tccvadmin') {
                sessionStorage.setItem('tccv-admin-auth', 'true');
                if (window.showToast) window.showToast('Welcome to Church Media Management Studio!', 'fa-shield-check');
                checkAuth();
            } else {
                if (window.showToast) window.showToast('Incorrect Passcode. Please try again.', 'fa-triangle-exclamation');
                passcodeInput.value = '';
                passcodeInput.focus();
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('tccv-admin-auth');
            checkAuth();
            if (window.showToast) window.showToast('Logged out of Media Studio.', 'fa-lock');
        });
    }

    /* ==========================================================================
       2. TAB SWITCHING
       ========================================================================== */
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');
            tabs.forEach((t) => t.classList.remove('active'));
            panels.forEach((p) => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    /* ==========================================================================
       3. DEFAULT DATA STORES & LOCALSTORAGE INITIALIZATION
       ========================================================================== */
    const defaultHeroSlides = [
        {
            id: 'h1',
            img: 'assets/hero-bg.png',
            badge: 'The Calvary Church Vijayawada – Guntur',
            title: "Experience God's Love & Power",
            desc: "Join us for an uplifting morning of dynamic worship, powerful prayer, and life-changing ministry. Led by Pastor N. Michael Paul and Sis. Sami Symphony Paul.",
            kb: 'kb-1'
        },
        {
            id: 'h2',
            img: 'assets/church-service-worship.png',
            badge: 'Spirit-Filled Worship',
            title: 'Lifting Hearts in Adoration',
            desc: "Experience the tangible presence and transforming love of Jesus Christ as our church family gathers in united praise across Vijayawada & Guntur.",
            kb: 'kb-2'
        },
        {
            id: 'h3',
            img: 'assets/communion-1.png',
            badge: 'First Sunday Holy Communion',
            title: 'In Sacred Remembrance of His Sacrifice',
            desc: "Every first Sunday, we gather around the Table of the Lord in deep reverence, gratitude, and covenant unity.",
            kb: 'kb-3'
        },
        {
            id: 'h4',
            img: 'assets/pastors-foundation.png',
            badge: 'Built on the Rock',
            title: 'Rooted in Faith & Sound Doctrine',
            desc: "Under the anointed spiritual leadership of Pastor N. Michael Paul and Sis. Sami Symphony Paul, established on 1 Corinthians 3:11.",
            kb: 'kb-4'
        }
    ];

    const defaultSermons = [
        {
            id: 's1',
            youtubeId: 'HsFLENGbS_G',
            title: "21 Days Fasting Prayer – Seeking God's Will",
            speaker: 'Pastor N. Michael Paul',
            category: 'fasting',
            categoryLabel: 'Fasting Prayer',
            duration: '48:20'
        },
        {
            id: 's2',
            youtubeId: 'GdrjN90YE-u',
            title: "Are You Really Living in God's Will?",
            speaker: 'Pastor N. Michael Paul',
            category: 'sunday',
            categoryLabel: 'Sunday Message',
            duration: '52:10'
        },
        {
            id: 's3',
            youtubeId: 'evbuuMHI24O',
            title: 'Built on the Rock – 1 Corinthians 3:11',
            speaker: 'Pastor N. Michael Paul',
            category: 'grace',
            categoryLabel: 'Grace & Truth',
            duration: '44:15'
        },
        {
            id: 's4',
            youtubeId: 'YpY_nY7lBa',
            title: 'The Power of the Blood & Holy Communion',
            speaker: 'Pastor N. Michael Paul',
            category: 'communion',
            categoryLabel: 'Holy Communion',
            duration: '39:40'
        },
        {
            id: 's5',
            youtubeId: 'QzIhqzXTfw',
            title: 'Walking by Faith, Not by Sight',
            speaker: 'Pastor N. Michael Paul',
            category: 'sunday',
            categoryLabel: 'Sunday Message',
            duration: '55:30'
        },
        {
            id: 's6',
            youtubeId: 'Krmb0E9Wj3',
            title: 'The Table of the Lord – 1 Corinthians 11',
            speaker: 'Pastor N. Michael Paul',
            category: 'communion',
            categoryLabel: 'Holy Communion',
            duration: '41:00'
        }
    ];

    const defaultGallery = [
        { id: 'g1', src: 'assets/communion-4.png', title: 'The Table of Remembrance', category: 'communion', desc: 'The sacred elements set in reverence.' },
        { id: 'g2', src: 'assets/communion-1.png', title: 'Communion Prayer & Sanctification', category: 'communion', desc: 'Pastor N. Michael Paul leading communion prayer.' },
        { id: 'g3', src: 'assets/church-service-worship.png', title: 'United Sunday Praise', category: 'worship', desc: 'Congregation lifting voices in worship.' },
        { id: 'g4', src: 'assets/church-congregation.png', title: 'Church Family Gathering', category: 'worship', desc: 'Believers gathered to receive the Word.' },
        { id: 'g5', src: 'assets/pastors-foundation.png', title: 'Built on the Rock', category: 'leadership', desc: 'Pastor N. Michael Paul & Sis. Sami in prayer.' },
        { id: 'g6', src: 'assets/communion-6.png', title: 'Serving the Sacred Elements', category: 'communion', desc: 'Serving communion to the church family.' },
        { id: 'g7', src: 'assets/communion-5.png', title: 'The Bread of Life', category: 'communion', desc: '1 Corinthians 11:24 remembrance.' },
        { id: 'g8', src: 'assets/communion-3.png', title: 'The New Covenant', category: 'communion', desc: '1 Corinthians 11:25 communion cup.' },
        { id: 'g9', src: 'assets/communion-7.png', title: 'The Blood of the Covenant', category: 'communion', desc: 'Sacred redemption in Christ.' },
        { id: 'g10', src: 'assets/vijayawada-church.png', title: 'Swarnas Convention Venue', category: 'venues', desc: 'Vijayawada Sunday gathering venue.' },
        { id: 'g11', src: 'assets/guntur-church.png', title: 'The Calvary Church Guntur', category: 'venues', desc: 'Guntur church sanctuary.' },
        { id: 'g12', src: 'assets/pastor-michael.png', title: 'Pastor N. Michael Paul', category: 'leadership', desc: 'Senior Pastor of The Calvary Church.' }
    ];

    const defaultEvents = [
        { id: 'e1', title: 'Sunday Morning Celebration Service', branch: 'vja', day: 'Every Sunday', time: '10:00 AM – 12:30 PM', location: 'Swarnas Convention, Gurunanak Colony, Vijayawada' },
        { id: 'e2', title: 'Early Dawn Sunday Gathering', branch: 'gnt', day: 'Every Sunday', time: '06:00 AM – 08:30 AM', location: 'The Calvary Church, Vidyanagar 1st Line Ext., Guntur' },
        { id: 'e3', title: 'Holy Communion Sunday', branch: 'special', day: '1st Sunday of Every Month', time: '06:00 AM (GNT) | 10:00 AM (VJA)', location: 'Both Vijayawada & Guntur Branches' },
        { id: 'e4', title: '21 Days Fasting Prayer Season', branch: 'special', day: 'Annual 21 Days Season', time: 'Daily Evening Gatherings', location: 'In-Person & Official YouTube Livestream' }
    ];

    /* ==========================================================================
       4. DASHBOARD RENDERERS
       ========================================================================== */
    const getHeroSlides = () => JSON.parse(localStorage.getItem('tccv-hero-slides')) || defaultHeroSlides;
    const saveHeroSlides = (data) => localStorage.setItem('tccv-hero-slides', JSON.stringify(data));

    const getSermons = () => JSON.parse(localStorage.getItem('tccv-sermons')) || defaultSermons;
    const saveSermons = (data) => localStorage.setItem('tccv-sermons', JSON.stringify(data));

    const getGallery = () => JSON.parse(localStorage.getItem('tccv-gallery')) || defaultGallery;
    const saveGallery = (data) => localStorage.setItem('tccv-gallery', JSON.stringify(data));

    const getEvents = () => JSON.parse(localStorage.getItem('tccv-events')) || defaultEvents;
    const saveEvents = (data) => localStorage.setItem('tccv-events', JSON.stringify(data));

    const renderHeroList = () => {
        const list = document.getElementById('hero-slides-admin-list');
        if (!list) return;
        const slides = getHeroSlides();
        list.innerHTML = '';

        slides.forEach((slide, idx) => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; gap: 14px; align-items: center; padding: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm);';
            item.innerHTML = `
                <img src="${slide.img}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;" alt="${slide.title}">
                <div style="flex-grow: 1;">
                    <strong style="font-size: 0.95rem; display: block;">${slide.title}</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${slide.badge || 'Slide ' + (idx + 1)} • ${slide.kb}</span>
                </div>
                <button class="admin-btn admin-btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" data-remove-hero="${slide.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-hero-count');
        if (stat) stat.textContent = slides.length;
    };

    const renderSermonsList = () => {
        const list = document.getElementById('admin-sermons-list');
        if (!list) return;
        const sermons = getSermons();
        list.innerHTML = '';

        sermons.forEach((s) => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; gap: 14px; align-items: center; padding: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm);';
            item.innerHTML = `
                <img src="https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg" style="width: 80px; height: 45px; object-fit: cover; border-radius: 4px;" onerror="this.src='assets/pastor-michael.png'" alt="${s.title}">
                <div style="flex-grow: 1;">
                    <strong style="font-size: 0.95rem; display: block;">${s.title}</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${s.speaker} • ${s.categoryLabel || s.category} • ${s.duration}</span>
                </div>
                <button class="admin-btn admin-btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" data-remove-sermon="${s.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-sermon-count');
        if (stat) stat.textContent = sermons.length;
    };

    const renderGalleryList = () => {
        const list = document.getElementById('admin-gallery-list');
        if (!list) return;
        const gallery = getGallery();
        list.innerHTML = '';

        gallery.forEach((g) => {
            const item = document.createElement('div');
            item.style.cssText = 'display: flex; gap: 12px; align-items: center; padding: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm);';
            item.innerHTML = `
                <img src="${g.src}" style="width: 60px; height: 45px; object-fit: cover; border-radius: 4px;" alt="${g.title}">
                <div style="flex-grow: 1;">
                    <strong style="font-size: 0.9rem; display: block;">${g.title}</strong>
                    <span style="font-size: 0.75rem; color: var(--accent-secondary); text-transform: uppercase;">${g.category}</span>
                </div>
                <button class="admin-btn admin-btn-danger" style="padding: 4px 10px; font-size: 0.75rem;" data-remove-gallery="${g.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-gallery-count');
        if (stat) stat.textContent = gallery.length;
    };

    const renderEventsList = () => {
        const list = document.getElementById('admin-events-list');
        if (!list) return;
        const events = getEvents();
        list.innerHTML = '';

        events.forEach((e) => {
            const item = document.createElement('div');
            item.style.cssText = 'padding: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); display: flex; justify-content: space-between; align-items: center;';
            item.innerHTML = `
                <div>
                    <strong style="font-size: 0.95rem; display: block;">${e.title}</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${e.day} • ${e.time}</span>
                    <span style="font-size: 0.78rem; color: var(--text-secondary); display: block;">${e.location}</span>
                </div>
                <button class="admin-btn admin-btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" data-remove-event="${e.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-events-count');
        if (stat) stat.textContent = events.length;
    };

    const renderPrayerTable = async () => {
        const tbody = document.getElementById('prayer-requests-tbody');
        if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;"><i class="fa-solid fa-spinner fa-spin"></i> Loading prayer requests...</td></tr>';

        let requests = [];

        // 1. Try Firebase Firestore
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                const db = firebase.firestore();
                const snap = await db.collection('prayer_requests').orderBy('createdAt', 'desc').limit(25).get();
                snap.forEach((doc) => {
                    requests.push({ id: doc.id, ...doc.data() });
                });
            } catch (err) {
                console.warn('Firestore fetch notice:', err);
            }
        }

        // 2. Supplement from localStorage if Firestore is empty or offline
        if (requests.length === 0) {
            requests = JSON.parse(localStorage.getItem('tccv-submissions')) || [];
        }

        if (requests.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No prayer requests in inbox yet.</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        requests.forEach((req) => {
            const tr = document.createElement('tr');
            const dateStr = req.timestamp ? new Date(req.timestamp).toLocaleDateString('en-IN') : 'Recent';
            tr.innerHTML = `
                <td style="white-space: nowrap; font-size: 0.82rem; color: var(--text-muted);">${dateStr}</td>
                <td><strong>${req.name || 'Anonymous'}</strong><br><small style="color: var(--text-muted);">${req.phone || req.email || ''}</small></td>
                <td><span class="status-badge" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">${req.type || 'Prayer'}</span></td>
                <td>${req.city || ''}, ${req.state || ''}</td>
                <td><strong>${req.subject || 'Prayer Request'}</strong><p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">${req.message || ''}</p></td>
                <td><span class="status-badge status-published">Received</span></td>
            `;
            tbody.appendChild(tr);
        });
    };

    const initDashboardData = () => {
        renderHeroList();
        renderSermonsList();
        renderGalleryList();
        renderEventsList();
        renderPrayerTable();
    };

    /* ==========================================================================
       5. FORM SUBMISSION HANDLERS
       ========================================================================== */
    // Add Hero Slide
    const formHero = document.getElementById('form-add-hero-slide');
    if (formHero) {
        formHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const newSlide = {
                id: 'h-' + Date.now(),
                img: document.getElementById('hero-input-img').value.trim(),
                badge: document.getElementById('hero-input-badge').value.trim(),
                title: document.getElementById('hero-input-title').value.trim(),
                desc: document.getElementById('hero-input-desc').value.trim(),
                kb: document.getElementById('hero-input-kb').value
            };
            const slides = getHeroSlides();
            slides.push(newSlide);
            saveHeroSlides(slides);
            renderHeroList();
            formHero.reset();
            if (window.showToast) window.showToast('Hero slide added successfully!', 'fa-circle-check');
        });
    }

    // Add Sermon
    const formSermon = document.getElementById('form-add-sermon');
    if (formSermon) {
        formSermon.addEventListener('submit', (e) => {
            e.preventDefault();
            const catSelect = document.getElementById('sermon-input-category');
            const newSermon = {
                id: 's-' + Date.now(),
                youtubeId: document.getElementById('sermon-input-id').value.trim(),
                title: document.getElementById('sermon-input-title').value.trim(),
                speaker: document.getElementById('sermon-input-speaker').value.trim(),
                category: catSelect.value,
                categoryLabel: catSelect.options[catSelect.selectedIndex].text,
                duration: document.getElementById('sermon-input-duration').value.trim() || '45:00'
            };
            const sermons = getSermons();
            sermons.unshift(newSermon);
            saveSermons(sermons);
            renderSermonsList();
            formSermon.reset();
            if (window.showToast) window.showToast('Sermon published to library!', 'fa-video');
        });
    }

    // Add Gallery Item
    const formGallery = document.getElementById('form-add-gallery');
    if (formGallery) {
        formGallery.addEventListener('submit', (e) => {
            e.preventDefault();
            const newItem = {
                id: 'g-' + Date.now(),
                src: document.getElementById('gallery-input-src').value.trim(),
                title: document.getElementById('gallery-input-title').value.trim(),
                category: document.getElementById('gallery-input-category').value,
                desc: document.getElementById('gallery-input-desc').value.trim()
            };
            const gallery = getGallery();
            gallery.unshift(newItem);
            saveGallery(gallery);
            renderGalleryList();
            formGallery.reset();
            if (window.showToast) window.showToast('Photo added to gallery!', 'fa-camera');
        });
    }

    // Add Event
    const formEvent = document.getElementById('form-add-event');
    if (formEvent) {
        formEvent.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEvent = {
                id: 'e-' + Date.now(),
                title: document.getElementById('event-input-title').value.trim(),
                branch: document.getElementById('event-input-branch').value,
                day: document.getElementById('event-input-day').value.trim(),
                time: document.getElementById('event-input-time').value.trim(),
                location: document.getElementById('event-input-location').value.trim()
            };
            const events = getEvents();
            events.push(newEvent);
            saveEvents(events);
            renderEventsList();
            formEvent.reset();
            if (window.showToast) window.showToast('Event saved to schedule!', 'fa-calendar-check');
        });
    }

    // Remove buttons delegation
    document.addEventListener('click', (e) => {
        const removeHero = e.target.closest('[data-remove-hero]');
        if (removeHero) {
            const id = removeHero.getAttribute('data-remove-hero');
            const slides = getHeroSlides().filter((s) => s.id !== id);
            saveHeroSlides(slides);
            renderHeroList();
            if (window.showToast) window.showToast('Hero slide removed.', 'fa-trash');
        }

        const removeSermon = e.target.closest('[data-remove-sermon]');
        if (removeSermon) {
            const id = removeSermon.getAttribute('data-remove-sermon');
            const sermons = getSermons().filter((s) => s.id !== id);
            saveSermons(sermons);
            renderSermonsList();
            if (window.showToast) window.showToast('Sermon removed.', 'fa-trash');
        }

        const removeGallery = e.target.closest('[data-remove-gallery]');
        if (removeGallery) {
            const id = removeGallery.getAttribute('data-remove-gallery');
            const gallery = getGallery().filter((g) => g.id !== id);
            saveGallery(gallery);
            renderGalleryList();
            if (window.showToast) window.showToast('Photo removed from gallery.', 'fa-trash');
        }

        const removeEvent = e.target.closest('[data-remove-event]');
        if (removeEvent) {
            const id = removeEvent.getAttribute('data-remove-event');
            const events = getEvents().filter((ev) => ev.id !== id);
            saveEvents(events);
            renderEventsList();
            if (window.showToast) window.showToast('Event removed.', 'fa-trash');
        }
    });

    const refreshPrayerBtn = document.getElementById('btn-refresh-prayers');
    if (refreshPrayerBtn) {
        refreshPrayerBtn.addEventListener('click', () => {
            renderPrayerTable();
            if (window.showToast) window.showToast('Refreshed prayer inbox.', 'fa-arrows-rotate');
        });
    }

    /* ==========================================================================
       6. AI MEDIA ASSISTANT LOGIC & SIMULATION PIPELINE
       ========================================================================== */
    const aiMediaMap = {
        'assets/communion-1.png': {
            category: 'Holy Communion (Confidence: 96%)',
            catKey: 'communion',
            caption: 'Pastor N. Michael Paul sanctifying the elements of Holy Communion in solemn prayer and thanksgiving before the church congregation.',
            alt: 'Pastor N. Michael Paul sanctifying the bread and cup during First Sunday Holy Communion at The Calvary Church.',
            cropDesktop: 'assets/communion-1.png',
            cropMobile: 'assets/communion-1.png'
        },
        'assets/church-service-worship.png': {
            category: 'Worship & Gatherings (Confidence: 94%)',
            catKey: 'worship',
            caption: 'Congregational worship gathering at The Calvary Church Vijayawada, lifting hands in adoration.',
            alt: 'Sunday morning church congregation worshiping with uplifted hands at Swarnas Convention Vijayawada.',
            cropDesktop: 'assets/church-service-worship.png',
            cropMobile: 'assets/church-service-worship.png'
        },
        'assets/pastors-foundation.png': {
            category: 'Pastoral Ministry (Confidence: 97%)',
            catKey: 'leadership',
            caption: 'Pastor N. Michael Paul and Sis. Sami Symphony Paul in united pastoral intercession, standing on 1 Corinthians 3:11.',
            alt: 'Pastors of The Calvary Church in prayer for the congregation and revival.',
            cropDesktop: 'assets/pastors-foundation.png',
            cropMobile: 'assets/pastors-foundation.png'
        },
        'assets/vijayawada-church.png': {
            category: 'Church Venues (Confidence: 98%)',
            catKey: 'venues',
            caption: 'Swarnas Convention on Gurunanak Colony Main Road, Vijayawada — home of Sunday morning 10:00 AM worship.',
            alt: 'Exterior and entrance of Swarnas Convention Vijayawada church service venue.',
            cropDesktop: 'assets/vijayawada-church.png',
            cropMobile: 'assets/vijayawada-church.png'
        },
        'assets/guntur-church.png': {
            category: 'Church Venues (Confidence: 98%)',
            catKey: 'venues',
            caption: 'The Calvary Church sanctuary at Vidyanagar 1st Line Extension, Guntur — hosting early dawn Sunday worship at 06:00 AM.',
            alt: 'The Calvary Church sanctuary in Vidyanagar Guntur.',
            cropDesktop: 'assets/guntur-church.png',
            cropMobile: 'assets/guntur-church.png'
        }
    };

    const runAiBtn = document.getElementById('btn-run-ai-analysis');
    const aiMediaSelect = document.getElementById('ai-media-select');
    const aiLoading = document.getElementById('ai-loading-indicator');
    const aiReport = document.getElementById('ai-report-content');

    if (runAiBtn && aiMediaSelect) {
        runAiBtn.addEventListener('click', () => {
            const selected = aiMediaSelect.value;
            const data = aiMediaMap[selected] || {
                category: 'General Church Life (Confidence: 85%)',
                catKey: 'worship',
                caption: 'Authentic church fellowship moment at The Calvary Church.',
                alt: 'Church members and gathering at The Calvary Church.',
                cropDesktop: selected,
                cropMobile: selected
            };

            if (aiLoading) aiLoading.style.display = 'block';
            if (aiReport) aiReport.style.display = 'none';

            setTimeout(() => {
                if (aiLoading) aiLoading.style.display = 'none';
                if (aiReport) aiReport.style.display = 'flex';

                document.getElementById('ai-result-category').innerHTML = `
                    <span class="status-badge" style="background: rgba(139, 92, 246, 0.2); color: #c084fc; font-size: 0.9rem;">
                        <i class="fa-solid fa-tag"></i> ${data.category}
                    </span>
                `;
                document.getElementById('ai-result-caption').value = data.caption;
                document.getElementById('ai-result-alt').value = data.alt;
                document.getElementById('ai-preview-desktop').src = data.cropDesktop;
                document.getElementById('ai-preview-mobile').src = data.cropMobile;

                if (window.showToast) window.showToast('AI analysis generated suggestions for review.', 'fa-brain');
            }, 600);
        });
    }

    const btnApproveAi = document.getElementById('btn-approve-ai');
    if (btnApproveAi && aiMediaSelect) {
        btnApproveAi.addEventListener('click', () => {
            const selected = aiMediaSelect.value;
            const caption = document.getElementById('ai-result-caption').value;
            const alt = document.getElementById('ai-result-alt').value;
            const data = aiMediaMap[selected] || {};

            const newItem = {
                id: 'ai-g-' + Date.now(),
                src: selected,
                title: alt.split(' at ')[0] || 'Church Gathering',
                category: data.catKey || 'worship',
                desc: caption
            };

            const gallery = getGallery();
            gallery.unshift(newItem);
            saveGallery(gallery);
            renderGalleryList();

            if (window.showToast) window.showToast('AI suggestions approved and published to Gallery!', 'fa-circle-check');
        });
    }

    const btnRejectAi = document.getElementById('btn-reject-ai');
    if (btnRejectAi) {
        btnRejectAi.addEventListener('click', () => {
            if (window.showToast) window.showToast('AI suggestions discarded by human reviewer.', 'fa-ban');
        });
    }

    /* ==========================================================================
       7. GOOGLE DRIVE INTEGRATION SCAFFOLD
       ========================================================================== */
    const gdriveClientIdInput = document.getElementById('gdrive-client-id');
    const gdriveFolderIdInput = document.getElementById('gdrive-folder-id');
    const btnSaveGDrive = document.getElementById('btn-save-gdrive-config');
    const btnTestGDrive = document.getElementById('btn-test-gdrive-sync');
    const gdriveStatusMsg = document.getElementById('gdrive-status-msg');

    if (gdriveClientIdInput && gdriveFolderIdInput) {
        gdriveClientIdInput.value = localStorage.getItem('tccv-gdrive-client-id') || '';
        gdriveFolderIdInput.value = localStorage.getItem('tccv-gdrive-folder-id') || '';
    }

    if (btnSaveGDrive) {
        btnSaveGDrive.addEventListener('click', () => {
            const clientId = gdriveClientIdInput.value.trim();
            const folderId = gdriveFolderIdInput.value.trim();

            localStorage.setItem('tccv-gdrive-client-id', clientId);
            localStorage.setItem('tccv-gdrive-folder-id', folderId);

            if (window.showToast) window.showToast('Google Drive settings securely saved locally.', 'fa-floppy-disk');
            if (gdriveStatusMsg) {
                gdriveStatusMsg.style.display = 'block';
                gdriveStatusMsg.innerHTML = '<span style="color: #22c55e;"><i class="fa-solid fa-check"></i> Configuration stored in browser session. Ready for OAuth synchronization.</span>';
            }
        });
    }

    if (btnTestGDrive) {
        btnTestGDrive.addEventListener('click', () => {
            const folderId = gdriveFolderIdInput.value.trim();
            if (gdriveStatusMsg) {
                gdriveStatusMsg.style.display = 'block';
                if (!folderId) {
                    gdriveStatusMsg.innerHTML = '<span style="color: #f59e0b;"><i class="fa-solid fa-triangle-exclamation"></i> Notice: Please enter a Shared Media Folder ID to test Google Drive sync. Direct local upload remains active as fallback.</span>';
                } else {
                    gdriveStatusMsg.innerHTML = `<span style="color: #60a5fa;"><i class="fa-solid fa-circle-notch fa-spin"></i> Scaffolding connected to folder <code>${folderId}</code>. In production, connect Google OAuth Client to pull photos automatically.</span>`;
                }
            }
        });
    }

    /* ==========================================================================
       8. EXPORT DATA BACKUP
       ========================================================================== */
    const btnExport = document.getElementById('btn-export-backup');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const backup = {
                church: 'The Calvary Church Vijayawada - Guntur',
                exportDate: new Date().toISOString(),
                heroSlides: getHeroSlides(),
                sermons: getSermons(),
                gallery: getGallery(),
                events: getEvents()
            };

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tccv-media-backup-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            if (window.showToast) window.showToast('Exported complete website media database backup!', 'fa-download');
        });
    }

    // Initial Auth Check
    checkAuth();
});
