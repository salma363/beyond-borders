// Back to Top

var backToTop = document.getElementById("backToTop");

window.onscroll = function () {

    if (document.documentElement.scrollTop > 200 ||
        document.body.scrollTop > 200) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

};

// Real-time Clock

function updateClock() {

    var now = new Date();

    document.getElementById("liveClock").innerHTML =
        "Current Time: " + now.toLocaleString();

}

updateClock();

setInterval(updateClock, 1000);

function showInfo(id) {

    var info = document.getElementById(id);

    if (info.style.display == "block") {
        info.style.display = "none";
    } else {
        info.style.display = "block";
    }

}