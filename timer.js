var [milliseconds,seconds,minutes,hours] = [0,0,0,0];
var timerRef = document.querySelector('.timerDisplay');
var int = null;
 
document.getElementById('play-btn').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});
 
document.getElementById('home-btn2').addEventListener('click', (event)=>{
    clearInterval(int);

    event.preventDefault();
    saveLastScore();
    renderLastScore();

});
 
function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
 
 var h = hours < 10 ? "0" + hours : hours;
 var m = minutes < 10 ? "0" + minutes : minutes;
 var s = seconds < 10 ? "0" + seconds : seconds;
 var ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
 
 timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}

var name = document.getElementById("playerName");

function saveLastScore() {

  var playerinfo = {
    name: name.value,
    timerRef: timerRef.value,
  };
  localStorage.setItem("playerinfo", JSON.stringify(playerinfo));
}

function renderLastScore() {

  var lastScore = JSON.parse(localStorage.getItem("playerinfo"));

  if (lastScore !== null) {
  document.getElementById("playername").innerHTML = lastScore.name;
  document.getElementById("timer").innerHTML = lastScore.timerRef;
  } else {
    return;
  }
}

var saveButton = document.getElementById("home-btn2");

// saveButton.addEventListener("click", function(event) {
// event.preventDefault();
// saveLastScore();
// renderLastScore();
// });


function init() {

  renderLastScore();
}
init();
