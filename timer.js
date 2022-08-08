var [milliseconds,seconds,minutes,hours] = [0,0,0,0];
var timerRef = document.querySelector('.timerDisplay');
var int = null;
 
document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});
 
document.getElementById('endOfGame').addEventListener('click', ()=>{
    clearInterval(int);
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
