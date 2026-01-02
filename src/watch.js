//function to arrange the numbers with the watch
function arrangeNumbers(){
    const numbersHolder = document.getElementsByClassName("numbers-holder")[0];
    let degreeHolder = 0;
    for(let init = 1; init<6;init++){
        degreeHolder+=30;
        const each_2_parallel_numbers = numbersHolder.children[init];
        each_2_parallel_numbers.setAttribute("style",`transform:rotate(${degreeHolder}deg);`);
    }
}
arrangeNumbers();

//function to apply all dots that mark the position of the needle or number
function dotsMarkers(){
    const dotsHolder = document.getElementsByClassName("dots-holder")[0];
    const wholeDots = [];
    for(let init = 0;init<60;init++){
        const two_parallel_dots = `<div class="dot"></div>`
        wholeDots.push(two_parallel_dots)
    }
    dotsHolder.innerHTML=wholeDots.join("");
}
dotsMarkers();

//function to arrange all of dots markers inside the watch
function arrangeDotMarkers(){
    const dotsHolder = document.getElementsByClassName("dots-holder")[0];
    let dotsDegrees = 0;
    for(let init=0;init<60;init++){
        dotsDegrees+=6;
        const single_two_dots = dotsHolder.children[init];
        single_two_dots.setAttribute("style",`transform:rotate(${dotsDegrees}deg);`);
    }
}
arrangeDotMarkers();

//function to tichours needles
function secondsNeedleTicker(){
    const secondsNeedle = document.getElementsByClassName("seconds-needle")[0]
    const minutesNeedle = document.getElementsByClassName("minutes-needle")[0]
    const dateMethod = new Date()
    const seconds = dateMethod.getSeconds()
    //clocking seconds needle
    if(seconds == 0){
        secondsNeedle.style.transitionDuration = "0ms"
    }else{
        secondsNeedle.style.transitionDuration = "200ms"
    }
    let secondsDegree = (seconds * 6);
    secondsNeedle.style.transform = `rotate(${secondsDegree}deg)`
}
setInterval(secondsNeedleTicker,1000)

//function to tick the minutes needle
function minutesNeedleTicker(){
    const minutesNeedle = document.getElementsByClassName("minutes-needle")[0]
    const hoursNeedle = document.getElementsByClassName("hours-needle")[0]
    const dateMethod = new Date()
    const minutes = dateMethod.getMinutes()

    if(minutes == 0){
        hoursNeedle.style.transitionDuration = "0ms"
        minutesNeedle.style.transitionDuration = "0ms"
    }else{
        hoursNeedle.style.transitionDuration = "200ms"
        minutesNeedle.style.transitionDuration = "200ms"
    }
    let minutesDegree = (minutes * 6)
    minutesNeedle.style.transform=`rotate(${minutesDegree}deg)`
}
setInterval(minutesNeedleTicker,1000)

//function to tick the hours needle
function hoursNeedleTicker(){
    const hoursNeedle = document.getElementsByClassName("hours-needle")[0]
    const dateMethod = new Date()
    const hours = dateMethod.getHours()

    let hoursDegree = (hours * 30)
    hoursNeedle.style.transform = `rotate(${hoursDegree}deg)`
}
setInterval(hoursNeedleTicker,1000)

//function to start the watch counting operation
let hoursCounter = 0;
let minutesCounter = 0;
let secondsCounter = 0;
let started = false;
let restart = false;
function countingEngine(){
    const timeHolder = document.getElementsByClassName("time-holder")[0];
    const startButton = document.getElementById("start")

    if(started == false){
        clearInterval()
        return "watch stopped";
    }
    startButton.innerHTML = "...."
    if(hoursCounter == 24){
        hoursCounter = 1;
    }else{
        if(minutesCounter >= 59){
            hoursCounter++
            minutesCounter = 0o0;
        }
    }
    //minutesCounter increment
    if(secondsCounter >=59){
        minutesCounter++
        secondsCounter = 0o0;
    }else{
        secondsCounter++
    }
    let timeFormatElement = `<h3>${hoursCounter}: <sub>Hrs</sub></h3>
                        <h3>${minutesCounter}: <sub>Min</sub></h3>
                        <h3>${secondsCounter}: <sub>Sec</sub></h3>`;
    timeHolder.innerHTML = timeFormatElement;
}
setInterval(countingEngine,1000)

//functions to manipulate the current watch counting operation
let stopped = false;
function startWatchEngine(){
    restart = false;
    started = true;
    stopped = false;
    hoursCounter = 0o0
    minutesCounter = 0o0
    secondsCounter = 0o0
    const stopPlayButton = document.getElementById("stop")
    stopPlayButton.innerHTML = "Stop"
}
//function to continuing watch time counter engine
function continueCounting(){
    started = true;
    const stopPlayButton = document.getElementById("stop")
    stopPlayButton.innerHTML = "Stop"
}

//function to start watch engine
function stopWatchEngine(){
    const stopPlayButton = document.getElementById("stop")
    stopped = !stopped
    started = false;
    if(stopped  && !restart){
        stopPlayButton.innerHTML = "Continue";
        const startButton = document.getElementById("start")
        startButton.innerHTML = "Start";
    }else{
        stopPlayButton.innerHTML = "Stop"
    }
    if(stopPlayButton.innerHTML == "Stop" && !restart){
        continueCounting()
    }else{
        started = false;
    }
}

//function to reset watch engine

function resetWatchEngine(){
    clearInterval()
    started = false;
    stopped = false;
    hoursCounter = 0o0
    minutesCounter = 0o0
    secondsCounter = 0o0
    restart = true;
    let timeFormatElement = `<h3>00:<sub>Hrs</sub></h3>
                            <h3>00:<sub>Min</sub></h3>
                            <h3>00:<sub>Sec</sub></h3>`
    const timeHolder = document.getElementsByClassName("time-holder")[0];
    timeHolder.innerHTML = timeFormatElement;

    const startButton = document.getElementById("start")
    startButton.innerHTML = "Start"

    const stopPlayButton = document.getElementById("stop")
    stopPlayButton.innerHTML = "Stop"


}