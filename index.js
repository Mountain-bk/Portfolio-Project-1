
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
if(dateRange[0]){
  for(var day = 0; day < 31; day++) {
    //refreshing date
    let date = new Date();
    //setting date(day)
    date.setDate(date.getDate() + day);
    //creating option
    var option = document.createElement("option");
    //making text of the option
    option.text = date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
    //choosing the value of the option
    option.value = day;
    //append the option
    dateRange[0].appendChild(option);
    //dateRange[0].options[dateRange[0].options.length] = new Option([date.getDate(), monthNames[date.getMonth()], date.getFullYear()].join('-'), date.toISOString());
  }
}




//---Display Order Time---//

//Select time select//
const timeRange = document.getElementsByClassName("time-selector");
//Pass in current minute//
var currentMinute = giveCurrentMinute();
//Pass in current hour//
var readyHour = giveOrderHour();
//Create available order time//
var readyTime = readyHour + currentMinute   //Set time after 30 minutes from current time
if (timeRange[0]){
  //Create option each 15 minutes
  for(var term = readyTime; term < 1440; term+=15){
    //Set starting time of the interval
    var intervalStart = setIntervalStart(term);
    //Set end time of the interval
    var intervalEnd = setIntervalEnd(term);
    //Text for the options
    var text = intervalStart + " - " + intervalEnd;
    //Add options to time select
    timeRange[0].options[timeRange[0].options.length] = new Option(text);
  };
}

function setIntervalStart(key){
  var hour = Math.floor(key / 60);
  var minute = key % 60;
  if (minute == 0){
    minute = "0" + minute;
  }
  var startTime = hour + ":" + minute;
  return startTime
}
function setIntervalEnd(key){
  var hour = Math.floor(key / 60);
  var minute = key % 60;
  var limitMinute = minute + 15;
  if (limitMinute == 60){
    var limitHour = hour + 1;
    limitMinute = 00;
  } else {
    var limitHour = hour;
  }
  var limitTime = limitHour + ":" + limitMinute;
  return limitTime
}

function giveOrderHour(){
  var totalMinute = (date.getHours() * 60);
  var currentHour = date.getHours()
  if (currentHour < 11){
    return (11*60)
  } else{
    return totalMinute
  }
}

function giveCurrentMinute(){
  var currentMinute = date.getMinutes();
  var currentHour = date.getHours();
  if (currentHour == 10 && currentMinute > 30){
    return 30
  } else if (currentHour < 11){
    return 0
  } else{
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
}


//Change time option depends on order date//
if (dateRange[0]){
  dateRange[0].addEventListener("change", () => {
    var x = timeRange[0].length;
    for (var i = x-1; i >= 0; i--){
      timeRange[0].remove(i);
    };
    if (dateRange[0].options[dateRange[0].selectedIndex].text == date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear()){
      timeRange[0].options[0] = new Option("ASAP");
      for(var term = readyTime; term < 1440; term+=15){
        var intervalStart = setIntervalStart(term);
        var intervalEnd = setIntervalEnd(term);
        var text = intervalStart + " - " + intervalEnd;
        timeRange[0].options[timeRange[0].options.length] = new Option(text);
      };
    } else{
      timeRange[0].options[0] = new Option("Select Time");
      timeRange[0].options[0].disabled = true;
      for(var term = 660; term < 1440; term+=15){
        var intervalStart = setIntervalStart(term);
        var intervalEnd = setIntervalEnd(term);
        var text = intervalStart + " - " + intervalEnd;
        timeRange[0].options[timeRange[0].options.length] = new Option(text);
      };
    }
  });
}
