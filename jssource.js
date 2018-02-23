var rollingChronoShopDate;

function toggleImage(willShow) {
    if (willShow) {
        document.getElementById("quoteDiv").style.display = "block";
    } else {
        document.getElementById("quoteDiv").style.display = "none";
    }
}

function refreshData() {
    var currentUtcDateTime = moment.utc();
    rollingChronoShopDate = moment.utc("2017-03-10T17:00:00Z");
    while (currentUtcDateTime.isAfter(rollingChronoShopDate)) {
        rollingChronoShopDate.add(14, "days");
    }

    var formattedNextCoinShopDate = rollingChronoShopDate.local().format("MMMM Do") + " at " +
                                    rollingChronoShopDate.format("hA");

    document.getElementById("cameojokes").innerText = "That's " + formattedNextCoinShopDate + " your time, buddy.";
}

function getTimeRemaining() {
    var utcNow = moment.utc();

    if (utcNow.isAfter(rollingChronoShopDate)) {
        refreshData();
    }

    var rollingChronoShopDateInner = moment.utc(rollingChronoShopDate);
	var diff = rollingChronoShopDateInner.diff(utcNow);
	var duration = moment.duration(diff);

    return duration.days() + " days, " +
           duration.hours() + " hours, " +
           duration.minutes() + " minutes, " +
           duration.seconds() + " seconds";
}

function updateTimer() {
    var timeRemaining = getTimeRemaining();
    document.getElementById("dusty").innerText = timeRemaining;
}

// call once so screen isn't empty
refreshData();
updateTimer();

// Set up timer to refresh every second for restock date
setInterval(updateTimer, 1000);
