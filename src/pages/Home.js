import React from "react";
import Slider from "react-slick";
import "../style/home.css";
import image from "../assets/image.jpg";
import image from "../assets/image.png";
import image1 from "../assets/image1.jpg";

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
              <img src= {image1} className="slide-img" />
            </div>

  </Slider>
 
        </div>
      </div>

  );

}

export default Home;
