document.addEventListener('DOMContentLoaded', async () => {
    const destinationsGrid = document.getElementById('destinationsGrid');
    const loadingElement = document.getElementById('loading');
    const noResultsElement = document.getElementById('noResults');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const totalDestinationsElement = document.getElementById('totalDestinations');
    const featuredCard = document.getElementById('featuredCard');

    let destinations = [];
    let filteredDestinations = [];

    // Load JSON
    try {
        const response = await fetch('scripts/destinations.json');
        const data = await response.json();
        destinations = data.destinations;
        filteredDestinations = [...destinations];

        renderDestinations();
        updateStats();
        setFeaturedDestination(destinations[0]);
        loadingElement.style.display = 'none';
    } catch (err) {
        console.error('Error loading destinations:', err);
        loadingElement.innerHTML = `<p class="error">Failed to load destinations.</p>`;
    }

    // Render cards
    function renderDestinations() {
        destinationsGrid.innerHTML = '';
        if (filteredDestinations.length === 0) {
            noResultsElement.style.display = 'block';
            return;
        }
        noResultsElement.style.display = 'none';

        filteredDestinations.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'destination-card';

            card.innerHTML = `
      <div class="card-image">
        <img src="${dest.image}" alt="${dest.name}" loading="lazy" decoding="async" width="600" height="600">
      </div>
      <div class="card-content">
        <h3>${dest.name}</h3>
        <p class="location">${dest.location}</p>
        <p class="desc">${dest.description}</p>
        <p class="rating">⭐ ${dest.rating}/5</p>
      </div>
    `;

            destinationsGrid.appendChild(card);
        });
    }

    function setFeaturedDestination(dest) {
        featuredCard.innerHTML = `
    <div class="destination-card featured">
      <div class="card-image">
        <img src="${dest.image}" alt="${dest.name}" loading="lazy" decoding="async" width="1200" height="800">
      </div>
      <div class="card-content">
        <h3>${dest.name}</h3>
        <p>${dest.location}</p>
        <p>${dest.description}</p>
        <p>⭐ ${dest.rating}/5</p>
      </div>
    </div>
  `;
    }

    // Filtering
    function filterDestinations() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        filteredDestinations = destinations.filter(dest => {
            const matchesSearch =
                dest.name.toLowerCase().includes(searchTerm) ||
                dest.location.toLowerCase().includes(searchTerm) ||
                dest.description.toLowerCase().includes(searchTerm);

            const matchesCategory =
                category === 'all' || dest.category.toLowerCase().includes(category.toLowerCase());

            return matchesSearch && matchesCategory;
        });

        // Sort
        filteredDestinations.sort((a, b) => {
            switch (sortBy) {
                case 'rating': return b.rating - a.rating;
                case 'location': return a.location.localeCompare(b.location);
                case 'name':
                default: return a.name.localeCompare(b.name);
            }
        });

        renderDestinations();
        updateStats();
    }

    // Stats
    function updateStats() {
        totalDestinationsElement.textContent = filteredDestinations.length;
        if (filteredDestinations.length > 0) {
            const avgRating = filteredDestinations.reduce((sum, d) => sum + d.rating, 0) / filteredDestinations.length;
            document.querySelector('.stat-card:nth-child(2) h3').textContent = avgRating.toFixed(1);
        }
    }

    // Event listeners
    searchInput.addEventListener('input', () => filterDestinations());
    categoryFilter.addEventListener('change', () => filterDestinations());
    sortFilter.addEventListener('change', () => filterDestinations());

    resetFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = 'all';
        sortFilter.value = 'name';
        filterDestinations();
    });
});


// Get current time in milliseconds
const now = Date.now();
const messageArea = document.getElementById("visit-message");

// Retrieve last visit from localStorage
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = now - parseInt(lastVisit, 10);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        messageArea.textContent = "You last visited 1 day ago.";
    } else {
        messageArea.textContent = `You last visited ${days} days ago.`;
    }
}

// Store current visit
localStorage.setItem("lastVisit", now);