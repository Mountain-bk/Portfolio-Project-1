//---Alert Process---//
const alertModal = document.querySelector(".alert-modal");
const alertCloseBtn = document.querySelector(".alert-close-btn");
const alertMessage = document.querySelector(".alert-message");

//Close alert message//
if(alertCloseBtn){
  alertCloseBtn.addEventListener("click", () =>{
    closeAlertModal();
  });
}

function openAlertModal(){
  alertModal.style.visibility = "visible";
  alertModal.style.opacity = "1";
}

function closeAlertModal(){
  alertModal.style.visibility = "hidden";
  alertModal.style.opacity = "0";
  if(alertMessage.innerHTML === "<p>Please select order type</p>"){
    document.location.href = "select-order-type.html";
  }else if(alertMessage.innerHTML === "<p>Please select order Time and Date</p>"){
    document.location.href = "select-order-type.html";
  }else if(alertMessage.innerHTML === "<p>Please add item to cart</p>"){
    document.location.href = "menu.html";
  }else if(alertMessage.innerHTML = "<p>Your session has expired. Please restart your order</p>"){
    document.location.href = "index.html";
  }
}

//Refresh date and time after 10 minutes if user select not-ASAP//
if(localStorage.getItem("orderTime")){
  removeOrderTerm();
}

function removeOrderTerm(){
  if(localStorage.getItem("orderTime") != "ASAP"){
    setTimeout(removeSelectedTerm, 600000);
  }
}

function removeSelectedTerm(){
  localStorage.removeItem("orderTime");
  localStorage.removeItem("orderDate");
}

//Refresh the local storage if there is 15 minutes of idle time//
let userActivityTimeout = null;

//Function to reset user inactivity time//
function resetUserActivityTimeOut(){
  clearTimeout(userActivityTimeout);
  userActivityTimeout = setTimeout(() =>{
    inactiveUserAction();
  },900000);
}

//Function what will happen when user action is inactive//
function inactiveUserAction(){
  localStorage.clear();
  openAlertModal();
  alertMessage.innerHTML = "<p>Your session has expired. Please restart your order</p>";
}

//Function which will reset inactivity timeout(event which will start the timer)//
function activateActivityTracker(){
  window.addEventListener("scroll", resetUserActivityTimeOut);
  window.addEventListener("keydown", resetUserActivityTimeOut);
  window.addEventListener("load", resetUserActivityTimeOut);
  window.addEventListener("click", resetUserActivityTimeOut);
  window.addEventListener("pagehide", resetUserActivityTimeOut);
}

//If products are in cart, start the timer//
if(localStorage.getItem("shoppingCart")){
  activateActivityTracker();
}

//---Alert if cart is empty---//
const paymentBarBtn = document.querySelector(".payment-bar-btn");
const paymentBtn = document.querySelector(".payment-btn");
const paymentNavBtn = document.querySelector(".place-order-btn");

//alert message for payment bar btn//
if(paymentBarBtn){
  paymentBarBtn.addEventListener("click", () =>{
    if(localStorage.getItem("shoppingCart") && localStorage.getItem("orderDate") && localStorage.getItem("orderTime")){
      paymentBarBtn.setAttribute("href", "payment.html");
    }else if(localStorage.getItem("shoppingCart") === null){
      paymentBarBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }else if(localStorage.getItem("orderDate") === null && localStorage.getItem("orderTime") === null){
      paymentBarBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please select order type</p>";
    }else{
      paymentBarBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }
  });
};

//alert message for payment btn(desktop)//
if(paymentBtn){
  paymentBtn.addEventListener("click", () =>{
    if(localStorage.getItem("shoppingCart") && localStorage.getItem("orderDate") && localStorage.getItem("orderTime")){
      paymentBtn.setAttribute("href", "payment.html");
    }else if(localStorage.getItem("shoppingCart") === null){
      paymentBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }else if(localStorage.getItem("orderDate") === null && localStorage.getItem("orderTime") === null){
      paymentBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please select order type</p>";
    }else{
      paymentBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }
  });
};

//alert message for payment nav btn(mobile)//
if(paymentNavBtn){
  paymentNavBtn.addEventListener("click", () =>{
    if(localStorage.getItem("shoppingCart") && localStorage.getItem("orderDate") && localStorage.getItem("orderTime")){
      paymentNavBtn.setAttribute("href", "payment.html");
    }else if(localStorage.getItem("shoppingCart") === null){
      paymentNavBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }else if(localStorage.getItem("orderDate") === null && localStorage.getItem("orderTime") === null){
      paymentNavBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please select order type</p>";
    }else{
      paymentNavBtn.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }
  });
};


//---Carousel (Top page)---//
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-image");
const carouselContainer = document.querySelector(".carousel-container");
const carouselBanner = document.querySelectorAll(".banner");


let size = window.visualViewport.width

//Slide next image when click arrow//
const nextBtn = document.querySelector(".carousel-button-right");
const prevBtn = document.querySelector(".carousel-button-left");

if(nextBtn){
  nextBtn.addEventListener("click", () =>{
    var banner = carouselBanner.length;
    size = window.visualViewport.width;
    var limitWidth = (carouselSlide.offsetWidth / banner) * (banner - 1);
    //console.log(carouselContainer.scrollLeft);
    //console.log(carouselSlide.offsetWidth);
    if(carouselContainer.scrollLeft == limitWidth){
      carouselContainer.scrollBy(-carouselContainer.scrollWidth, 0);
    } else{
      carouselContainer.scrollBy(size, 0);
    }
  });
}

if(prevBtn){
  prevBtn.addEventListener("click", () =>{
    var banner = carouselBanner.length;
    size = window.visualViewport.width;
    if(carouselContainer.scrollLeft == 0){
      carouselContainer.scrollBy(carouselContainer.scrollWidth, 0);
    } else{
      carouselContainer.scrollBy(-size, 0);
    }
  });
}

//Slide automatically every 5seconds//
if(carouselContainer){
  setInterval(automaticCarousel, 5000);
};

function automaticCarousel(){
  size = window.visualViewport.width
  var banner = carouselBanner.length;
  var limitWidth = (carouselSlide.offsetWidth / banner) * (banner - 1);
  if(carouselContainer.scrollLeft == limitWidth){
    carouselContainer.scrollBy(-carouselContainer.scrollWidth, 0);
  } else{
    carouselContainer.scrollBy(size, 0);
  }
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

//---Display Pick Up Order Time---//
const timeRange = document.getElementsByClassName("time-selector");
const checkMark = document.querySelector(".time-mark");
//Pass in current minute//
var currentMinute = giveCurrentMinute();
//Pass in current hour//
var readyHour = giveOrderHour();
//Create available order time//
var readyTime = readyHour + currentMinute   //Set time after 30 minutes from current time
if (timeRange[0]){
  //When current hour is before 11
  if(date.getHours() < 11){
    timeRange[0].options[0] = new Option("Select Time");
    checkMark.src = "images/cross.png";
  //When current hour is after 11
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

//Toggle check-mark or cross-mark based on selections//
if(timeRange[0]){
  window.addEventListener("change", () =>{
    if(timeRange[0].options[timeRange[0].selectedIndex].text === "Select Time"){
      checkMark.src = "images/cross.png";
    } else{
      checkMark.src = "images/check.png";
    }
  });
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
    //When date is today//
    if (dateRange[0].options[dateRange[0].selectedIndex].text == date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear()){
      //When hour is before 11//
      if(date.getHours() < 11){
        timeRange[0].options[0] = new Option("Select Time");
        for(var term = readyTime; term < 1440; term+=15){
          var text = createTimeText(term);
          timeRange[0].options[timeRange[0].options.length] = new Option(text);
        };
      //When hour is after 11
      } else if(date.getHours() >= 11){
        timeRange[0].options[0] = new Option("ASAP");
        for(var term = readyTime; term < 1440; term+=15){
          var text = createTimeText(term);
          timeRange[0].options[timeRange[0].options.length] = new Option(text);
        };
      }
    //When date is not today
    } else{
      timeRange[0].options[0] = new Option("Select Time");
      for(var term = 660; term < 1440; term+=15){
        var text = createTimeText(term);
        timeRange[0].options[timeRange[0].options.length] = new Option(text);
      };
    }
  });
}

//---Set order-date and order-time---//

//Set when you click next button//
const next = document.querySelector(".next");
if(next){
  next.addEventListener("click", () =>{
    var orderDate = dateRange[0].options[dateRange[0].selectedIndex].text;
    var orderTime = timeRange[0].options[timeRange[0].selectedIndex].text;
    if(orderTime === "Select Time"){
      next.removeAttribute("href");
      openAlertModal();
      alertMessage.innerHTML = "<p>Please Select Time</p>";
    }else{
      next.setAttribute("href", "menu.html");
      localStorage.setItem("orderDate", orderDate);
      localStorage.setItem("orderTime", orderTime);
      if(document.title == "Delivery Order Time"){
        localStorage.setItem("orderType", "Delivery");
      }else if(document.title == "Pick Up Order Time"){
        localStorage.setItem("orderType", "Pick Up");
      }
    }
  });
}


//Set order term when you click ASAP button//
const asap = document.querySelector(".a-asap");
if(asap){
  asap.addEventListener("click", () =>{
    var todayDate = date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
    localStorage.setItem("orderDate", todayDate);
    localStorage.setItem("orderTime", "ASAP");
    if(document.title == "Delivery Order Time"){
      localStorage.setItem("orderType", "Delivery");
    }else if(document.title == "Pick Up Order Time"){
      localStorage.setItem("orderType", "Pick Up");
    }
  });
}





//---Add position fixed when the cart menu reaches to top of the screen---///
const menu = document.querySelector(".menu-wrapper");
const screenCart = document.querySelector(".cart");
if(menu){
  if(window.innerWidth > 690){
    window.addEventListener("scroll", () =>{
      var scrollTop = window.pageYOffset;
      var menuScrollTop = menu.offsetTop;
      var menuScrollBottom = menuScrollTop + menu.offsetHeight;
      if(scrollTop >= menuScrollTop){
        screenCart.style.position = "fixed";
        screenCart.style.top = "0";
      } else if (scrollTop <= menuScrollTop){
        screenCart.style.position = "absolute";
      }
      if (menuScrollBottom - scrollTop <= screenCart.offsetHeight){
        screenCart.style.position = "absolute";
        screenCart.style.top = "initial";
        screenCart.style.bottom = "0";
      }
    });
  }
}



//---Shopping Cart API---//
var shoppingCart = (() => {
  cart = [];
  function Item(name, details, price, tax, count){
    this.product = name;
    this.details = details;
    this.price = price;
    this.tax = tax;
    this.count = count;
  }
  //Set item to local storage
  function saveCart(){
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    if(localStorage.getItem("shoppingCart") == "[]"){
      localStorage.removeItem("shoppingCart");
    }
  }

  function loadCart(){
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }

  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  var obj = {};
  //Add item to the local storage//
  obj.addItemInCart = function(name, details, price, tax, count){
    for (var item in cart){
      if(cart[item].product === name){
        cart[item].count = Number(cart[item].count) + Number(count);
        saveCart();
        return;
      }
    }
    var item = new Item(name, details, price, tax, count);
    cart.push(item);
    saveCart();
  }
  //Remove Item from cart//
  obj.removeItemFromCart = function(name){
    for(var item in cart){
      if(cart[item].product === name){
        cart.splice(item, 1);
      }
    }
    saveCart();
  }

  obj.setNewItemCount = function(name, count){
    for(var item in cart){
      if(cart[item].product === name){
        cart[item].count = count;
        if(cart[item].count == 0){
          cart.splice(item, 1);
        }
      }
    }
    saveCart();
  }

  //List cart//
  obj.listCart = () =>{
    //create copy of cart
    var cartCopy = [];
    //access to all the items in cart
    for(i in cart){
      //select item in cart
      item = cart[i];
      //create copy of item
      itemCopy = {};
      //access to all the property in item
      for(p in item){
        //copy all the property
        itemCopy[p] = item[p];
      }
      //
      itemCopy.total = Number((item.price + item.tax) * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  }
  //Total Tax in cart//
  obj.totalTax = () =>{
    var totalTax = 0;
    for(var item in cart){
      totalTax += cart[item].tax * cart[item].count;
    }
    return totalTax
  }
  //Total Price in cart//
  obj.totalAmount = () =>{
    var totalPrice = 0;
    var totalAmount = 0;
    var totalTax = 0;
    for(var item in cart){
      totalPrice += cart[item].price * cart[item].count;
      totalTax += cart[item].tax * cart[item].count;
      totalAmount = totalPrice + totalTax;
    }
    return totalAmount
  }

  return obj;
})();


//---Display Cart---//
const orderBeverage = document.querySelector(".order-beverages");
const totalTax = document.querySelector(".tax-amount");
const totalPrice = document.querySelector(".total-amount");

function animateDisplay(){
  orderBeverage.style.opacity = "0";
  setTimeout(displayCart, 300);
  setTimeout(appearDisplay, 300);
}

function appearDisplay(){
  orderBeverage.style.opacity = "1";
}

function displayCart(){
  var cartArray = shoppingCart.listCart();
  var output = " ";
  for(var i in cartArray){
    output +=
    "<div class='order-beverages-details'>" +
      "<div class='order-name-price'>" +
        "<div class='order-name'>" +
          "<h4>" + cartArray[i].product + " x " + cartArray[i].count + "</h4>" +
          "<p>" + cartArray[i].details + "</p>" +
        "</div>" +
        "<div class='order-price'>" +
          "<h4>" + "$" + cartArray[i].price * cartArray[i].count + "</h4>" +
          "<p>(plus tax)</p>" +
        "</div>" +
      "</div>" +
      "<div class='remove-edit-container'>" +
        "<button class='remove-btn' type='button' data-name='" + cartArray[i].product + "'data-price=" + cartArray[i].price + ">REMOVE</button>" +
        "<button class='edit-btn' type='button' data-name='" + cartArray[i].product + "'data-price=" + cartArray[i].price + ">EDIT</button>" +
      "</div>" +
    "</div>"
  };
  orderBeverage.innerHTML = output;
  totalTax.innerHTML = "$" + shoppingCart.totalTax().toFixed(2);
  totalPrice.innerHTML = "$" + shoppingCart.totalAmount().toFixed(2);
}


//---Open Modal---//
const selectBtn = document.querySelectorAll(".select-btn");
const modal = document.querySelector(".modal");
const modalProductName = document.querySelector(".modal-product-name");
const modalPriceText = document.querySelector(".modal-price-text");
const modalImageContainer = document.querySelector(".modal-img-container");
const modalAddCartContainer = document.querySelector(".add-cart-container");
const modalSaveChangesContainer = document.querySelector(".save-changes-container");
const quantityContainer = document.querySelector(".quantity-container");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const editMinusBtn = document.querySelector(".edit-minus-btn");
const editPlusBtn = document.querySelector(".edit-plus-btn");
const modalAddCart = document.querySelector(".modal-add-cart");
const modalEditCart = document.querySelector(".modal-edit-cart");
const cartContainer = document.querySelector(".cart-container");
const paymentCartContainer = document.querySelector(".payment-cart-container");

//Show Add Cart Modal//
for(let i = 0; selectBtn.length > i; i++){
  selectBtn[i].addEventListener("click", () =>{
    showAddCartModal(selectBtn[i]);
  })
};

function showAddCartModal(selectedItem){
  modalAddCart.style.display = "flex";
  modalEditCart.style.display = "none";
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  var modalName = selectedItem.getAttribute("data-name");
  modalProductName.innerHTML = modalName;
  var modalDetails = selectedItem.getAttribute("data-details");
  var modalPrice = Number(selectedItem.getAttribute("data-price")).toFixed(2);
  modalPriceText.innerHTML = "$" + modalPrice;
  modalImageContainer.innerHTML = "<img class='modal-image' src='images/" + modalName + ".jpg'>";
  modalAddCartContainer.innerHTML = "<button data-name='" + modalName + "' data-details='" + modalDetails + "' data-price=" + modalPrice + " class='add-cart' type='button'>Add Cart</button>";
  inputCount.value = 1;
}

//Add to cart//
if(modalAddCartContainer){
  modalAddCartContainer.addEventListener("click", function(e){
    if(e.target.matches(".add-cart")){
      var name = e.target.getAttribute("data-name");
      var details = e.target.getAttribute("data-details");
      var count = Number(inputCount.value);
      var price = Number(e.target.getAttribute("data-price"));
      var tax = price / 10;
      shoppingCart.addItemInCart(name, details, price, tax, count);
      closeModal();
      animateDisplay();
      if(window.innerWidth <= 690){
        changeToCloseCartBtn();
      }
      }
  });
}

//---Remove Specific Items or Edit specific items from the cart---//
if(orderBeverage){
  orderBeverage.addEventListener("click", function(e){
    if(e.target.matches(".remove-btn")){
      orderBeverage.style.opacity = "0";
      var name = e.target.getAttribute("data-name");
      shoppingCart.removeItemFromCart(name);
      animateDisplay();
    } else if(e.target.matches(".edit-btn")){
      showEditCartModal(e.target);

    }
  });
}

function showEditCartModal(selectedItem){
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  modalAddCart.style.display = "none";
  modalEditCart.style.display = "flex";
  var modalName = selectedItem.getAttribute("data-name");
  var i = JSON.parse(localStorage.getItem("shoppingCart"));
  for (var item in i){
    if(i[item].product === modalName){
      var count = i[item].count;
      modalProductName.innerHTML = modalName;
      var modalPrice = Number(selectedItem.getAttribute("data-price")).toFixed(2);
      modalPriceText.innerHTML = "$" + modalPrice;
      modalImageContainer.innerHTML = "<img class='modal-image' src='images/" + modalName + ".jpg'>";
      cartCount.value = count;
      modalSaveChangesContainer.innerHTML = "<button data-name='" + modalName + "' data-price=" + modalPrice + " class='save-changes' type='button'>Save Changes</button>";
    }
  }
}

//---Change number of items in add cart---//
const inputCount = document.querySelector(".input-count");

if(inputCount){
  //-1 add cart item
  minusBtn.addEventListener("click", () =>{
  if(inputCount.value == 1){
    inputCount.value = 1;
  } else{
    inputCount.value = Number(inputCount.value) - 1;
  }
});
  //+1 add cart item
  plusBtn.addEventListener("click", () =>{
    inputCount.value = Number(inputCount.value) + 1;
});
}


//Change number of items in edit cart//
const cartCount = document.querySelector(".cart-count");

if(cartCount){
  //-1 edit cart item
  editMinusBtn.addEventListener("click", () =>{
    var name = modalProductName.innerHTML;
    if(cartCount.value == 0){
      cartCount.value = 0;
    } else{
      cartCount.value = Number(cartCount.value) - 1;
    }
  });
  //+1 edit cart item
  editPlusBtn.addEventListener("click", () =>{
    var name = modalProductName.innerHTML;
    cartCount.value = Number(cartCount.value) + 1;
  });
}


//---Save changes of cart---//
if(modalSaveChangesContainer){
  modalSaveChangesContainer.addEventListener("click", function(e){
    if(e.target.matches(".save-changes")){
      var name = modalProductName.innerHTML;
      var newCartCount = cartCount.value;
      shoppingCart.setNewItemCount(name, newCartCount);
      closeModal();
      animateDisplay();
      }
  });
}


//Close Modal(Add Cart, Edit Cart, Shopping Cart)//
const closeBtn = document.querySelector(".close-btn");
if(closeBtn){
  closeBtn.addEventListener("click", ()=>{
    closeModal();
  });
}
function closeModal(){
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
}


//Display the cart everytime when you load in desktop//
if(orderBeverage){
  animateDisplay();
}

//---Open cart (mobile)---//
const mobileCartBtn = document.querySelector(".cart-total-btn");
const cartNavPrice = document.querySelector(".cart-nav-price");
const mobileCartBtnPayment = document.querySelector(".payment-cart-btn");
const paymentMobileNav = document.querySelector(".payment-mobile-cart-nav");
const mobilePaymentCloseBtn = document.querySelector(".payment-cart-total-btn");

//Open cart (menu page)//
const menuMain = document.querySelector(".menu-main");
if(mobileCartBtn){
  displayTotalAmount();
  mobileCartBtn.addEventListener("click", () =>{
    if(mobileCartBtn.innerHTML == "<p>Close Cart</p>"){
      cartContainer.style.display = "none";
      mobileCartBtn.innerHTML =
      "<i class='fas fa-shopping-cart'></i>" +
      "<span class='cart-nav-text'>total</span>" +
      "<span class='cart-nav-price'>" + "$" + shoppingCart.totalAmount().toFixed(2) + "</span>";
      menuMain.setAttribute("style","-ms-touch-action: auto;");
    } else{
      changeToCloseCartBtn();
      menuMain.setAttribute("style","-ms-touch-action: none;");
    }
  });
}

//Display total amount in nav cart//
function displayTotalAmount(){
  cartNavPrice.innerHTML = "$" + shoppingCart.totalAmount().toFixed(2);
}

//Change to close button when the nav cart is open//
function changeToCloseCartBtn(){
  if(cartContainer){
    cartContainer.style.display = "block";
    mobileCartBtn.innerHTML = "";
    mobileCartBtn.innerHTML = "<p>Close Cart</p>";
  }else if(paymentCartContainer){
    paymentCartContainer.style.display = "block";
  }
}

//Open cart (mobile payment page)//
if(mobileCartBtnPayment){
  mobileCartBtnPayment.addEventListener("click", () =>{
    if(mobileCartBtnPayment.innerHTML == "<p>Close Cart</p>"){
      paymentCartContainer.style.display = "none";
      mobileCartBtnPayment.innerHTML = "cart"
    } else{
      changeToCloseCartBtn();
      paymentMobileNav.style.display = "block";
    }
  });
}

//Close cart (mobile payment page)//
if(mobilePaymentCloseBtn){
  mobilePaymentCloseBtn.addEventListener("click", () =>{
    paymentCartContainer.style.display = "none";
    paymentMobileNav.style.display = "none";
  });
};


//---Toggle cart either mobile or desktop---//
if(cartContainer){
  window.addEventListener("resize", () =>{
    if(window.innerWidth > 690){
        cartContainer.style.display = "block";
        changeToCloseCartBtn();
    }else if(window.innerWidth === 690){
        cartContainer.style.display = "none";
        mobileCartBtn.innerHTML =
        "<i class='fas fa-shopping-cart'></i>" +
        "<span class='cart-nav-text'>total</span>" +
        "<span class='cart-nav-price'>" + "$" + shoppingCart.totalAmount().toFixed(2) + "</span>";
    }
  });
}

if(paymentCartContainer){
  window.addEventListener("resize", () =>{
    if(window.innerWidth > 690){
      paymentCartContainer.style.display = "block";
      changeToCloseCartBtn();
    } else if(window.innerWidth === 690){
      paymentCartContainer.style.display = "none";
    }
  });
}

//---Confirmation Process---//
const confirmBtn = document.querySelector(".confirm-payment-btn");
const confirmModal = document.querySelector(".confirmation-modal");
const paymentCloseBtn = document.querySelector(".confirm-close-btn");
const inputName = document.querySelector("#customer-name");
const inputPhone = document.querySelector("#customer-phone");
const inputEmail = document.querySelector("#customer-email");

if(confirmBtn){
  confirmBtn.addEventListener("click", () =>{
    if(localStorage.getItem("orderDate") && localStorage.getItem("orderTime") && localStorage.getItem("shoppingCart") && inputName.value != "" && inputPhone.value != "" && inputEmail.value != ""){
      confirmModal.style.visibility = "visible";
      confirmModal.style.opacity = "1";
    }else if(localStorage.getItem("orderDate") === null && localStorage.getItem("orderTime") === null){
      openAlertModal();
      alertMessage.innerHTML = "<p>Please select order Time and Date</p>";
    }else if(localStorage.getItem("shoppingCart") === null){
      openAlertModal();
      alertMessage.innerHTML = "<p>Please add item to cart</p>";
    }else{
      if(inputName.value == ""){
        openAlertModal();
        alertMessage.innerHTML = "<p>Please input your name</p>";
      }else if(inputPhone.value == ""){
        openAlertModal();
        alertMessage.innerHTML = "<p>Please input your phone number</p>";
      }else if(inputEmail.value == ""){
        openAlertModal();
        alertMessage.innerHTML = "<p>Please input your email address</p>";
      }else{
        openAlertModal();
        alertMessage.innerHTML = "<p>Please select order Time and Date</p>";
      }
    }
  });
}


//Close Modal(Payment Confirmation)//

if(paymentCloseBtn){
  paymentCloseBtn.addEventListener("click", ()=>{
    closeConfirmationModal();
    inputName.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    localStorage.clear();
    document.location.href = "index.html";
  });
}
function closeConfirmationModal(){
  confirmModal.style.visibility = "hidden";
  confirmModal.style.opacity = "0";
}


//---Display order date time details(payment page)---//
const orderDateDetails = document.querySelector(".order-date-details");
const orderTypeDetails = document.querySelector(".order-type-details");
const orderTimeDetails = document.querySelector(".order-time-details");
const selectPageDetails = document.querySelector(".current-order-type");

//Display order date inside cart//
if(orderBeverage || selectPageDetails){
  if(localStorage.getItem("orderDate")){
    var selectedDate = localStorage.getItem("orderDate");
    orderDateDetails.innerHTML = "<p>" + selectedDate + "</p>";
  }else{
    orderDateDetails.innerHTML = "<p>Not selected</p>"
  }

  //Display order type inside cart//
  if(localStorage.getItem("orderTime")){
    var selectedTime = localStorage.getItem("orderTime");
    if(selectedTime === "ASAP"){
      orderTimeDetails.innerHTML = "<p>30 minutes from current time</p>";
    }else{
      selectedTime = JSON.stringify(selectedTime).replace(/"/g, "");
      orderTimeDetails.innerHTML = "<p>" + selectedTime + "</p>";
    }
  }else{
    orderTimeDetails.innerHTML = "<p>Not selected</p>"
  }

  //Display order time inside cart//
  if(localStorage.getItem("orderType")){
    var selectedType = localStorage.getItem("orderType");
    orderTypeDetails.innerHTML = "<p>" + selectedType + "</p>";
  }else{
    orderTypeDetails.innerHTML = "<p>Not selected</p>"
  }
}
