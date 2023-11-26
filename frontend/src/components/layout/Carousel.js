import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust the number of visible slides
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Adjust the autoplay speed in milliseconds
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src="images/Dior.png"
            alt="Slide 1"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Chanel.png"
            alt="Slide 2"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Yves Saint Laurent.png"
            alt="Slide 3"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Celine.png"
            alt="Slide 4"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Gucci.png"
            alt="Slide 5"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/LV.png"
            alt="Slide 6"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Prada.png"
            alt="Slide 7"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Hermes.png"
            alt="Slide 8"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Fendi.png"
            alt="Slide 9"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
        <div>
          <img
            src="images/Givenchy.png"
            alt="Slide 10"
            className="carousel-image"
            style={{ width: "500px", height: "300px" }}
          />
        </div>
      </Slider>
      <div className="divider"></div> {            }<br></br><br></br>
    </div>
  );
}

export default SimpleSlider;
