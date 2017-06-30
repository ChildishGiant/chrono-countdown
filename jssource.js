var sched = later.parse.recur().on(6).dayOfWeek().on('16:00:00').time(); //This is one hour out becuase UTC

var occurrences = later.schedule(sched).next();

var now = new Date(); //constant
var testDay = new Date();



var dayNumber = now.getUTCDay(); //Made a var for easy faking for debugging.
var dateNumber = now.getUTCDate();// ditto

//Faking tommorow
// dayNumber = now.getUTCDay()+1;
// dateNumber = now.getUTCDate()+1;

function sOrNah(input, unit){
  if (input == 1){
    document.getElementById("time").innerHTML += "1 "+unit+" ";
  } else if (input > 1) {
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
    var distance = occurrences - now;
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


  $("#coin").click(function() {
    $(this).addClass( "anim" ).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
        $(this).removeClass( "anim" );
    });
  });
};
