import { places } from "./places.mjs";

console.log(places);

function displayItems(places) {
    places.forEach((place) => {

        const thecard = document.createElement("div");
        thecard.classList.add("place-card");

        const thephoto = document.createElement("img");
        thephoto.src = `images/${place.photo_url}`
        thephoto.alt = place.name;
        thecard.appendChild(thephoto);

        const thetitle = document.createElement("h2");
        thetitle.innerText = place.name;
        thecard.appendChild(thetitle);

        const theaddress = document.createElement("address");
        theaddress.innerText = place.address;
        thecard.appendChild(theaddress);

        const thedescription = document.createElement("p");
        thedescription.innerText = place.description;
        thecard.appendChild(thedescription);

        showHere.appendChild(thecard);

        // constshowHere = document.getElementById("showHere");
    });
}
displayItems(places);

// Get current time in milliseconds
const now = Date.now();
const messageArea = document.getElementById("visit-message");

// Retrieve last visit from localStorage
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    // First visit
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