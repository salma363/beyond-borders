// Get the main offerings container
var section = document.getElementsByClassName("all-offerings")[0];

var container = section.getElementsByClassName("offering-cards")[0];

// Get the offering cards
var cards = container.getElementsByClassName("offering-card");

// Store the cards in an array
var offerings = [];

for (var i = 0; i < cards.length; i++) {
    offerings.push(cards[i]);
}

// Random order
for (var i = offerings.length - 1; i > 0; i--) {

    var j = Math.floor(Math.random() * (i + 1));

    var temp = offerings[i];
    offerings[i] = offerings[j];
    offerings[j] = temp;
}

// Display the cards
function displayOfferings() {

    for (var i = 0; i < offerings.length; i++) {
        container.appendChild(offerings[i]);
    }

}

displayOfferings();

// Sorting by price or name

var sort = document.getElementById("sort");

sort.onchange = function () {

    var choice = sort.value;
if (choice == "") {

    for (var i = offerings.length - 1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1));

        var temp = offerings[i];
        offerings[i] = offerings[j];
        offerings[j] = temp;
    }

}
    // Price: Low to High
    if (choice == "low-high") {

        offerings.sort(function (a, b) {
            return parseFloat(a.getAttribute("data-price")) -
       parseFloat(b.getAttribute("data-price"));
        });

    }

    // Price: High to Low
    else if (choice == "high-low") {

        offerings.sort(function (a, b) {
            return parseFloat(b.getAttribute("data-price")) -
       parseFloat(a.getAttribute("data-price"));
        });

    }

    // Name: A-Z
    else if (choice == "az") {

        offerings.sort(function (a, b) {

            var nameA = a.getAttribute("data-name");
            var nameB = b.getAttribute("data-name");

            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }

        });

    }

    // Name: Z-A
    else if (choice == "za") {

        offerings.sort(function (a, b) {

            var nameA = a.getAttribute("data-name");
            var nameB = b.getAttribute("data-name");

            if (nameA > nameB) {
                return -1;
            } else if (nameA < nameB) {
                return 1;
            } else {
                return 0;
            }

        });

    }

    displayOfferings();

};

/* Filter Offerings by Country */

var country = document.getElementById("country");

country.onchange = function () {

    var selected = country.value;

    for (var i = 0; i < offerings.length; i++) {

        var cardCountry = offerings[i].getAttribute("data-country").toLowerCase();

        if (selected == "all" || selected == cardCountry) {

            offerings[i].style.display = "block";

        } else {

            offerings[i].style.display = "none";

        }

    }

};