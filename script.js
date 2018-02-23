var rollingChronoShopDate;

function toggleImage(willShow) {
    if (willShow) {
        document.getElementById("quoteDiv").style.display = "block";
    } else {
        document.getElementById("quoteDiv").style.display = "none";
    }
}

function refreshData() {
    let currentUtcDateTime = moment.utc();
    rollingChronoShopDate = moment.utc("2017-03-10T17:00:00Z");
    while (currentUtcDateTime.isAfter(rollingChronoShopDate)) {
        rollingChronoShopDate.add(14, "days");
    }

    let formattedNextCoinShopDate = rollingChronoShopDate.local().format("MMMM Do") + " at " +
                                    rollingChronoShopDate.format("hA");

    document.getElementById("actualTime").innerText = "That's " + formattedNextCoinShopDate + " your time, buddy.";
}

function getTimeRemaining() {
    let utcNow = moment.utc();

    if (utcNow.isAfter(rollingChronoShopDate)) {
        refreshData();
    }

    let rollingChronoShopDateInner = moment.utc(rollingChronoShopDate);	
	let diff = rollingChronoShopDateInner.diff(utcNow);
	let duration = moment.duration(diff);	
	
    return duration.days() + " days, " +
           duration.hours() + " hours, " +
           duration.minutes() + " minutes, " +
           duration.seconds() + " seconds";
}

function updateTimer() {
    let timeRemaining = getTimeRemaining();
    document.getElementById("timeDiv").innerText = timeRemaining;
}

// call once so screen isn't empty
refreshData();
updateTimer();

// Set up timer to refresh every second for restock date
setInterval(updateTimer, 1000);
