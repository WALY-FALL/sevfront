import React from "react";
import Slider from "react-slick";
import "../style/home.css";
import photo from "../assets/photo.png";
import image from "../assets/image.jpg";
import yassa from "../assets/yassa.jpg";

const Home = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  return(

    <div className="">
        <div className="div-home">

          <Slider {...settings}>

            <div>
              <img src= {photo} className="slide-img" />
            </div>

            <div>
              <img src= {image} className="slide-img" />
            </div>

            <div>
              <img src= {yassa} className="slide-img" />
            </div>

  </Slider>
 
        </div>
      </div>

  );

}

export default Home;
