// Parse URL parameters and display form data
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // If timestamp is missing in the URL, set it before redirecting

    // const timestampField = document.getElementById("timestamp");
    // if (timestampField && !urlParams.get("timestamp")) {
    //     timestampField.value = new Date().toISOString();
    // }
    const timestamp = urlParams.get('timestamp') || new Date().toISOString();
    document.getElementById('display-timestamp').textContent = new Date(timestamp).toLocaleString();


    // Display form data
    document.getElementById('display-name').textContent = urlParams.get('name') || 'Not provided';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';
    document.getElementById('display-phone').textContent = urlParams.get('phone') || 'Not provided';
    document.getElementById('display-subject').textContent = urlParams.get('subject') || 'Not provided';
    document.getElementById('display-message').textContent = urlParams.get('message') || 'Not provided';

    // Display timestamp
    // const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('display-timestamp').textContent = date.toLocaleString();
    } else {
        document.getElementById('display-timestamp').textContent = 'Not available';
    }
});
