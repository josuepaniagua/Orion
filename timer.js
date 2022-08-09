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
  // Save related form data as an object
  var playerinfo = {
    name: name.value,
    timerRef: timerRef.value,
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("playerinfo", JSON.stringify(playerinfo));
}

function renderLastScore() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastScore = JSON.parse(localStorage.getItem("playerinfo"));
  // Check if data is returned, if not exit out of the function
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

// The init() function fires when the page is loaded 
function init() {
  // When the init function is executed, the code inside renderLastScore function will also execute
  renderLastScore();
}
init();
