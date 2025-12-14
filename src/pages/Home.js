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
              <img src="/img/slide1.jpg" className="slide-img" />
            </div>

            <div>
              <img src="/img/slide2.jpg" className="slide-img" />
            </div>

            <div>
              <img src="/img/slide3.jpg" className="slide-img" />
            </div>

          </Slider>
  

        </div>
      </div>

  );

}

export default Home;
