var now = new Date(); //constant

var ref = new Date("Fri Sept 22 2017 17:00:00 GMT+0100 (GMT Daylight Time)"); // A day that had games added on it
var testDay = ref;



function sOrNah(input, unit){
  if (input == 1){
    document.getElementById("dusty").innerHTML += "1 "+unit+" ";
  } else {
    document.getElementById("dusty").innerHTML += input + " "+unit+"s ";
  }
}

function showRemaining() {
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;

  var now = new Date().getTime();
  var distance = testDay - now;
  if (distance < 0) {

    clearInterval(timer);
    document.getElementById("dusty").innerHTML = "EXPIRED!";

    return;
  }

  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  document.getElementById("dusty").innerHTML = "";
  sOrNah(days,"day");
  sOrNah(hours,"hour");
  sOrNah(minutes, "min");
  sOrNah(seconds, "second");
}

window.onload = function() {

  while (testDay < now){
    testDay = new Date(testDay.setDate(testDay.getDate() + 14)) //add 2 weeks
  }

  var timer = window.setInterval(function(){showRemaining()}, 1000);//Update timer once a second

  showRemaining()


};
