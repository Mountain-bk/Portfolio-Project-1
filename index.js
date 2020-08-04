body{
  margin: 0;
  padding: 0;
  background-image: url("images/wall.jpg");
}

a{
  text-decoration: none;
  color: white;
}

h3, h4, li{
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  font-stretch: condensed;
}
ul{
  list-style-type: none;
}

.wrapper{
  min-height: 100%;
  position: relative;
  overflow: hidden;
}

/*Shirik page*/
.shrink-page{
  transform: translateX(-50%);
}

/*Header*/
.header{
  width: 100%;
  height: 120px;
  display: grid;
  grid-template-columns: 50% auto;
  background: black;
  position: fixed;
  top:0;
  z-index: 1000;
}
.logo{
  width:100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.menu-nav{
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.nav-item{
  padding: 0 35px;
  border-right: solid 2px white;
}
.nav-item:last-child{
  border-right: 0;
}
.menu-btn{
  display: none;
}
.fa-bars{
  color: white;
  font-size: 2rem;
}

/*Mobile Menu*/
.mobile-menu{
  width: 50%;
  height: 100%;
  background-color: black;
  right: -50%;
  top: 0;
  position: fixed;
  z-index: 2000;
}
.mobile-menu-nav{
  font-size: 2rem;
  padding: 0 20px;
}
.mobile-nav-item{
  padding: 10px 0;
}

.popup{
  display: block;
}

/*Start Order Module*/
.start-order{
  width: 100%;
  background-color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-family: 'Roboto', sans-serif;
  top:120px;
  position: fixed;
  z-index: 800;
}
.delivery, .pick-up{
  width: 200px;
  height: 70px;
  padding: 10px 0;
  text-align: center;
  margin: 0 10px;
  color: white;
}
.start-order .or{
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 1.5rem;
  color: white;
}
.start-order{
  font-size: 2rem;
}
.delivery{
  background-color: #006492;
}
.pick-up{
  background-color: #e0183b;
}

/*Carousel*/
.carousel, .carousel-slide, .banner, .carousel-image{
  height: 500px;
}
.carousel{
  width: 100%;
  margin-top: 250px;
  z-index: 0;
  position: relative;
}
.carousel-container{
  width: 100%;
  overflow: hidden;
}
.carousel-slide{
  width: 300%;
  left: 0px;
  display: flex;
}
.banner{
  width: 100vw;
  display: flex;
  justify-content: center;
}
.carousel-image{
  width: 65%;
  object-fit: cover;
}

.carousel-button-left, .carousel-button-right{
  border: transparent;
  outline: none;
  background: transparent;
  position: absolute;
  top: 45%;
}
.carousel-button-left{
  left:10%;
}
.carousel-button-right{
  right:10%;
}
.carousel .fas{
  font-size: 4rem;
  color: white;
}

/*Middle Table*/
.middle-table{
  width: 100%;
  height: 100px;
}
.table{
  width: 100%;
  height: 100%;
}
.table-img{
  width: 100%;
  height: 100%;
  object-fit: fill;
}

/*Article*/
.articles{
  background-image: url("images/brick-wall.jpg");
  background-size: cover;
  box-shadow: 10px 10px 40px 30px black inset;
  display: flex;
  justify-content: center;
  align-items: center;
}
.article-container{
  max-width: 1024px;
  height: auto;
  margin: auto;
  padding: 10px;
}

.new-topics{
  width: 100%;
  padding-top: 20px;
  border-bottom: dashed 2px white;
}
.topics{
  width: 100%;
  height: auto;
}
.new-topics h3{
  font-size: 2rem;
  color: white;
  margin: 0;
}
.topics{
  display: inline-block;
}
.topic{
  width: 30%;
  height: auto;
  background-color: #fffff3;
  border: solid 5px black;
  margin: 20px 10px;
  box-shadow: inset 5px 5px 5px black;
  display: inline-block;
}
.topic-container{
  width:90%;
  height: 100%;
  margin: 0 5%;
}
.topic-title{
  font-size: 1.5rem;
}
.topic-img-banner{
  width: 100%;
}
.topic-img{
  width: 100%;
  object-fit: cover;
}
.see-details{
  background-color: #e0183b;
  color: white;
  padding: 10px 20px 5px 10px;
  border-radius: 10px;
}

.important-notice{
  width: 100%;
  padding-bottom: 100px;
  color: white;
}
.notice-title h3{
  font-size: 2rem;
  border-bottom: dashed 2px white;
  padding-top: 20px;
}
.notice-list{
  margin: 10px 0 0 10px;
  font-size: 1.3rem;
}
.notice{
  text-decoration: underline;
}
/*Footer*/
.footer{
  width: 100%;
  height: 300px;
  background:black;
  line-height: 300px;
}
.footer-logo{
  max-width: 350px;
  height: auto;
  margin: auto;
  text-align: center;
}
.footer-logo-img{
  object-fit: cover;
}


@media only screen and (max-width: 1023px){
  .header{
    grid-template-columns: 32% auto;
    place-items: center;
  }
  .carousel-image{
    width: 80%;
  }.carousel-button-left{
    left:2%;
  }
  .carousel-button-right{
    right:2%;
  }.topic{
    width: 45%;
  }
}

@media only screen and (max-width: 690px){
  .topic{
    width: 90%;
  }.header{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }.menu{
    display: none;
  }.menu-btn{
    display: block;
    position: relative;
    margin-right: 20px;
  }.start-order a{
    height: 40px;
  }.start-order{
    font-size: 1rem;
    top: 80px;
  }.carousel{
    margin-top: 180px;
  }.carousel, .carousel-slide, .banner, .carousel-image{
    height: 275px;
  }.middle-table{
    height: 50px;
  }.carousel .fas{
    font-size: 2.5rem;
    color: white;
  }.carousel-button-left{
    left:0;
  }
  .carousel-button-right{
    right:0;
  }.carousel button{
    top: 50%;
  }.start-order .or{
    font-size: 1rem;
  }.footer-logo-img{
    width: 100%;
  }
}
