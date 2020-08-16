
//---Carousel (Top page)---//
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-image");
const carouselContainer = document.querySelector(".carousel-container");
const carouselBanner = document.querySelectorAll(".banner");

//0=Buffalo Wings, 1=Value Set, 2=Nachos//
let counter = 0;
let size = window.visualViewport.width

//Slide to next carousel image//
const nextBtn = document.querySelector(".carousel-button-right");
if (nextBtn){
  nextBtn.addEventListener("click", () => {
    size = window.visualViewport.width
    counter++;
    if (counter === 3){
      carouselSlide.style.transform = "translateX(" + (-size * 0) + "px)";
      counter = 0;
    } else{
      carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
  });
}

//Slide to previous carousel image//
const prevBtn = document.querySelector(".carousel-button-left");
if (prevBtn){
  prevBtn.addEventListener("click", () => {
    size = window.visualViewport.width
    counter--;
    if (counter === -1){
      carouselSlide.style.transform = "translateX(" + (-size * 2) + "px)";
      counter = 2;
    } else{
      carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
  });
}


//Slide to next carousel automatically//
if(carouselSlide){
  setTimeout(automaticCarousel, 4000);
}

function automaticCarousel(){
  size = window.visualViewport.width
  counter++;
  if (counter === 3){
    carouselSlide.style.transform = "translateX(" + (-size * 0) + "px)";
    counter = 0;
  } else{
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
  }
  setTimeout(automaticCarousel, 4000);
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

window.addEventListener("change", () =>{
  if(timeRange[0].options[timeRange[0].selectedIndex].text === "Select Time"){
    checkMark.src = "images/cross.png";
  } else{
    checkMark.src = "images/check.png";
  }
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

function appearDisplay(){
  orderBeverage.style.opacity = "1";
}

function animateDisplay(){
  orderBeverage.style.opacity = "0";
  setTimeout(displayCart, 300);
  setTimeout(appearDisplay, 300);
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

//Show Add Cart Modal//
for(let i = 0; selectBtn.length > i; i++){
  selectBtn[i].addEventListener("click", () =>{
    showAddCartModal(selectBtn[i]);
  })
};

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


//Close Modal//
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
  displayCart();
  orderBeverage.style.opacity = "1";
}

//---Open cart (mobile)---//
const mobileCartBtn = document.querySelector(".cart-total-btn");
const cartNavPrice = document.querySelector(".cart-nav-price");
if(mobileCartBtn){
  displayTotalAmount();

  mobileCartBtn.addEventListener("click", () =>{
    if(mobileCartBtn.innerHTML == "<p>Close Cart</p>"){
      cartContainer.style.display = "none";
      mobileCartBtn.innerHTML =
      "<i class='fas fa-shopping-cart'></i>" +
      "<span class='cart-nav-text'>total</span>" +
      "<span class='cart-nav-price'>" + "$" + shoppingCart.totalAmount().toFixed(2) + "</span>";
    } else{
      changeToCloseCartBtn();
    }
  });
}
//Display total amount in nav cart//
function displayTotalAmount(){
  cartNavPrice.innerHTML = "$" + shoppingCart.totalAmount().toFixed(2);
}
//Change to close button when the nav cart is open//
function changeToCloseCartBtn(){
  cartContainer.style.display = "block";
  mobileCartBtn.innerHTML = "";
  mobileCartBtn.innerHTML = "<p>Close Cart</p>";
}


//---Toggle cart either mobile or desktop---//
if(cartContainer){
  window.addEventListener("resize", () =>{
    if(window.innerWidth > 690){
      cartContainer.style.display = "block";
      changeToCloseCartBtn();
    } else if(window.innerWidth === 690){
      cartContainer.style.display = "none";
      mobileCartBtn.innerHTML =
      "<i class='fas fa-shopping-cart'></i>" +
      "<span class='cart-nav-text'>total</span>" +
      "<span class='cart-nav-price'>" + "$" + shoppingCart.totalAmount().toFixed(2) + "</span>";
    }
  });
}
