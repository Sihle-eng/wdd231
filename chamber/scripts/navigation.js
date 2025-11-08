// Nav and Hamburger Script
const navbutton = document.querySelector('#ham-b');
const navlinks = document.querySelector('#nav-b');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

// Member Directory Script
const url = 'scripts/members.json';
const membersContainer = document.getElementById('membersContainer');
const gridViewBtn = document.getElementById('gridView') || document.getElementById('grid-view');
const listViewBtn = document.getElementById('listView') || document.getElementById('list-view');

if (!membersContainer) {
    console.warn('membersContainer not found. Ensure an element with id="membersContainer" exists.');
} else {
    // initial view normalization
    if (!membersContainer.classList.contains('grid-view') && !membersContainer.classList.contains('list-view')) {
        membersContainer.classList.add('grid-view');
    }

    // view toggle handlers
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => {
            membersContainer.classList.remove('list-view');
            membersContainer.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            if (listViewBtn) listViewBtn.classList.remove('active');
            // Refresh display to show images in grid view
            getMembers();
        });
    }

    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => {
            membersContainer.classList.remove('grid-view');
            membersContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            if (gridViewBtn) gridViewBtn.classList.remove('active');
            // Refresh display to hide images in list view
            getMembers();
        });
    }

    // fetch -> display pattern
    async function getMembers() {
        try {
            membersContainer.innerHTML = '<p>Loading members…</p>';
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
            const data = await response.json();
            // expect shape: { members: [...] } OR an array directly
            const members = Array.isArray(data) ? data : (Array.isArray(data.members) ? data.members : []);
            displayMembers(members);
        } catch (err) {
            console.error('Failed to fetch members:', err);
            membersContainer.innerHTML = '<p>Error loading members. Check console for details.</p>';
        }
    }

    // display function
    function displayMembers(members) {
        membersContainer.innerHTML = '';

        if (!members || members.length === 0) {
            membersContainer.innerHTML = '<p>No members available.</p>';
            return;
        }

        const isListView = membersContainer.classList.contains('list-view');

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'member-card';

            // heading
            const heading = document.createElement('h2');
            heading.textContent = member.name || member.company || 'Unnamed Member';

            // address
            const address = document.createElement('p');
            address.className = 'member-address';
            address.textContent = member.address || '';

            // phone
            const phone = document.createElement('p');
            phone.className = 'member-phone';
            phone.textContent = member.phone || '';

            // website (optional)
            let websiteEl = null;
            if (member.website && member.website.trim() !== '') {
                websiteEl = document.createElement('p');
                websiteEl.className = 'member-website';
                const a = document.createElement('a');
                a.href = member.website;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = 'Visit Website';
                websiteEl.appendChild(a);
            }

            // industry/description
            const industry = document.createElement('p');
            industry.className = 'member-industry';
            industry.textContent = member.industry || member.description || '';

            // membership badge
            const badge = document.createElement('span');
            badge.className = 'membership-badge ' + getMembershipClass(member.membership);
            badge.textContent = `${getMembershipLevel(member.membership)} Member`;

            // image (only show in grid view)
            let portrait = null;
            let placeholder = null;
            if (!isListView) {
                const imgWrap = document.createElement('div');
                imgWrap.className = 'member-image';

                if (member.image && member.image.trim() !== '') {
                    portrait = document.createElement('img');
                    portrait.src = member.image;
                    portrait.alt = `Logo for ${member.name || member.company || ''}`;
                    portrait.loading = 'lazy';
                    portrait.width = 200;
                    portrait.height = 200;

                    // fallback handler
                    portrait.addEventListener('error', () => {
                        if (portrait) portrait.style.display = 'none';
                        if (placeholder) placeholder.style.display = 'flex';
                    });

                    imgWrap.appendChild(portrait);
                }

                placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.display = (portrait ? 'none' : 'flex');
                placeholder.innerHTML = '<span>No Image</span>';
                imgWrap.appendChild(placeholder);

                card.appendChild(imgWrap);
            }

            // assemble info block
            const info = document.createElement('div');
            info.className = 'member-info';
            info.appendChild(heading);
            if (address.textContent) info.appendChild(address);
            if (phone.textContent) info.appendChild(phone);
            if (websiteEl) info.appendChild(websiteEl);
            if (industry.textContent) info.appendChild(industry);
            info.appendChild(badge);

            card.appendChild(info);
            membersContainer.appendChild(card);
        });
    }

    // helpers
    function getMembershipLevel(level) {
        return level === 3 ? 'Gold' : level === 2 ? 'Silver' : 'Bronze';
    }

    function getMembershipClass(level) {
        return level === 3 ? 'gold' : level === 2 ? 'silver' : 'bronze';
    }

    // start
    getMembers();
}
// Footer Script
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = `©${currentYear} | Sihleleweyinkhosi Mchobokazi | Eswatini`;
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modification: ${lastModified}`
