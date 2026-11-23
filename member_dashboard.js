// Get saved offerings from Local Storage
let savedOfferings = JSON.parse(localStorage.getItem("savedOfferings")) || [
    {
        name: "Italian Pasta Workshop",
        price: "100",
        image: "images/italianPasta.png"
    },
    {
        name: "Sushi Making Workshop",
        price: "120",
        image: "images/sushi.png"
    }
];


// Save offerings in Local Storage
function saveOfferings() {
    localStorage.setItem("savedOfferings", JSON.stringify(savedOfferings));
}


// Update bookmarks in Home Page and Offerings Page
let bookmarks = document.querySelectorAll(".bookmark-image");

bookmarks.forEach(function (bookmark) {

    // Get the offering card
    let card = bookmark.closest(".offering-card");

    // If it is not an offering card, check the Home Page card
    if (!card) {
        card = bookmark.closest(".card");
    }

    if (!card) {
        return;
    }

    let name = card.getAttribute("data-name");
    let price = card.getAttribute("data-price");
    let image = card.getAttribute("data-image");

    // Check if offering is already saved
    let isSaved = savedOfferings.some(function (offering) {
        return offering.name === name;
    });

    // Update bookmark image
    bookmark.src = isSaved
        ? "images/bookmark.png"
        : "images/bookmark-empty.png";


    // Click bookmark
    bookmark.addEventListener("click", function () {

        let index = savedOfferings.findIndex(function (offering) {
            return offering.name === name;
        });

        // Save offering
        if (index === -1) {

            savedOfferings.push({
                name: name,
                price: price,
                image: image
            });

        }

        // Remove offering
        else {

            savedOfferings.splice(index, 1);

        }

        // Update Local Storage
        saveOfferings();


        // Update all bookmarks for the same offering
        let allBookmarks = document.querySelectorAll(".bookmark-image");

        allBookmarks.forEach(function (otherBookmark) {

            let otherCard = otherBookmark.closest(".offering-card");

            if (!otherCard) {
                otherCard = otherBookmark.closest(".card");
            }

            if (otherCard &&
                otherCard.getAttribute("data-name") === name) {

                let isNowSaved = savedOfferings.some(function (offering) {
                    return offering.name === name;
                });

                otherBookmark.src = isNowSaved
                    ? "images/bookmark.png"
                    : "images/bookmark-empty.png";

            }

        });

    });

});


// Display saved offerings in Member Dashboard
let savedList = document.querySelector(".saved_list");

if (savedList) {

    savedList.innerHTML = "";

    savedOfferings.forEach(function (offering) {

        let card = document.createElement("div");

        card.className = "saved_card";

        // Display price
        let price = offering.price;

        if (price.indexOf("SAR") === -1) {
            price = price + " SAR";
        }

        card.innerHTML = `
            <img src="${offering.image}"
                 alt="${offering.name}"
                 class="saved_img">

            <div class="saved_details">
                <h3>${offering.name}</h3>
            </div>

            <div class="saved_price">
                <p>${price}</p>

                <img src="images/bookmark.png"
                     alt="Bookmark"
                     class="bookmark_img">
            </div>
        `;


        // Remove offering from Dashboard when bookmark is clicked
        let dashboardBookmark = card.querySelector(".bookmark_img");

        dashboardBookmark.addEventListener("click", function () {

            let index = savedOfferings.findIndex(function (savedOffering) {
                return savedOffering.name === offering.name;
            });

            if (index !== -1) {

                savedOfferings.splice(index, 1);

                saveOfferings();

                card.remove();

            }

        });


        savedList.appendChild(card);

    });

}