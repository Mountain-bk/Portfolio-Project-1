
//---Slide Carousel Image when you click arrow button---//
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


//---Toggle Mobile Menu---//

function toggleMobileMenu(){
  var body = document.body;
  window.scroll(0,0);
  body.style.transition = ".5s ease";
  body.classList.toggle("shrink-page");
};

//---Display Order Date---//

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

//---Change text of "Delivery Estimated" Time if it's closed---//
const timeValue = document.querySelector(".time-value");
if(timeValue){
  if(date.getHours() < 11){
    timeValue.innerHTML = "We accept online orders between 11am - 12am. Please select specified date."
  }
}

//---Change ASAP button to closed script if it's closed---//
const closedText = document.querySelector(".asap");
const intro = document.querySelector(".intro");
if(closedText){
  if(date.getHours() < 11){
    closedText.remove();
    intro.innerHTML = "This store is currently closed. Please select an order time below."
  };
}

//---Toggle check-mark or cross-mark based on selections---//

const selectors = document.querySelectorAll("#selector");
const checkMark = document.querySelector(".time-mark");
selectors.forEach(select =>{
  select.addEventListener("click", () =>{
  if (timeRange[0].options[timeRange[0].selectedIndex].text === "Select Time"){
    checkMark.src = "images/cross.png";
  } else{
    checkMark.src = "images/check.png";
  }
});
});

//---Display Pick Up Order Time---//

//Select time select//
const timeRange = document.getElementsByClassName("time-selector");
//Pass in current minute//
var currentMinute = giveCurrentMinute();
//Pass in current hour//
var readyHour = giveOrderHour();
//Create available order time//
var readyTime = readyHour + currentMinute   //Set time after 30 minutes from current time
if (timeRange[0]){
  if(date.getHours() < 11){
    timeRange[0].options[0] = new Option("Select Time");
    checkMark.src = "images/cross.png";
  } else{
    timeRange[0].options[0] = new Option("ASAP");
  }
  //Create option each 15 minutes
  for(var term = readyTime; term < 1440; term+=15){
    var text = createTimeText(term);
    //Add options to time select
    timeRange[0].options[timeRange[0].options.length] = new Option(text);
  };
}

function createTimeText(key){
  //Set starting time of the interval
  var intervalStart = setIntervalStart(key);
  //Set end time of the interval
  var intervalEnd = setIntervalEnd(key);
  //Text for the options
  var text = intervalStart + " - " + intervalEnd;
  if (document.title === "Delivery Order Time"){
    return intervalStart
  } else if (document.title === "Pick Up Order Time")
  return text
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
    //convert 60 to 00
    var limitHour = hour + 1;
    limitMinute = "00";
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
    //return 11am if current hour is before 11am
    return (11*60)
  } else{
    //return current hour if current hour is after 11am
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
        var text = createTimeText(term);
        timeRange[0].options[timeRange[0].options.length] = new Option(text);
      };
    } else{
      timeRange[0].options[0] = new Option("Select Time");
      for(var term = 660; term < 1440; term+=15){
        var text = createTimeText(term);
        timeRange[0].options[timeRange[0].options.length] = new Option(text);
      };
    }
  });
}

//---Add position fixed when the cart menu reaches to top of the screen---///
const menu = document.querySelector(".menu-wrapper");
const footer = document.querySelector(".footer");
var cart = document.querySelector(".cart");
window.addEventListener("scroll", () =>{
  var scrollTop = window.pageYOffset;
  var menuScrollTop = menu.offsetTop;
  var menuScrollBottom = menuScrollTop + menu.offsetHeight;
  var footerScrollTop = footer.offsetTop;
  //console.log(scrollTop + window.innerHeight);
  if(scrollTop >= menuScrollTop){
    cart.style.position = "fixed";
  } else if (scrollTop <= menuScrollTop){
    cart.style.position = "absolute";
  }
  if (scrollTop + window.innerHeight >= footerScrollTop){
    cart.style.position = "absolute";
    cart.style.bottom = "0";
  }
})

//---Products Lists---//

let beverages = [
  {
    name : "Buffalo Wings",
    price : 6,
    tax : 0.6,
    inCart : 0
  },
  {
    name : "Value Set(Hamburger, French Fries, Drink)",
    price : 8,
    tax : 0.8,
    inCart : 0
  },
  {
    name : "Fried Chicken",
    price : 7,
    tax : 0.7,
    inCart : 0
  },
  {
    name : "Nachos",
    price : 4,
    tax : 0.4,
    inCart : 0
  },
  {
    name : "Hamburger",
    price : 5,
    tax : 0.5,
    inCart : 0
  },
  {
    name : "French Fries",
    price : 4,
    tax : 0.4,
    inCart : 0
  },
  {
    name : "Coke(500ml)",
    price : 2,
    tax : 0.2,
    inCart : 0
  },
  {
    name : "Beer(Bottle)",
    price : 5,
    tax : 0.5,
    inCart : 0
  },
];

//---Add to Local Storage---//
const addCartBtn = document.querySelectorAll(".add-cart");
for (let i=0; i < addCartBtn.length; i++){
  addCartBtn[i].addEventListener("click", () => {
    addCartNumbers();
    //addbeverages(beverages[i]);
    addBeverages(beverages[i]);
    addTax(beverages[i]);
    addTotalPrice(beverages[i]);
  })
};

function addCartNumbers(){
  let cartQuantity = localStorage.getItem("cartNumbers");
  cartQuantity = parseInt(cartQuantity);
  //If beverages are stored in local storage
  if (cartQuantity){
    //Add quantity to cart
    localStorage.setItem("cartNumbers", cartQuantity + 1);
  //If nothing are stored in local storage
  } else{
    //Set first beverage to the cart
    localStorage.setItem("cartNumbers", 1);
  }
}
function addbeverages(beverage){
  let beverages = localStorage.getItem("beverageInCart");
  beverages = parseInt(beverages);
  if(beverages){
    if(beverage == beverages){
      beverags.inCart + 1;
    } else{
      beverage.inCart += 1;
      localStorage.setItem("beverageInCart", beverages + JSON.stringify(beverage));
    }
  }else{
    beverage.inCart += 1;
    localStorage.setItem("beverageInCart", JSON.stringify(beverage));
  }

}

function addBeverages(beverage){
  let beverageName = beverage.name;
  beverage.inCart += 1;
  //beverage.price = (beverage.inCart) * beverage.price;
  localStorage.setItem(beverageName, JSON.stringify(beverage));
}
function addTotalPrice(beverage){
  let totalPrice = localStorage.getItem("TotalPrice");
  totalPrice = JSON.parse(totalPrice);
  let addPrice = beverage.price + beverage.tax;
  //If prices are stored in local storage
  if (totalPrice){
    //Add price
    localStorage.setItem("TotalPrice", (totalPrice + addPrice).toFixed(2));
  //If nothing are stored in local storage
  } else{
    //Set first price to the cart
    localStorage.setItem("TotalPrice", addPrice);
  }
}

function addTax(beverage){
  let totalTax = localStorage.getItem("TotalTax");
  totalTax = JSON.parse(totalTax);
  if (totalTax){
    console.log(typeof totalTax);
    localStorage.setItem("TotalTax", (totalTax + beverage.tax).toFixed(2));
  } else{
    localStorage.setItem("TotalTax", beverage.tax);
  }
}
