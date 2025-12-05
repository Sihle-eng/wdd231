// Nav and Hamburger Script
const navbutton = document.querySelector('#ham-b');
const navlinks = document.querySelector('#nav-b');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});


// footer
// Footer dynamic info: current year and last modified
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    const modifiedEl = document.getElementById('lastModified');

    if (yearEl) {
        yearEl.textContent = `© ${new Date().getFullYear()} South Africa Tourism. All rights reserved.`;
    }

    if (modifiedEl) {
       
        const last = document.lastModified || '';
        modifiedEl.textContent = last ? `Last updated: ${last}` : '';
    }

    // Simple newsletter handler (progressive enhancement)
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value.trim();
            if (!email) return;
            form.querySelector('input[type="email"]').value = '';
            form.querySelector('button').textContent = 'Subscribed';
            setTimeout(() => form.querySelector('button').textContent = 'Subscribe', 2500);
        });
    }
});
