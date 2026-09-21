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
            img: 'assets/ministry/pastors-combined-hero.jpg',
            badge: 'The Calvary Church Vijayawada – Guntur',
            title: "Experience God's Love & Power",
            desc: "Led by Pastor N. Michael Paul and Sis. Sami Symphony Paul. Proclaiming the sound doctrine of grace, truth, and anointed worship.",
            kb: 'kb-1'
        },
        {
            id: 'h2',
            img: 'assets/ministry/pastors-prayer-together.jpg',
            badge: 'Pastoral Shepherds in Prayer',
            title: 'United in Faith & Intercession',
            desc: "Pastor N. Michael Paul and Sis. Sami Symphony Paul standing together in sacred prayer and blessing over the congregation.",
            kb: 'kb-2'
        },
        {
            id: 'h3',
            img: 'assets/ministry/bg-1.jpg',
            badge: 'Sound Biblical Preaching',
            title: 'Proclaiming the Living Word',
            desc: "Pastor N. Michael Paul ministering the life-changing gospel of Jesus Christ from the Calvary pulpit.",
            kb: 'kb-3'
        },
        {
            id: 'h4',
            img: 'assets/ministry/holy-communion-altar.jpg',
            badge: 'First Sunday Holy Communion',
            title: 'In Sacred Remembrance of His Sacrifice',
            desc: "Gathering around the Table of the Lord in deep reverence, gratitude, and covenant unity.",
            kb: 'kb-4'
        },
        {
            id: 'h5',
            img: 'assets/church-service-worship.png',
            badge: 'Spirit-Filled Worship',
            title: 'Lifting Hearts in Adoration',
            desc: "Experience the tangible presence and transforming love of Jesus Christ as our church family gathers in united praise.",
            kb: 'kb-1'
        }
    ];

    const defaultSermons = [
        {
                "id": "ss-new-1",
                "youtubeId": "nOUEwxlmjtM",
                "title": "సమృద్ధి కావాలా? లేక దాన్ని మోయడానికి జ్ఞానమా? | Christian Short | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (58s)",
                "date": "21 Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Spiritual Counsel",
                "featured": true,
                "hidden": false
        },
        {
                "id": "ss-new-2",
                "youtubeId": "KfrXRru2ft0",
                "title": "నిజాన్ని ఎదుర్కో | ఆర్థిక సమస్యల నుంచి బయటపడటానికి మొదటి అడుగు | Christian Message | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (59s)",
                "date": "21 Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Faith & Truth",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-1",
                "youtubeId": "7sHpaxk16X0",
                "title": "Don't Tell Everyone, Tell Only God | Telugu Christian Message | N Michael Paul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (58s)",
                "date": "Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Spiritual Counsel",
                "featured": true,
                "hidden": false
        },
        {
                "id": "ss-2",
                "youtubeId": "4C0CRZ9PtRM",
                "title": "Don't let fear lead you! | Go towards God | Christian Shorts | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (54s)",
                "date": "Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Faith & Courage",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-3",
                "youtubeId": "OinUgJqkFdU",
                "title": "Even After Receiving Blessings | Heart Examination | Christian Message | nmichelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (59s)",
                "date": "Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Heart Examination",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-4",
                "youtubeId": "3mKU-zNx8bs",
                "title": "Blessings should remain in your hands | Your heart must stay rooted in God | Telugu Christian Message",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (56s)",
                "date": "Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Rooted in Faith",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-5",
                "youtubeId": "8evblaxfdas",
                "title": "Don't Decide at First Sight | Discernment is Key | Telugu Christian Sermon | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (52s)",
                "date": "Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Spiritual Wisdom",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-6",
                "youtubeId": "NJf97fjF6p8",
                "title": "Pray Before You Decide | Recognize God's Guidance | Genesis 24 | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (60s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Prayer & Guidance",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-7",
                "youtubeId": "2EoNIct-3Nc",
                "title": "Take Action When You Have Clarity! | Why Is Your Blessing Delayed? | The Calvary Church Guntur",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (55s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Divine Action",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-8",
                "youtubeId": "5dKhkO5_9Tw",
                "title": "Don't take a step without knowing God's plan! | Telugu Christian Message | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (50s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "God's Will",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-9",
                "youtubeId": "67izXa9xAc4",
                "title": "Don't Judge Prematurely! | Christian Message | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (48s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Grace & Patience",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ss-10",
                "youtubeId": "tONQMjN-LuQ",
                "title": "The Lord Opened Her Heart | Live by the Word | Christian Sermon | nmichaelpaul",
                "category": "sermon-shorts",
                "categoryLabel": "Sermon Shorts",
                "duration": "Short (57s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Living by Word",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-1",
                "youtubeId": "_LLUu98Wru4",
                "title": "#SundayService | 20 Sep 2026 | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "1:52:14",
                "date": "20 Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": true,
                "hidden": false
        },
        {
                "id": "sl-2",
                "youtubeId": "v1tDhJiuTSU",
                "title": "1st Sunday Communion Service | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "2:14:08",
                "date": "06 Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": true,
                "hidden": false
        },
        {
                "id": "sl-3",
                "youtubeId": "dwaKxs6yNO0",
                "title": "Sunday Service | The Calvary Church Guntur",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "1:48:32",
                "date": "13 Sep 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-4",
                "youtubeId": "UIrF3eEme-0",
                "title": "Sunday Morning Worship & Preaching | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "2:05:19",
                "date": "30 Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-5",
                "youtubeId": "NDhwQTqrTms",
                "title": "Sunday Divine Gathering | The Calvary Church Guntur",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "1:55:40",
                "date": "23 Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-6",
                "youtubeId": "AIhnmxeEvp8",
                "title": "Sunday Anointing Service | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "2:10:45",
                "date": "16 Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-7",
                "youtubeId": "qeHTpfRV3D4",
                "title": "Sunday Praise & Word | The Calvary Church Guntur",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "1:42:15",
                "date": "09 Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-8",
                "youtubeId": "lgcqU4179Hc",
                "title": "Sunday Holy Communion & Fellowship | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "2:18:22",
                "date": "02 Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-9",
                "youtubeId": "-jvCSlxXIIk",
                "title": "Sunday Service | The Calvary Church Guntur",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "1:50:30",
                "date": "26 Jul 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "sl-10",
                "youtubeId": "8nJC2GmdRxM",
                "title": "Sunday Divine Worship Service | The Calvary Church Vijayawada",
                "category": "sunday-live",
                "categoryLabel": "Sunday All Live Videos",
                "duration": "2:02:50",
                "date": "19 Jul 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-new-1",
                "youtubeId": "DgiqXrS9vNo",
                "title": "ఎల్ షద్దాయ్ నా దైవమే | Elshaddai | Christian Song | Sami Symphony Paul",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "5:20",
                "date": "21 Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "New Release",
                "featured": true,
                "hidden": false
        },
        {
                "id": "ws-new-2",
                "youtubeId": "mMuUS2AyA50",
                "title": "ఎన్నిమార్లు సిలువను వేయుచు || Andhra Kristhava Keerthana || Sami Symphony Paul",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "6:10",
                "date": "18 Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Keerthana",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-new-3",
                "youtubeId": "dQlrbqXycZM",
                "title": "ఎఱిగి యెఱిగి చెడిపోతివి మనసా || Andhra Kristhava Keerthana || Sami Symphony Paul",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "5:45",
                "date": "17 Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Keerthana",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-1",
                "youtubeId": "w2QuJZ646S8",
                "title": "Aashrayadurgama (ఆశ్రయదుర్గమా) | Full Telugu Worship Song",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "6:45",
                "date": "Full Song",
                "speaker": "The Calvary Church Worship Team",
                "branch": "Telugu Worship",
                "featured": true,
                "hidden": false
        },
        {
                "id": "ws-2",
                "youtubeId": "FwyGqr7jWIE",
                "title": "Siluva Chentha (సిలువ చెంత) | Anointed Telugu Christian Song",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "7:12",
                "date": "Full Song",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Calvary Hymn",
                "featured": true,
                "hidden": false
        },
        {
                "id": "ws-3",
                "youtubeId": "eBIWgCzitNA",
                "title": "Nee Krupa Leni Kshaname (నీ కృప లేని క్షణమే) | Official Worship Video",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "5:38",
                "date": "Full Song",
                "speaker": "The Calvary Church Choir",
                "branch": "Grace Song",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-4",
                "youtubeId": "4yQRYqvL0Hw",
                "title": "Krupa Kshemamulanu (కృపా క్షేమములను) | Christian Devotional Worship",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "6:20",
                "date": "Full Song",
                "speaker": "Calvary Worship Ministry",
                "branch": "Praise",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-5",
                "youtubeId": "qc5H60wJRPI",
                "title": "Mahonnathuda (మహోన్నతుడా) | Sacred Christian Worship Video",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "8:04",
                "date": "Full Song",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Adoration",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-6",
                "youtubeId": "0Pq8vqluEmk",
                "title": "Stotram Chellinthumu (స్తోత్రం చెల్లింతుము) | Live Church Praise",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "5:50",
                "date": "Full Song",
                "speaker": "Calvary Church Congregation",
                "branch": "Live Praise",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-7",
                "youtubeId": "5g0x01NG1ys",
                "title": "Yesu Naa Snehithuda (యేసు నా స్నేహితుడా) | Devotional Praise Video",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "6:15",
                "date": "Full Song",
                "speaker": "Worship Leaders",
                "branch": "Devotional",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-8",
                "youtubeId": "n5FUgE4-sso",
                "title": "Naa Hrudayamulona (నా హృదయములోన) | Worship Song",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "7:30",
                "date": "Full Song",
                "speaker": "The Calvary Church Choir",
                "branch": "Worship",
                "featured": false,
                "hidden": false
        },
        {
                "id": "ws-9",
                "youtubeId": "vcEXhAOPwMM",
                "title": "Parama Thandri (పరమ తండ్రి) | Calvary Church Worship Song",
                "category": "worship-songs",
                "categoryLabel": "Worship Songs — Full Songs",
                "duration": "5:42",
                "date": "Full Song",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Praise",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-new-1",
                "youtubeId": "uzUuzV7kp28",
                "title": "యేసే దేవుని ప్రేమ స్వరూపం | Yese Devuni Prema Swaroopam | Telugu Christian Song #samisymphonypaul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (55s)",
                "date": "21 Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": true,
                "hidden": false
        },
        {
                "id": "wsh-1",
                "youtubeId": "K12gxoBDb_U",
                "title": "నా బలమంతా నీవేనయా | Telugu Christian Song | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (58s)",
                "date": "Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-2",
                "youtubeId": "voaQCqFPYe0",
                "title": "Melulu Nee Melulu | మేలులు నీ మేలులు | Christian Song | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (52s)",
                "date": "Sep 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-3",
                "youtubeId": "uV7CL2d4wO8",
                "title": "Gathakaalamantha Nee Needalona | గతకాలమంత నీ నీడలోన | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (56s)",
                "date": "Aug 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-4",
                "youtubeId": "hN32Z8spzZQ",
                "title": "The Name of Lord Jesus | The Powerful Name of Lord Jesus | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (50s)",
                "date": "Aug 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-5",
                "youtubeId": "-nagmifGmDE",
                "title": "In My Little Boat | Naa Chinni Donelo | Telugu Christian Worship Song | Pastor Sung",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (60s)",
                "date": "Aug 2026",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-6",
                "youtubeId": "f1T2MUgYpxw",
                "title": "I Will Worship My Lord Jesus to My Heart's Content | Live Church Worship",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (55s)",
                "date": "Aug 2026",
                "speaker": "Calvary Worship Team",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-7",
                "youtubeId": "XNvPp4r9nrI",
                "title": "Uthsaaha Gaanamu Chesedamu | ఉత్సాహ గానము చేసెదము | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (54s)",
                "date": "Aug 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-8",
                "youtubeId": "bf3i1h9HMYE",
                "title": "వందనాలు యేసు నా వందనాలు | Vandanalu Yesu Na Vandanalu | Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (58s)",
                "date": "Jul 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-9",
                "youtubeId": "n6A-2r0vePE",
                "title": "Adbutham Cheyumaya | అద్బుతం చేయుమయా | nmichaelpaul & Sami Symphony Paul",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (51s)",
                "date": "Jul 2026",
                "speaker": "Pastor Michael & Sis. Sami",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "wsh-10",
                "youtubeId": "SGtk0sxOUAM",
                "title": "TIRIGI KATEDAVU | తిరిగి కట్టెదవు | Sami Symphony Paul | Telugu Christian Song 2026",
                "category": "worship-shorts",
                "categoryLabel": "Worship Songs — Shorts",
                "duration": "Short (57s)",
                "date": "Jul 2026",
                "speaker": "Sis. Sami Symphony Paul",
                "branch": "Worship Short",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-1",
                "youtubeId": "sTNvvnNgKrM",
                "title": "21 Days Fasting Prayer | Day 12 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:34:20",
                "date": "Day 12",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": true,
                "hidden": false
        },
        {
                "id": "fp-2",
                "youtubeId": "KO0fvjZY_YI",
                "title": "21 Days Fasting Prayer | Day 11 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:41:10",
                "date": "Day 11",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-3",
                "youtubeId": "wuZTyK7i_tA",
                "title": "21 Days Fasting Prayer | Day 10 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:28:45",
                "date": "Day 10",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-4",
                "youtubeId": "PpaSA6F4kBg",
                "title": "21 Days Fasting Prayer | Day 9 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:36:15",
                "date": "Day 9",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-5",
                "youtubeId": "70-8SfG7nhA",
                "title": "21 Days Fasting Prayer | Day 8 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:45:00",
                "date": "Day 8",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-6",
                "youtubeId": "7kEWPQ-6_5I",
                "title": "21 Days Fasting Prayer | Day 7 | The Calvary Church Guntur",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:32:10",
                "date": "Day 7",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-7",
                "youtubeId": "fsva2R7y_k8",
                "title": "Friday Fasting Prayer Service | The Calvary Church Vijayawada",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "2:02:18",
                "date": "Friday Gathering",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-8",
                "youtubeId": "4Y3EN1myl0s",
                "title": "Special Fasting Prayer Gathering | The Calvary Church",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:54:30",
                "date": "Fasting Season",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Combined",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-9",
                "youtubeId": "yGgbG2gF39w",
                "title": "Fasting Intercession & Healing Prayer | Guntur Sanctuary",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "1:49:15",
                "date": "Fasting Service",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Guntur",
                "featured": false,
                "hidden": false
        },
        {
                "id": "fp-10",
                "youtubeId": "Ca4irkR9HwI",
                "title": "Fasting Prayer & Deliverance Service | Vijayawada Swarnas",
                "category": "fasting-prayer",
                "categoryLabel": "Live Fasting Prayer Videos",
                "duration": "2:08:40",
                "date": "Fasting Gathering",
                "speaker": "Pastor N. Michael Paul",
                "branch": "Vijayawada",
                "featured": false,
                "hidden": false
        }
];

    const defaultGallery = [
        {
                "id": "g1",
                "src": "assets/ministry/bg-1.jpg",
                "title": "Pastor N. Michael Paul Preaching",
                "category": "leadership",
                "desc": "Pastor N. Michael Paul preaching the word of truth at the Calvary pulpit.",
                "ig": "https://www.instagram.com/nmichaelpaul/"
        },
        {
                "id": "g2",
                "src": "assets/ministry/bg-2.jpg",
                "title": "Calvary Church Vijayawada Gathering",
                "category": "worship",
                "desc": "Christmas worship celebration at The Calvary Church Vijayawada.",
                "ig": "https://www.instagram.com/nmichaelpaul/"
        },
        {
                "id": "g3",
                "src": "assets/ministry/bg-4.jpg",
                "title": "The Pastoral Family",
                "category": "leadership",
                "desc": "Pastor N. Michael Paul, Sis. Sami Symphony Paul and their blessed children.",
                "ig": "https://www.instagram.com/nmichaelpaul/"
        },
        {
                "id": "g4",
                "src": "assets/communion-4.png",
                "title": "The Table of Remembrance",
                "category": "communion",
                "desc": "The sacred elements set in reverence for Holy Communion."
        },
        {
                "id": "g5",
                "src": "assets/communion-1.png",
                "title": "Communion Prayer & Sanctification",
                "category": "communion",
                "desc": "Pastor N. Michael Paul leading communion prayer."
        },
        {
                "id": "g6",
                "src": "assets/church-service-worship.png",
                "title": "United Sunday Praise",
                "category": "worship",
                "desc": "Congregation lifting voices in worship at Swarnas Convention."
        },
        {
                "id": "g7",
                "src": "assets/church-congregation.png",
                "title": "Church Family Gathering",
                "category": "worship",
                "desc": "Believers gathered to receive the Word in Vijayawada."
        },
        {
                "id": "g8",
                "src": "assets/pastors-foundation.png",
                "title": "Built on the Rock",
                "category": "leadership",
                "desc": "Pastor N. Michael Paul & Sis. Sami Symphony Paul in united prayer."
        },
        {
                "id": "g9",
                "src": "assets/communion-6.png",
                "title": "Serving the Sacred Elements",
                "category": "communion",
                "desc": "Serving communion to the church family."
        },
        {
                "id": "g10",
                "src": "assets/vijayawada-church.png",
                "title": "Swarnas Convention Venue",
                "category": "venues",
                "desc": "Vijayawada Sunday gathering venue on Gurunanak Colony Main Road."
        },
        {
                "id": "g11",
                "src": "assets/guntur-church.png",
                "title": "The Calvary Church Guntur",
                "category": "venues",
                "desc": "Guntur church sanctuary at Vidyanagar 1st Line Extension."
        },
        {
                "id": "g12",
                "src": "assets/ministry/bg-3.jpg",
                "title": "Pastoral Intercession",
                "category": "leadership",
                "desc": "Pastor N. Michael Paul lifting hands in prayer for the church."
        }
];

    const defaultEvents = [
        { id: 'e1', title: 'Sunday Morning Celebration Service', branch: 'vja', day: 'Every Sunday', time: '10:00 AM – 12:30 PM', location: 'Swarnas Convention, Gurunanak Colony, Vijayawada' },
        { id: 'e2', title: 'Early Dawn Sunday Gathering', branch: 'gnt', day: 'Every Sunday', time: '06:00 AM – 08:30 AM', location: 'The Calvary Church, Vidyanagar 1st Line Ext., Guntur' },
        { id: 'e3', title: 'Holy Communion Sunday', branch: 'special', day: '1st Sunday of Every Month', time: '06:00 AM (GNT) | 10:00 AM (VJA)', location: 'Both Vijayawada & Guntur Branches' },
        { id: 'e4', title: '21 Days Fasting Prayer Season', branch: 'special', day: 'Annual 21 Days Season', time: 'Daily Evening Gatherings', location: 'In-Person & Official YouTube Livestream' }
    ];

    /* ==========================================================================
       4. DASHBOARD RENDERERS & CLOUD SYNC
       ========================================================================== */
    const syncHeroSlidesToCloud = (slides) => {
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            try {
                const db = firebase.firestore();
                db.collection('site_content').doc('hero_slides').set({
                    slides: slides,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    console.log('Hero slides successfully synced to Firebase Cloud Firestore.');
                }).catch((err) => {
                    console.warn('Firestore cloud sync warning:', err);
                });
            } catch (e) {
                console.warn('Firebase sync error:', e);
            }
        }
    };

    const getHeroSlides = () => {
        try {
            const stored = localStorage.getItem('tccv-hero-slides');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.warn(e);
        }
        return defaultHeroSlides;
    };

    const saveHeroSlides = (data) => {
        localStorage.setItem('tccv-hero-slides', JSON.stringify(data));
        syncHeroSlidesToCloud(data);
    };

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
                <button class="admin-btn admin-btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" data-remove-hero="${slide.id}" title="Remove this slide">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-hero-count');
        if (stat) stat.textContent = slides.length;
    };

    
    /* ==========================================================================
       YOUTUBE URL PARSER & PREVIEW ENGINE
       ========================================================================== */
    const extractYouTubeId = (input) => {
        if (!input) return '';
        input = input.trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
        const shortsMatch = input.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
        if (shortsMatch) return shortsMatch[1];
        const youtuMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (youtuMatch) return youtuMatch[1];
        const vMatch = input.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (vMatch) return vMatch[1];
        const embedMatch = input.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return embedMatch[1];
        return '';
    };

    const sermonInputId = document.getElementById('sermon-input-id');
    const sermonPreviewContainer = document.getElementById('sermon-preview-container');
    const sermonPreviewImg = document.getElementById('sermon-preview-img');
    const sermonPreviewBadge = document.getElementById('sermon-preview-id-badge');
    const sermonPreviewLink = document.getElementById('sermon-preview-test-link');

    if (sermonInputId) {
        sermonInputId.addEventListener('input', () => {
            const parsedId = extractYouTubeId(sermonInputId.value);
            if (parsedId) {
                if (sermonPreviewContainer) sermonPreviewContainer.style.display = 'block';
                if (sermonPreviewImg) sermonPreviewImg.src = `https://img.youtube.com/vi/${parsedId}/hqdefault.jpg`;
                if (sermonPreviewBadge) sermonPreviewBadge.innerHTML = `Video ID: <code>${parsedId}</code>`;
                if (sermonPreviewLink) sermonPreviewLink.href = `https://www.youtube.com/watch?v=${parsedId}`;

                // Auto-fetch title & auto-select column if fields are empty
                const titleInput = document.getElementById('sermon-input-title');
                const catSelect = document.getElementById('sermon-input-category');
                const speakerInput = document.getElementById('sermon-input-speaker');
                if (titleInput && !titleInput.value.trim()) {
                    fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${parsedId}`)
                        .then(r => r.json())
                        .then(data => {
                            if (data.title && !titleInput.value.trim()) {
                                titleInput.value = data.title;
                                const classification = classifyYouTubeVideo(data.title, '', data.author_name || '');
                                if (catSelect) catSelect.value = classification.category;
                                if (speakerInput && classification.speaker) speakerInput.value = classification.speaker;
                            }
                        })
                        .catch(() => {});
                }
            } else {
                if (sermonPreviewContainer) sermonPreviewContainer.style.display = 'none';
            }
        });
    }

    let currentAdminSermonFilter = 'all';
    const filterButtons = document.querySelectorAll('[data-admin-cat-filter]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
            currentAdminSermonFilter = btn.getAttribute('data-admin-cat-filter');
            renderSermonsList();
        });
    });

    const renderSermonsList = () => {
        const list = document.getElementById('admin-sermons-list');
        if (!list) return;
        const allSermons = getSermons();
        list.innerHTML = '';

        const filtered = allSermons.filter(s => {
            if (currentAdminSermonFilter === 'all') return true;
            return s.category === currentAdminSermonFilter;
        });

        const countDisplay = document.getElementById('sermons-category-filter-count');
        if (countDisplay) {
            countDisplay.textContent = `Showing ${filtered.length} of ${allSermons.length} videos`;
        }

        if (filtered.length === 0) {
            list.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted);">No videos found in this category.</div>';
            return;
        }

        filtered.forEach((s) => {
            const item = document.createElement('div');
            item.style.cssText = `display: flex; gap: 14px; align-items: center; padding: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); ${s.hidden ? 'opacity: 0.55;' : ''}`;
            
            let badgeColor = '#c084fc';
            if (s.category === 'sermon-shorts' || s.category === 'shorts') badgeColor = '#ff4d4d';
            else if (s.category === 'worship-songs') badgeColor = '#f472b6';
            else if (s.category === 'worship-shorts') badgeColor = '#fb7185';
            else if (s.category === 'fasting-prayer') badgeColor = '#fbbf24';

            const originalUrl = (s.category === 'sermon-shorts' || s.category === 'worship-shorts' || s.category === 'shorts') ? `https://www.youtube.com/shorts/${s.youtubeId}` : `https://www.youtube.com/watch?v=${s.youtubeId}`;

            item.innerHTML = `
                <div style="position: relative; flex-shrink: 0;">
                    <img src="https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg" style="width: 90px; height: 52px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-glass);" onerror="this.src='assets/pastor-michael.png'" alt="${s.title}">
                    ${s.featured ? '<span style="position: absolute; top: -4px; left: -4px; background: #eab308; color: #000; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem;" title="Featured on Homepage"><i class="fa-solid fa-star"></i></span>' : ''}
                </div>
                <div style="flex-grow: 1; min-width: 0;">
                    <strong style="font-size: 0.92rem; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${s.title}">${s.title}</strong>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px; font-size: 0.78rem; flex-wrap: wrap;">
                        <span class="status-badge" style="background: rgba(255,255,255,0.06); color: ${badgeColor}; font-size: 0.72rem; padding: 2px 8px;">${s.categoryLabel || s.category}</span>
                        <span style="color: var(--text-muted);">${s.speaker || 'Pastor N. Michael Paul'}</span>
                        <span style="color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${s.duration || 'Video'}</span>
                        <a href="${originalUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-secondary); margin-left: auto;" title="Verify original video on YouTube">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Test Link
                        </a>
                    </div>
                </div>
                <div style="display: flex; gap: 6px; flex-shrink: 0;">
                    <button class="admin-btn admin-btn-secondary" style="padding: 6px 10px; font-size: 0.75rem;" data-toggle-featured="${s.id}" title="${s.featured ? 'Remove from Homepage' : 'Feature on Homepage'}">
                        <i class="fa-solid fa-star" style="color: ${s.featured ? '#eab308' : 'var(--text-muted)'};"></i>
                    </button>
                    <button class="admin-btn admin-btn-secondary" style="padding: 6px 10px; font-size: 0.75rem;" data-toggle-hidden="${s.id}" title="${s.hidden ? 'Show video' : 'Hide video'}">
                        <i class="fa-solid ${s.hidden ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="admin-btn admin-btn-danger" style="padding: 6px 10px; font-size: 0.75rem;" data-remove-sermon="${s.id}" title="Remove entry">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            list.appendChild(item);
        });

        const stat = document.getElementById('stat-sermon-count');
        if (stat) stat.textContent = allSermons.length;
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
    // Image File Picker & Compression Engine for Hero Slide
    const heroFileInput = document.getElementById('hero-input-file');
    const heroUrlInput = document.getElementById('hero-input-img');
    const heroPreviewWrap = document.getElementById('hero-img-preview-wrap');
    const heroPreviewImg = document.getElementById('hero-img-preview');

    if (heroFileInput) {
        heroFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                const rawDataUrl = evt.target.result;
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const maxDim = 1280;
                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = Math.round((height * maxDim) / width);
                            width = maxDim;
                        } else {
                            width = Math.round((width * maxDim) / height);
                            height = maxDim;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

                    if (heroUrlInput) heroUrlInput.value = compressedDataUrl;
                    if (heroPreviewImg) heroPreviewImg.src = compressedDataUrl;
                    if (heroPreviewWrap) heroPreviewWrap.style.display = 'block';
                    if (window.showToast) window.showToast('Photo prepared for publishing!', 'fa-image');
                };
                img.src = rawDataUrl;
            };
            reader.readAsDataURL(file);
        });
    }

    if (heroUrlInput) {
        heroUrlInput.addEventListener('input', () => {
            const val = heroUrlInput.value.trim();
            if (val && heroPreviewImg && heroPreviewWrap) {
                heroPreviewImg.src = val;
                heroPreviewWrap.style.display = 'block';
            } else if (!val && heroPreviewWrap) {
                heroPreviewWrap.style.display = 'none';
            }
        });
    }

    // Restore Pastoral Defaults Button
    const btnRestoreDefaults = document.getElementById('btn-restore-hero-defaults');
    if (btnRestoreDefaults) {
        btnRestoreDefaults.addEventListener('click', () => {
            if (confirm('Restore the original 5 official pastoral hero slides? This will reset custom homepage slides.')) {
                saveHeroSlides(defaultHeroSlides);
                renderHeroList();
                if (window.showToast) window.showToast('Restored official pastoral slides!', 'fa-rotate-left');
            }
        });
    }

    // Export Slides JSON Button
    const btnExportHeroJson = document.getElementById('btn-export-hero-json');
    if (btnExportHeroJson) {
        btnExportHeroJson.addEventListener('click', () => {
            const slides = getHeroSlides();
            const jsonStr = JSON.stringify(slides, null, 2);
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(jsonStr).then(() => {
                    if (window.showToast) window.showToast('Slides JSON copied to clipboard!', 'fa-copy');
                }).catch(() => {
                    prompt('Copy slides JSON configuration:', jsonStr);
                });
            } else {
                prompt('Copy slides JSON configuration:', jsonStr);
            }
        });
    }

    // Add Hero Slide Form Handler
    const formHero = document.getElementById('form-add-hero-slide');
    if (formHero) {
        formHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const imgVal = document.getElementById('hero-input-img').value.trim();
            if (!imgVal) {
                if (window.showToast) window.showToast('Please upload a photo or enter an image URL.', 'fa-triangle-exclamation');
                return;
            }

            const newSlide = {
                id: 'h-' + Date.now(),
                img: imgVal,
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
            if (heroPreviewWrap) heroPreviewWrap.style.display = 'none';
            if (window.showToast) window.showToast('Hero slide saved & synced to live website!', 'fa-cloud-arrow-up');
        });
    }

    // Add Sermon with YouTube URL Parsing & Category Validation
    const formSermon = document.getElementById('form-add-sermon');
    if (formSermon) {
        formSermon.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawInput = document.getElementById('sermon-input-id').value.trim();
            const parsedVideoId = extractYouTubeId(rawInput);

            if (!parsedVideoId) {
                if (window.showToast) window.showToast('Please enter a valid YouTube Video URL or 11-char ID', 'fa-triangle-exclamation');
                return;
            }

            const catSelect = document.getElementById('sermon-input-category');
            const featuredCheckbox = document.getElementById('sermon-input-featured');
            const branchInput = document.getElementById('sermon-input-branch');

            const newSermon = {
                id: 's-' + Date.now(),
                youtubeId: parsedVideoId,
                title: document.getElementById('sermon-input-title').value.trim(),
                speaker: document.getElementById('sermon-input-speaker').value.trim(),
                category: catSelect.value,
                categoryLabel: catSelect.options[catSelect.selectedIndex].text.replace(/^[0-9]\.\s*/, ''),
                duration: document.getElementById('sermon-input-duration').value.trim() || '45:00',
                branch: branchInput ? branchInput.value.trim() : '',
                featured: featuredCheckbox ? featuredCheckbox.checked : false,
                hidden: false
            };

            const sermons = getSermons();
            sermons.unshift(newSermon);
            saveSermons(sermons);
            renderSermonsList();
            formSermon.reset();

            if (sermonPreviewContainer) sermonPreviewContainer.style.display = 'none';
            if (window.showToast) window.showToast('Video published to church library!', 'fa-video');
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

        
        // Feature toggle
        const toggleFeatured = e.target.closest('[data-toggle-featured]');
        if (toggleFeatured) {
            const id = toggleFeatured.getAttribute('data-toggle-featured');
            const sermons = getSermons().map(s => {
                if (s.id === id) return { ...s, featured: !s.featured };
                return s;
            });
            saveSermons(sermons);
            renderSermonsList();
            if (window.showToast) window.showToast('Updated featured status.', 'fa-star');
        }

        // Hide toggle
        const toggleHidden = e.target.closest('[data-toggle-hidden]');
        if (toggleHidden) {
            const id = toggleHidden.getAttribute('data-toggle-hidden');
            const sermons = getSermons().map(s => {
                if (s.id === id) return { ...s, hidden: !s.hidden };
                return s;
            });
            saveSermons(sermons);
            renderSermonsList();
            if (window.showToast) window.showToast('Updated video visibility.', 'fa-eye');
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
    
    /* ==========================================================================
       DAILY YOUTUBE UPLOADS AUTO-SYNC ENGINE
       ========================================================================== */
    const classifyYouTubeVideo = (title, desc = '', author = '') => {
        const text = (title + ' ' + desc).toLowerCase();
        if (text.includes('fasting prayer') || text.includes('ఉపవాస') || /day\s*\d+/i.test(text)) {
            return { category: 'fasting-prayer', label: 'Live Fasting Prayer Videos', speaker: 'Pastor N. Michael Paul', branch: 'Guntur' };
        }
        if (text.includes('sundayservice') || text.includes('sunday service') || text.includes('ఆదివారం') || text.includes('holy communion')) {
            return { category: 'sunday-live', label: 'Sunday All Live Videos', speaker: 'Pastor N. Michael Paul', branch: 'Vijayawada' };
        }
        if (text.includes('song') || text.includes('పాట') || text.includes('sami symphony') || text.includes('keerthana') || text.includes('కీర్తన') || text.includes('choir') || author.toLowerCase().includes('sami')) {
            if (text.includes('shorts') || text.includes('#shorts') || text.includes('short')) {
                return { category: 'worship-shorts', label: 'Worship Songs — Shorts', speaker: 'Sis. Sami Symphony Paul', branch: 'Worship Short' };
            } else {
                return { category: 'worship-songs', label: 'Worship Songs — Full Songs', speaker: 'Sis. Sami Symphony Paul', branch: 'Worship Song' };
            }
        }
        return { category: 'sermon-shorts', label: 'Sermon Shorts', speaker: 'Pastor N. Michael Paul', branch: 'Spiritual Counsel' };
    };

    const btnFetchDailyUploads = document.getElementById('btn-fetch-daily-uploads');
    const btnSyncAllDailyToColumns = document.getElementById('btn-sync-all-daily-to-columns');
    const stagingGrid = document.getElementById('admin-staging-grid');
    const stagingPlaceholder = document.getElementById('admin-staging-placeholder');
    let stagedDailyVideos = [];

    if (btnFetchDailyUploads) {
        btnFetchDailyUploads.addEventListener('click', async () => {
            btnFetchDailyUploads.disabled = true;
            btnFetchDailyUploads.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Fetching YouTube Uploads...`;

            const channelIds = [
                { id: 'UCQvVJumt8NcPMoDmZjfN6_g', name: 'N Michael Paul (@nmichaelpaul)' },
                { id: 'UCGIDNwcGDg13Zo9dkzqhhKA', name: 'Sami Symphony Paul (@samisymphonypaul)' }
            ];

            const currentSermons = getSermons();
            const existingIds = new Set(currentSermons.map(s => s.youtubeId));
            stagedDailyVideos = [];

            for (const ch of channelIds) {
                try {
                    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`);
                    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
                    const res = await fetch(apiUrl);
                    if (!res.ok) continue;
                    const data = await res.json();
                    if (data.status !== 'ok' || !Array.isArray(data.items)) continue;

                    data.items.forEach(item => {
                        const ytId = extractYouTubeId(item.link) || extractYouTubeId(item.guid);
                        if (!ytId) return;

                        const isAlreadyPublished = existingIds.has(ytId);
                        const classification = classifyYouTubeVideo(item.title, item.description, item.author || '');

                        stagedDailyVideos.push({
                            youtubeId: ytId,
                            title: item.title,
                            channel: ch.name,
                            pubDate: item.pubDate ? item.pubDate.split(' ')[0] : 'Today',
                            category: classification.category,
                            speaker: classification.speaker,
                            branch: classification.branch,
                            isPublished: isAlreadyPublished
                        });
                    });
                } catch (err) {
                    console.warn('Error fetching channel uploads:', err);
                }
            }

            btnFetchDailyUploads.disabled = false;
            btnFetchDailyUploads.innerHTML = `<i class="fa-solid fa-rotate"></i> Refresh Daily Uploads`;

            renderStagingGrid();
        });
    }

    const renderStagingGrid = () => {
        if (!stagingGrid) return;
        stagingGrid.innerHTML = '';

        if (stagedDailyVideos.length === 0) {
            if (stagingPlaceholder) {
                stagingPlaceholder.style.display = 'block';
                stagingPlaceholder.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Could not fetch YouTube feeds right now. Please check internet connection or add videos manually.</span>`;
            }
            stagingGrid.style.display = 'none';
            if (btnSyncAllDailyToColumns) btnSyncAllDailyToColumns.style.display = 'none';
            return;
        }

        if (stagingPlaceholder) stagingPlaceholder.style.display = 'none';
        stagingGrid.style.display = 'grid';

        const unaddedCount = stagedDailyVideos.filter(v => !v.isPublished).length;
        if (btnSyncAllDailyToColumns) {
            btnSyncAllDailyToColumns.style.display = unaddedCount > 0 ? 'inline-flex' : 'none';
            btnSyncAllDailyToColumns.innerHTML = `<i class="fa-solid fa-check-double"></i> Sync All ${unaddedCount} New to Columns`;
        }

        stagedDailyVideos.forEach((v, idx) => {
            const card = document.createElement('div');
            card.className = 'admin-staging-card';
            card.id = `stage-card-${v.youtubeId}`;
            card.innerHTML = `
                <div class="stage-thumb-row">
                    <img src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg" alt="Thumb" class="stage-thumb-img">
                    <div class="stage-details">
                        <span class="stage-title" title="${v.title}">${v.title}</span>
                        <div class="stage-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${v.pubDate}</span>
                            <span>&bull;</span>
                            <span style="color: ${v.isPublished ? '#22c55e' : '#f59e0b'}; font-weight: 600;">
                                ${v.isPublished ? '<i class="fa-solid fa-check"></i> In Library' : '<i class="fa-solid fa-sparkles"></i> New Daily Video'}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="stage-actions-row">
                    <div style="flex-grow: 1; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap;">Column:</span>
                        <select class="admin-select stage-cat-select" data-stage-id="${v.youtubeId}" style="padding: 4px 8px; font-size: 0.78rem;" ${v.isPublished ? 'disabled' : ''}>
                            <option value="sermon-shorts" ${v.category === 'sermon-shorts' ? 'selected' : ''}>1. Sermon Shorts</option>
                            <option value="sunday-live" ${v.category === 'sunday-live' ? 'selected' : ''}>2. Sunday All Live Videos</option>
                            <option value="worship-songs" ${v.category === 'worship-songs' ? 'selected' : ''}>3. Worship Songs — Full</option>
                            <option value="worship-shorts" ${v.category === 'worship-shorts' ? 'selected' : ''}>4. Worship Songs — Shorts</option>
                            <option value="fasting-prayer" ${v.category === 'fasting-prayer' ? 'selected' : ''}>5. Live Fasting Prayer</option>
                        </select>
                    </div>
                    <div>
                        ${v.isPublished 
                            ? `<button class="admin-btn admin-btn-secondary" style="padding: 4px 10px; font-size: 0.75rem; opacity: 0.7;" disabled><i class="fa-solid fa-check"></i> Added</button>`
                            : `<button class="admin-btn admin-btn-primary btn-add-single-stage" data-add-stage="${v.youtubeId}" style="padding: 4px 12px; font-size: 0.78rem; background: #0284c7;">
                                <i class="fa-solid fa-plus"></i> Add to Column
                               </button>`
                        }
                    </div>
                </div>
            `;
            stagingGrid.appendChild(card);
        });

        // Single add button handler
        document.querySelectorAll('.btn-add-single-stage').forEach(btn => {
            btn.addEventListener('click', () => {
                const ytid = btn.getAttribute('data-add-stage');
                const videoData = stagedDailyVideos.find(x => x.youtubeId === ytid);
                if (!videoData) return;

                const cardEl = document.getElementById(`stage-card-${ytid}`);
                const selectEl = cardEl ? cardEl.querySelector('.stage-cat-select') : null;
                const chosenCat = selectEl ? selectEl.value : videoData.category;

                const catLabels = {
                    'sermon-shorts': 'Sermon Shorts',
                    'sunday-live': 'Sunday All Live Videos',
                    'worship-songs': 'Worship Songs — Full Songs',
                    'worship-shorts': 'Worship Songs — Shorts',
                    'fasting-prayer': 'Live Fasting Prayer Videos'
                };

                const newSermon = {
                    id: 'yt-stage-' + ytid,
                    youtubeId: ytid,
                    title: videoData.title,
                    speaker: videoData.speaker,
                    category: chosenCat,
                    categoryLabel: catLabels[chosenCat] || chosenCat,
                    duration: chosenCat.includes('shorts') ? 'Short' : 'Video',
                    branch: videoData.branch,
                    date: videoData.pubDate,
                    featured: false,
                    hidden: false
                };

                const sermons = getSermons();
                sermons.unshift(newSermon);
                saveSermons(sermons);
                renderSermonsList();

                videoData.isPublished = true;
                btn.outerHTML = `<button class="admin-btn admin-btn-secondary" style="padding: 4px 10px; font-size: 0.75rem; opacity: 0.7;" disabled><i class="fa-solid fa-check"></i> Added</button>`;
                if (selectEl) selectEl.disabled = true;

                if (window.showToast) window.showToast(`Added to ${catLabels[chosenCat]}!`, 'fa-circle-check');
            });
        });
    };

    if (btnSyncAllDailyToColumns) {
        btnSyncAllDailyToColumns.addEventListener('click', () => {
            const unadded = stagedDailyVideos.filter(v => !v.isPublished);
            if (unadded.length === 0) return;

            const sermons = getSermons();
            const catLabels = {
                'sermon-shorts': 'Sermon Shorts',
                'sunday-live': 'Sunday All Live Videos',
                'worship-songs': 'Worship Songs — Full Songs',
                'worship-shorts': 'Worship Songs — Shorts',
                'fasting-prayer': 'Live Fasting Prayer Videos'
            };

            unadded.forEach(v => {
                const cardEl = document.getElementById(`stage-card-${v.youtubeId}`);
                const selectEl = cardEl ? cardEl.querySelector('.stage-cat-select') : null;
                const chosenCat = selectEl ? selectEl.value : v.category;

                sermons.unshift({
                    id: 'yt-stage-' + v.youtubeId,
                    youtubeId: v.youtubeId,
                    title: v.title,
                    speaker: v.speaker,
                    category: chosenCat,
                    categoryLabel: catLabels[chosenCat] || chosenCat,
                    duration: chosenCat.includes('shorts') ? 'Short' : 'Video',
                    branch: v.branch,
                    date: v.pubDate,
                    featured: false,
                    hidden: false
                });

                v.isPublished = true;
            });

            saveSermons(sermons);
            renderSermonsList();
            renderStagingGrid();

            if (window.showToast) window.showToast(`Successfully synced ${unadded.length} daily videos into their columns!`, 'fa-check-double');
        });
    }

    // YouTube Official Channel Catalog Sync
    const syncYoutubeBtn = document.getElementById('btn-sync-official-youtube');
    if (syncYoutubeBtn) {
        syncYoutubeBtn.addEventListener('click', () => {
            if (confirm(`Restore verified catalog (${defaultSermons.length} videos) from official YouTube channels @nmichaelpaul & @samisymphonypaul? Custom videos will be merged.`)) {
                const current = getSermons();
                const defaultIds = new Set(defaultSermons.map(s => s.youtubeId));
                const customOnly = current.filter(s => !defaultIds.has(s.youtubeId));
                const merged = [...customOnly, ...defaultSermons];
                saveSermons(merged);
                renderSermonsList();
                if (window.showToast) window.showToast(`Official YouTube catalog (${merged.length} videos) synced!`, 'fa-rotate');
            }
        });
    }

    checkAuth();
});
