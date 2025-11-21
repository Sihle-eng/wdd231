// Parse URL parameters and display form data
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data
    document.getElementById('display-first-name').textContent = urlParams.get('first') || 'Not provided';
    document.getElementById('display-last-name').textContent = urlParams.get('last') || 'Not provided';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';

    document.getElementById('display-organization').textContent = urlParams.get('organization') || 'Not provided';
    document.getElementById('display-description').textContent = urlParams.get('description') || 'Not provided';

    // Format timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('display-timestamp').textContent = date.toLocaleString();
    } else {
        document.getElementById('display-timestamp').textContent = 'Not available';
    }
});