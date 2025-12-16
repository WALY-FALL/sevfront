import React from "react";
//import Slider from "react-slick";
import "../style/home.css";
import photo from "../assets/photo.png";
import image from "../assets/image.jpeg";
import yassa from "../assets/yassa.jpeg";

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

          {/*<Slider {...settings}>

            <div>
              <img src= {photo} className="slide-img" />
            </div>

            <div>
              <img src= {image} className="slide-img" />
            </div>

            <div>
              <img src= {yassa} className="slide-img" />
            </div>

  </Slider>*/}
  <div style={{ height: "300px", background: "red" }}>
  TEST
</div>

        </div>
      </div>

  );

}

export default Home;
