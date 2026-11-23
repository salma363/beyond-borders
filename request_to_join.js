
var joinForm = document.getElementById("joinForm");

var offering = document.getElementById("offering");
var fullName = document.getElementById("full_name");
var preferredDate = document.getElementById("preferred_date");

// Get today's date
var today = new Date();

var todayDate =
    today.getFullYear() + "-" +
    (today.getMonth() + 1 < 10 ? "0" : "") +
    (today.getMonth() + 1) + "-" +
    (today.getDate() < 10 ? "0" : "") +
    today.getDate();


// Container for submitted requests (in the HTML page)
var requestsContainer = document.getElementById("submittedRequests");

// Submit event handler
joinForm.onsubmit = function() {

    // 1) Validate offering
    if (offering.value == "") {

        alert("Please select an offering.");
        offering.focus();
        return false;
    }

    // 2) Validate full name
    var name = fullName.value;

    // Empty name
    if (name == "") {

        alert("Please enter your full name.");
        fullName.focus();
        return false;
    }

    // Name contains numbers
    if (name.match(/[0-9]/) != null) {

        alert("The name cannot contain numbers (0-9).\nPlease use letters only.");
        fullName.focus();
        return false;
    }

    // Name contains special characters such as ? ! @
    var specialChar = name.match(/[^A-Za-z؀-ۿ ]/);

    if (specialChar != null) {

        alert("The name cannot contain the character \"" + specialChar[0] + "\".\n" +
              "Special characters such as ?, !, or @ are not allowed.");
        fullName.focus();
        return false;
    }

    // Name is not a full name (needs first and last name)
    if (name.indexOf(" ") == -1 ||
        name.charAt(0) == " " ||
        name.charAt(name.length - 1) == " ") {

        alert("Please enter your full name (first name and last name).");
        fullName.focus();
        return false;
    }

    // 3) Validate preferred date
    if (preferredDate.value == "") {

        alert("Please select a preferred date.");
        preferredDate.focus();
        return false;
    }

    if (preferredDate.value <= todayDate) {

        alert("The preferred date must be a future date (after today).");
        preferredDate.focus();
        return false;
    }

    // Get selected offering name
    var offeringOptions = offering.getElementsByTagName("option");
    var offeringName = "";

    for (var i = 0; i < offeringOptions.length; i++) {

        if (offeringOptions[i].value == offering.value) {
            offeringName = offeringOptions[i].innerHTML;
        }
    }

    // Confirmation message
    var answer = confirm(
        "Your request has been sent successfully!\n\n" +
        "Press OK to stay on this page and add another request.\n" +
        "Press Cancel to return to the Member Dashboard."
    );

    if (answer == true) {

        // Display request information
        requestsContainer.innerHTML +=
            "<div class='submitted_request'>" +
            "<h3>Submitted Request</h3>" +
            "<p><strong>Offering:</strong> " +
            offeringName + "</p>" +
            "<p><strong>Member Name:</strong> " +
            name + "</p>" +
            "<p><strong>Preferred Date:</strong> " +
            preferredDate.value + "</p>" +
            "</div>";

        // Clear form
        offering.value = "";
        fullName.value = "";
        preferredDate.value = "";

    } else {

        // Return to Member Dashboard
        window.location.href = "member_dashboard.html";

    }

    return false;
};
