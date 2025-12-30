import React from "react";
//import Slider from "react-slick";
import "../style/slide.css";
/*import "./App.css";*/
//import image1 from "../assets/image1.jpg";
//import photo1 from "../assets/photo1.jpeg";
//import pwf from "../assets/pwf.jpg";

const Slide = () => {

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

       {/* <Slider {...settings}>

            <div>
              <img src= {image1} className="slide-img" />
            </div>

            <div>
              <img src= {pwf} className="slide-img" />
            </div>

            <div>
              <img src= {photo1} className="slide-img" />
            </div>

  </Slider>*/}
 
  </div>
      </div>

  );

}

export default Slide;
