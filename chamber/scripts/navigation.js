// ====== Config and cached state ======
const NAV_BUTTON_ID = 'ham-b';
const NAV_LINKS_ID = 'nav-b';
const MEMBERS_JSON = 'scripts/members.json';
const MEMBERS_CONTAINER_ID = 'membersContainer';
const GRID_VIEW_IDS = ['gridView', 'grid-view'];
const LIST_VIEW_IDS = ['listView', 'list-view'];

let membersCache = null;             // cached JSON array
let imagesObserver = null;           // IntersectionObserver instance
let currentView = 'grid';            // 'grid' or 'list'
let renderInProgress = false;

// ====== Utilities ======
const $ = (id) => document.getElementById(id);
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clampViewName(name) {
    return name === 'list' ? 'list' : 'grid';
}

function debounce(fn, wait = 100) {
    let t = null;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

// ====== Nav / Hamburger ======
(function initNav() {
    const navbutton = $(NAV_BUTTON_ID);
    const navlinks = $(NAV_LINKS_ID);
    if (!navbutton || !navlinks) return;

    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navlinks.classList.toggle('show');
    });
})();

// ====== View toggle elements ======
const gridViewBtn = GRID_VIEW_IDS.map(id => $(id)).find(Boolean) || null;
const listViewBtn = LIST_VIEW_IDS.map(id => $(id)).find(Boolean) || null;
const membersContainer = $(MEMBERS_CONTAINER_ID);

if (!membersContainer) {
    console.warn('membersContainer not found. Ensure an element with id="membersContainer" exists.');
} else {

    // ensure initial class
    if (!membersContainer.classList.contains('grid-view') && !membersContainer.classList.contains('list-view')) {
        membersContainer.classList.add('grid-view');
    }
    currentView = membersContainer.classList.contains('list-view') ? 'list' : 'grid';

    // ====== View toggles (debounced to avoid thrashing) ======
    const setActiveButtons = () => {
        if (gridViewBtn) gridViewBtn.classList.toggle('active', currentView === 'grid');
        if (listViewBtn) listViewBtn.classList.toggle('active', currentView === 'list');
    };

    const handleViewChange = debounce((view) => {
        view = clampViewName(view);
        if (renderInProgress || currentView === view) return;
        currentView = view;
        membersContainer.classList.toggle('grid-view', view === 'grid');
        membersContainer.classList.toggle('list-view', view === 'list');
        setActiveButtons();
        renderMembers(membersCache || []);
    }, 80);

    if (gridViewBtn) gridViewBtn.addEventListener('click', () => handleViewChange('grid'));
    if (listViewBtn) listViewBtn.addEventListener('click', () => handleViewChange('list'));

    // ====== Image lazy-loading using IntersectionObserver ======
    function initImageObserver() {
        if ('IntersectionObserver' in window) {
            imagesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imagesObserver.unobserve(img);
                });
            }, { rootMargin: '200px 0px', threshold: 0.01 });
        }
    }

    // fallback lazy assignment (if IntersectionObserver not available)
    function observeImage(img) {
        if (!img) return;
        if (imagesObserver) {
            imagesObserver.observe(img);
        } else {
            // load immediately
            const src = img.dataset.src;
            if (src) img.src = src;
        }
    }

    // ====== Template factory (returns an element) ======
    function createMemberCard(member, isList) {
        const card = document.createElement('section');
        card.className = 'member-card';

        // image block (only for grid)
        if (!isList) {
            const imgWrap = document.createElement('div');
            imgWrap.className = 'member-image';

            if (member.image && member.image.trim()) {
                const portrait = document.createElement('img');
                portrait.alt = `Logo for ${member.name || member.company || ''}`;
                portrait.width = 200;
                portrait.height = 200;
                portrait.loading = 'lazy';
                portrait.className = 'member-portrait';
                portrait.dataset.src = member.image; // defer actual src to observer

                // graceful fallback
                portrait.addEventListener('error', () => {
                    portrait.style.display = 'none';
                    const placeholder = imgWrap.querySelector('.image-placeholder');
                    if (placeholder) placeholder.style.display = 'flex';
                });

                imgWrap.appendChild(portrait);
                observeImage(portrait);
            }

            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.display = (member.image && member.image.trim()) ? 'none' : 'flex';
            placeholder.innerHTML = '<span>No Image</span>';
            imgWrap.appendChild(placeholder);

            card.appendChild(imgWrap);
        }

        // info block
        const info = document.createElement('div');
        info.className = 'member-info';

        const heading = document.createElement('h2');
        heading.textContent = member.name || member.company || 'Unnamed Member';
        info.appendChild(heading);

        if (member.address && member.address.trim()) {
            const address = document.createElement('p');
            address.className = 'member-address';
            address.textContent = member.address;
            info.appendChild(address);
        }

        if (member.phone && member.phone.trim()) {
            const phone = document.createElement('p');
            phone.className = 'member-phone';
            phone.textContent = member.phone;
            info.appendChild(phone);
        }

        if (member.website && member.website.trim()) {
            const websiteEl = document.createElement('p');
            websiteEl.className = 'member-website';
            const a = document.createElement('a');
            a.href = member.website;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = 'Visit Website';
            websiteEl.appendChild(a);
            info.appendChild(websiteEl);
        }

        if (member.industry || member.description) {
            const industry = document.createElement('p');
            industry.className = 'member-industry';
            industry.textContent = member.industry || member.description || '';
            info.appendChild(industry);
        }

        const badge = document.createElement('span');
        badge.className = 'membership-badge ' + getMembershipClass(member.membership);
        badge.textContent = `${getMembershipLevel(member.membership)} Member`;
        info.appendChild(badge);

        card.appendChild(info);
        return card;
    }

    // ====== Render members (batched DOM updates) ======
    function renderMembers(members) {
        renderInProgress = true;
        membersContainer.innerHTML = ''; // quick clear

        if (!members || members.length === 0) {
            membersContainer.innerHTML = '<p>No members available.</p>';
            renderInProgress = false;
            return;
        }

        const isList = currentView === 'list';
        const frag = document.createDocumentFragment();

        // Create each card and append to fragment
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            const card = createMemberCard(member, isList);
            frag.appendChild(card);
        }

        membersContainer.appendChild(frag);
        renderInProgress = false;
    }

    // ====== Fetch once, cache, then render ======
    async function loadMembers() {
        if (membersCache) {
            renderMembers(membersCache);
            return;
        }

        membersContainer.innerHTML = '<p>Loading members…</p>';
        try {
            const res = await fetch(MEMBERS_JSON, { cache: 'no-store' });
            if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
            const json = await res.json();
            const members = Array.isArray(json) ? json : (Array.isArray(json.members) ? json.members : []);
            membersCache = members;
            renderMembers(membersCache);
        } catch (err) {
            console.error('Failed to fetch members:', err);
            membersContainer.innerHTML = '<p>Error loading members. Check console for details.</p>';
        }
    }

    // ====== Membership helpers ======
    function getMembershipLevel(level) {
        return level === 3 ? 'Gold' : level === 2 ? 'Silver' : 'Bronze';
    }
    function getMembershipClass(level) {
        return level === 3 ? 'gold' : level === 2 ? 'silver' : 'bronze';
    }

    // initialize observers and load
    initImageObserver();
    loadMembers();
}

// ====== Footer info (safe guards) ======
try {
    const currentYear = new Date().getFullYear();
    const currentYearEl = $('currentYear');
    if (currentYearEl) currentYearEl.textContent = `©${currentYear} | Sihleleweyinkhosi Mchobokazi | Eswatini`;

    const lastModifiedEl = $('lastModified');
    if (lastModifiedEl) lastModifiedEl.textContent = `Last Modification: ${document.lastModified || 'Unknown'}`;
} catch (e) {
    console.error('Footer update failed:', e);
}
