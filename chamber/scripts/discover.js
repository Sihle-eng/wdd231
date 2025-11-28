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