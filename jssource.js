
var now = new Date(); //constant

var ref = new Date(1501196400000); // A day that had games added on it
var testDay = ref;

while (testDay < now){
  testDay = testDay.setDate(testDay.getDate() + 14)
}
testDay.setHours(16);

function sOrNah(input, unit){
  if (input == 1){
    document.getElementById("time").innerHTML += "1 "+unit+" ";
  } else {
    document.getElementById("time").innerHTML += input + " "+unit+"s ";
  }
}


window.onload = function() {

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;


  function showRemaining() {
    var now = new Date();
    var distance = testDay - now;
    if (distance < 0) {

      clearInterval(timer);
      document.getElementById("time").innerHTML = "EXPIRED!";

      return;
    }

    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById("time").innerHTML = "";
    sOrNah(days,"day");
    sOrNah(hours,"hour");
    sOrNah(minutes, "min");
    sOrNah(seconds, "second");
  }

  var timer = window.setInterval(function(){showRemaining()}, 1000);//Update timer once a second


  showRemaining()


};
