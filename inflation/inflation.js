/* global Chart */

// https://stackoverflow.com/a/39263992
/**
* returns an array with moving average of the input array
* @param array - the input array
* @param count - the number of elements to include in the moving average calculation
* @param qualifier - an optional function that will be called on each
*  value to determine whether it should be used
*/
function movingAvg(array, count, qualifier) {

	// calculate average for subarray
	var avg = function (array, qualifier) {

		var sum = 0; var count = 0; var val;

		for (var i in array) {
			val = array[i];
			if (!qualifier || qualifier(val)) {
				sum += val;
				count++;
			}
		}

		return sum / count;
	};

	var result = []; var val;

	// pad beginning of result with null values
	for (var i = 0; i < count - 1; i++) { result.push(null); }

	// calculate average for each subarray and add to result
	for (var i = 0, len = array.length - count; i <= len; i++) {

		val = avg(array.slice(i, i + count), qualifier);
		if (isNaN(val)) { result.push(null); } else { result.push(val); }
	}

	return result;
}


var request = new XMLHttpRequest();
var shopGames;
var sortedByDate;
var chart;
request.open("GET", "https://api.chrono.gg/shop", true);

request.onload = function () {
	if (request.status >= 200 && request.status < 400) {
		// Success!
		shopGames = JSON.parse(request.responseText);

		sortedByDate = shopGames.sort((a, b) => {
			return ((a.created > b.created) ? 1 : -1);
		});


		var ctx = document.getElementById("byDateLine").getContext("2d");
		chart = new Chart(ctx, {
			// The type of chart we want to create
			type: "line",

			// The data for our dataset
			data: {

				labels: sortedByDate.map(x => { return x.name; }),
				datasets: [
					{
						label: "Price ao5",
						backgroundColor: "transparent",
						borderColor: "#452e59",
						data: movingAvg(
							sortedByDate.map(x => { return x.price; }),
							5
						),
						trendlineLinear: {
							style: "#452e59",
							lineStyle: "line",
							width: 2
						}
					},

					{
						label: "Price not averaged",
						backgroundColor: "transparent",
						borderColor: "#4db0ab",
						data: sortedByDate.map(x => { return x.price; }),
						trendlineLinear: {
							style: "#4db0ab",
							lineStyle: "line",
							width: 2
						}
					},


					// {
					// 	label: "Steam Rating",
					// 	backgroundColor: "transparent",
					// 	borderColor: "#452e59",
					// 	data: sortedByDate.map(x => { return x.price; }),
					// 	trendlineLinear: {
					// 		style: "#4db0ab",
					// 		lineStyle: "line",
					// 		width: 2
					// 	}
					// },

				]
			},


			// Configuration options go here
			options: {
				scales: {
					yAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: "Price (coins)",
								fontFamily: "'Open Sans', sans-serif",
								fontSize: "15"
							}
						}		
					]
				}			
			}
		});


	} else {
		// We reached our target server, but it returned an error
	}
};

request.onerror = function () {
	// There was a connection error of some sort
};

request.send();

// TODO:
//
// https://stackoverflow.com/questions/17354163/dynamically-update-values-of-a-chartjs-chart
