var joinTeamForm = document.getElementById("join-team-form");
var fullNameInput = document.getElementById("full-name-salma");
var skillsInput = document.getElementById("skills-salma");
var educationInput = document.getElementById("education-salma");
var photoInput = document.getElementById("photograph-salma");

joinTeamForm.onsubmit = function () {
	for (var i = 0; i < joinTeamForm.elements.length; i++) {
var field = joinTeamForm.elements[i];

if (field.validity.valueMissing) {
alert("Please fill in all required fields.");
field.focus();
return false;
}

if (field.type === "email" && field.validity.typeMismatch) {
alert("Please enter a valid email address.");
field.focus();
return false;
}

if (field.type === "date" && field.validity.rangeOverflow) {
alert("Your date of birth must be December 31, 2008 or earlier.");
field.focus();
return false;
}
}

    var fullName = fullNameInput.value.trim();

    if (fullName === "") {
        alert("Please enter your full name.");
        fullNameInput.focus();
        return false;
    }

    if (/^[0-9٠-٩۰-۹]/.test(fullName)) {
        alert("Your name cannot start with a number.");
        fullNameInput.focus();
        return false;
    }

    if (skillsInput.value.trim() === "") {
        alert("Please enter your skills.");
        skillsInput.focus();
        return false;
    }

    if (educationInput.value.trim() === "") {
        alert("Please enter your educational background.");
        educationInput.focus();
        return false;
    }

    var photo = photoInput.files[0];
    if (!photo || photo.type.indexOf("image/") !== 0) {
        alert("Please select an image for your photograph.");
        photoInput.focus();
        return false;
    }

    alert("Thank you, " + fullName + "! Your application has been submitted.");
    return false;
};
