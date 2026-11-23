var offeringForm = document.getElementById("add-offering-form-joud");

var imageInput = document.getElementById("offering-image-joud");
var nameInput = document.getElementById("offering-name-joud");
var priceInput = document.getElementById("offering-price-joud");
var instructorInput = document.getElementById("offering-instructor-joud");
var descriptionInput = document.getElementById("offering-description-joud");

function addOffering() {

    var offeringName = nameInput.value.replace(/^\s+|\s+$/g, "");
    var price = priceInput.value.replace(/^\s+|\s+$/g, "");
    var instructor = instructorInput.value.replace(/^\s+|\s+$/g, "");
    var description = descriptionInput.value.replace(/^\s+|\s+$/g, "");
    var imagePath = imageInput.value;

    // Check the image
    if (imagePath == "") {
        alert("Please select an offering image.");
        return false;
    }

    imagePath = imagePath.replace(/\\/g, "/");

    var imageName = imagePath.substring(
        imagePath.lastIndexOf("/") + 1
    );

    if (imageName.match(/\.(png|jpg|jpeg|gif|webp)$/i) == null) {
        alert("Please select a PNG, JPG, JPEG, GIF or WebP image.");
        return false;
    }

    // Check the offering name
    if (offeringName == "") {
        alert("Please enter the offering name.");
        return false;
    }

    if (offeringName.search(/^[0-9٠-٩۰-۹]/) != -1) {
        alert("The offering name cannot start with a number.");
        return false;
    }

    // Check the price
    if (price == "") {
        alert("Please enter the price. Enter 0 for a free offering.");
        return false;
    }

    if (price.match(/^[0-9]+(\.[0-9]+)?$/) == null ||
        parseFloat(price) > Number.MAX_VALUE) {

        alert("Please enter a valid price of 0 or more, such as 0, 80 or 80.50.");
        return false;
    }

    // Check the instructor name
    if (instructor == "") {
        alert("Please enter the instructor name.");
        return false;
    }
if (instructor.match(/^[A-Za-zء-ي ]+$/) == null) {
    alert("Please enter the instructor name using letters and spaces only.");
    return false;
}

    // Check the description
    if (description == "") {
        alert("Please enter the offering description.");
        return false;
    }

    // Retrieve previously added offerings
    var storedOfferings = localStorage.getItem("managerOfferings");
    var managerOfferings = [];

    if (storedOfferings != null) {
        managerOfferings = JSON.parse(storedOfferings);
    }

    var reader = new FileReader();

reader.onload = function () {
    var managerOfferings = [];
    var storedOfferings = localStorage.getItem("managerOfferings");

    if (storedOfferings != null) {
        managerOfferings = JSON.parse(storedOfferings);
    }

    managerOfferings.push({
        name: offeringName,
        image: reader.result,
        price: parseFloat(price),
        instructor: instructor,
        description: description
    });

    try {
        localStorage.setItem(
            "managerOfferings",
            JSON.stringify(managerOfferings)
        );
    } catch (error) {
        alert("Could not save the image. Please try a smaller image.");
        return;
    }

    alert('The offering "' + offeringName + '" has been added successfully.');

    imageInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    instructorInput.value = "";
    descriptionInput.value = "";
};

reader.onerror = function () {
    alert("Could not read the image. Please select it again.");
};

reader.readAsDataURL(imageInput.files[0]);

return false;
}

offeringForm.onsubmit = addOffering;