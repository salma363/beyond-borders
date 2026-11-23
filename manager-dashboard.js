// Display entered symbols as text inside the cards
function offeringText(value) {

    return value.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}

function displayManagerOfferings() {

    // Retrieve saved offerings
    var storedOfferings = localStorage.getItem("managerOfferings");
    var managerOfferings = [];

    if (storedOfferings != null) {
        managerOfferings = JSON.parse(storedOfferings);
    }

    var cards = document.getElementById("manager-cards-joud");
    var emptyMessage = document.getElementById("manager-empty-joud");

    cards.innerHTML = "";

    // Initially, there are no added offerings
    if (managerOfferings.length == 0) {
        emptyMessage.innerHTML = "No offerings have been added yet.";
        return;
    }

    emptyMessage.innerHTML = "";

    var cardsHTML = "";

    // Display every saved offering
    for (var i = 0; i < managerOfferings.length; i++) {

        var offering = managerOfferings[i];

        cardsHTML +=
            '<div class="manager-card-joud">' +

                '<img src="' + offeringText(offering.image) +
                '" alt="' + offeringText(offering.name) + '">' +

                '<h3>' + offeringText(offering.name) + '</h3>' +

                '<p>' + offeringText(offering.description) + '</p>' +

                '<p>Instructor: ' +
                offeringText(offering.instructor) + '</p>' +

                '<p>' + offering.price + ' SAR</p>' +

            '</div>';
    }

    cards.innerHTML = cardsHTML;
}

displayManagerOfferings();