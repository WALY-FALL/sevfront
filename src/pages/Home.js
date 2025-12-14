import React from "react";
import Slider from "react-slick";
import "../style/home.css";

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
              <img src="photo.png" className="slide-img" />
            </div>

            <div>
              <img src="image.jpeg" className="slide-img" />
            </div>

            <div>
              <img src="yassa.jpeg" className="slide-img" />
            </div>

          </Slider>
  

        </div>
      </div>

  );

}

export default Home;
