
//Slide Carousel Image when you click arrow button
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-image");
const carouselContainer = document.querySelector(".carousel-container");
const carouselBanner = document.querySelectorAll(".banner");

let counter = 0;
let size = window.innerWidth

const nextBtn = document.querySelector(".carousel-button-right");
if (nextBtn){
  nextBtn.addEventListener("click", () => {
    carouselSlide.style.transition = ".8s ease";
    counter++;
    if (counter === 3){
      carouselSlide.style.transform = "translateX(" + (-size * 0) + "px)";
      counter = 0;
    } else{
      carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
  });
}

const prevBtn = document.querySelector(".carousel-button-left");
if (prevBtn){
  prevBtn.addEventListener("click", () => {
    carouselSlide.style.transition = ".8s ease";
    counter--;
    if (counter === -1){
      carouselSlide.style.transform = "translateX(" + (-size * 2) + "px)";
      counter = 2;
    } else{
      carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
  });
}


//Toggle Mobile Menu//
function toggleMobileMenu(){
  var body = document.body;
  window.scroll(0,0);
  body.style.transition = ".5s ease";
  body.classList.toggle("shrink-page");
};

//Display Order Date//
const dateRange = document.getElementsByClassName("date-selector");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let date = new Date();
setDate();

function setDate(){
  for(var day = 0; day < 31; day++) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  dateRange[0].options[dateRange[0].options.length] = new Option([date.getDate(), monthNames[date.getMonth()], date.getFullYear()].join('-'), date.toISOString());
  dateRange[0].style.width = "90%";
  dateRange[0].style.height = "40px";
}
}

//Display Order Time//
const timeRange = document.getElementsByClassName("time-selector");
var currentMinute = giveCurrentMinute();
var readyTime = (date.getHours() * 60) + currentMinute   //Set the ready time after 30 minutes

for(var term = readyTime; term < 1440; term+=15){  //Create option each 15 minutes
  setTime(term);
};

function setTime(key){
  var hour = Math.floor(key / 60);                //get the hour
  var minute = key % 60;                          //Get the minute
  var limitMinute = minute + 15;                   //Add 15 minutes for duration minute
  if (limitMinute == 60){                         //Change the hour if its 60 minutes
    var limitHour = hour + 1;
    limitMinute = 00;
  } else {
    var limitHour = hour;                         //Don't change the hour(not 60 minute)
  }
  if (minute == 0){                               //Add 0 if minute is 0
    minute = "0" + minute;
  } else if (limitMinute == 0){
    limitMinute = "0" + limitMinute;
  }
  var startTime = hour + ":" + minute;            //Create starting time
  var limitTime = limitHour + ":" + limitMinute;  //Creating limit time
  timeRange[0].options[timeRange[0].options.length] = new Option(startTime + " - " + limitTime);
  timeRange[0].style.width = "90%";
  timeRange[0].style.height = "40px";
}

function giveCurrentMinute(){
  var currentMinute = date.getMinutes();
  if (currentMinute <= 15){
    return 45
  } else if (currentMinute <= 30 && currentMinute > 15){
    return 60
  } else if (currentMinute <= 45 && currentMinute > 30){
    return 75
  } else if (currentMinute <= 60 && currentMinute > 45){
    return 90
  }
}

//Change time option depends on order date//
dateRange[0].addEventListener("change", () => {
  var x = timeRange[0].length;
  for (var i = x-1; i >= 0; i--){
    timeRange[0].remove(i);
  };
  if (dateRange[0].options[dateRange[0].selectedIndex].text == date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear()){
    timeRange[0].options[0] = new Option("ASAP");
    for(var term = readyTime; term < 1440; term+=15){
      setTime(term);
    };
  } else{
    timeRange[0].options[0] = new Option("Select Time");
    timeRange[0].options[0].disabled = true;
    for(var term = 600; term < 1440; term+=15){
      setTime(term);
    };
  }
});

