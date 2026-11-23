const savedLeaders = JSON.parse(localStorage.getItem("savedLeaders")) || [];
const deletedLeaders = JSON.parse(localStorage.getItem("deletedLeaders")) || [];
const leaders = [
    {
        id: "camille",
        name: "Camille Laurent",
        photo: "images/camille-laurent.png"
    },
    {
        id: "matteo",
        name: "Matteo Romano",
        photo: "images/matteo-romano.png"
    },
    {
        id: "luca",
        name: "Luca Moretti",
        photo: "images/luca-moretti.png"
    },
    {
        id: "haruto",
        name: "Haruto Nakamura",
        photo: "images/haruto-nakamura.png"
    }
];
leaders.push(...savedLeaders);
const deleteForm = document.getElementById("deleteLeaderForm");

deleteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selected = deleteForm.querySelectorAll(
        'input[name="leader"]:checked'
    );

    if (selected.length === 0) {
        alert("Please select at least one leader or instructor to delete.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to delete the selected leaders?"
    );

    if (confirmed) {
        selected.forEach(function(checkbox) {
const leaderId = checkbox.value;

for (let i = 0; i < leaders.length; i++) {
    if (leaders[i].id === leaderId) {
        leaders.splice(i, 1);
        break;
    }
}
if (["camille", "matteo", "luca", "haruto"].includes(leaderId)) {
    deletedLeaders.push(leaderId);
    localStorage.setItem("deletedLeaders", JSON.stringify(deletedLeaders));
}
checkbox.closest(".leader-card").remove();        
const savedIndex = savedLeaders.findIndex(function(leader) {
    return leader.id === leaderId;
});

if (savedIndex !== -1) {
    savedLeaders.splice(savedIndex, 1);
}

localStorage.setItem("savedLeaders", JSON.stringify(savedLeaders));});

        alert("Selected leaders deleted successfully!");
    }
});

const addForm = document.getElementById("addLeaderForm");

addForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("leader-name").value.trim();
    const email = document.getElementById("leader-email").value.trim();
    const photo = document.getElementById("leader-photo").files[0];
	if (!addForm.checkValidity()) {
    alert("Please fill in all required fields and enter a valid email address.");
    return;
}

    if (!/^[A-Za-z\u0600-\u06FF ]+$/.test(name)) {
        alert("Please enter a valid name using letters only.");
        return;
    }

    if (!photo || !photo.type.startsWith("image/")) {
        alert("Please upload a valid image.");
        return;
    }

const role = document.getElementById("leader-role").value;
const expertise = document.getElementById("leader-expertise").value;
const skills = document.getElementById("leader-skills").value;
const education = document.getElementById("leader-education").value;
const dob = document.getElementById("leader-dob").value;

const reader = new FileReader();
reader.readAsDataURL(photo);
reader.onload = function () {
const newLeader = {
    id: name,
    name: name,
    email: email,
    dob: dob,
    role: role,
    expertise: expertise,
    skills: skills,
    education: education,
photo: reader.result
};

leaders.push(newLeader);
savedLeaders.push(newLeader);
localStorage.setItem("savedLeaders", JSON.stringify(savedLeaders));
const container = document.getElementsByClassName("leaders-container")[0];

const card = document.createElement("div");
card.className = "leader-card";

const image = document.createElement("img");
image.src = newLeader.photo;
image.alt = newLeader.name;

const lineBreak = document.createElement("br");

const label = document.createElement("label");

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.name = "leader";
checkbox.value = newLeader.id;

label.appendChild(checkbox);
label.appendChild(document.createTextNode(newLeader.name));

card.appendChild(image);
card.appendChild(lineBreak);
card.appendChild(label);

container.appendChild(card);

alert("Leader added successfully!");
addForm.reset();
};
});

savedLeaders.forEach(function(leader) {
    const container = document.getElementsByClassName("leaders-container")[0];

    const card = document.createElement("div");
    card.className = "leader-card";

    const image = document.createElement("img");
    image.src = leader.photo;
    image.alt = leader.name;

    const lineBreak = document.createElement("br");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "leader";
    checkbox.value = leader.id;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(leader.name));

    card.appendChild(image);
    card.appendChild(lineBreak);
    card.appendChild(label);

    container.appendChild(card);
});
deletedLeaders.forEach(function(leaderId) {
    const checkbox = document.querySelector(
        'input[name="leader"][value="' + leaderId + '"]'
    );

    if (checkbox) {
        checkbox.closest(".leader-card").remove();
    }
});