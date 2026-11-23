
var savedTheme = localStorage.getItem("beyond-borders-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", function () {
    var themeButton = document.getElementById("themeButton");
    if (!themeButton) {
        return;
    }

    function updateButtonText() {
        if (savedTheme === "dark") {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    }

    updateButtonText();
    themeButton.onclick = function () {
        if (savedTheme === "dark") {
            savedTheme = "light";
        } else {
            savedTheme = "dark";
        }

        document.documentElement.setAttribute("data-theme", savedTheme);
        localStorage.setItem("beyond-borders-theme", savedTheme);
        updateButtonText();
    };
});
