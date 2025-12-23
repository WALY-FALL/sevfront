import React from "react";
import Slider from "react-slick";
import "../style/home.css";
import image from "../assets/image.jpg";
import photo1 from "../assets/photo1.jpg";
import pwf from "../assets/pwf.jpg";

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
              <img src= {image} className="slide-img" />
            </div>

            <div>
              <img src= {pwf} className="slide-img" />
            </div>

            <div>
              <img src= {photo1} className="slide-img" />
            </div>

  </Slider>
 
        </div>
      </div>

  );

}

export default Home;
