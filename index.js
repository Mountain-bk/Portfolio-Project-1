
//Selectors for Carousel
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-image");
const carouselContainer = document.querySelector(".carousel-container");
const carouselBanner = document.querySelectorAll(".banner");
//Buttons//
const nextBtn = document.querySelector(".carousel-button-right");
const prevBtn = document.querySelector(".carousel-button-left");
//Counter//
let counter = 0;
let size = window.innerWidth
//Slide next when you click Right button
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

//Slide previous when you click Left button
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

//Toggle Mobile Menu//
function toggleMobileMenu(){
  var body = document.body;
  window.scroll(0,0);
  body.style.transition = ".5s ease";
  body.classList.toggle("shrink-page");
};





//Change banner size when viewport size Change
window.addEventListener("resize", () =>{
  size = window.innerWidth
  var clientRect = carouselBanner[counter].getBoundingClientRect();
  var currentImage = clientRect.left;
  var where = window.pageXOffset + currentImage;
  carouselBanner[counter].style.left = "0px";
});
