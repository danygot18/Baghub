import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
            <img src="images/Dior.png" alt="Slide 1" className="carousel-image" />
          </div>
          <div>
            <img src="images/Chanel2.png" alt="Slide 2" className="carousel-image" />
          </div>
          <div>
            <img src="images/Yves Saint Laurent.png" alt="Slide 3" className="carousel-image" />
          </div>
          <div>
            <img src="images/Celine.png" alt="Slide 4" className="carousel-image" />
          </div>
        </Slider>
        <div className="divider"></div> {/* Add this divider */}
      </div>
    );
  }
  
  export default SimpleSlider;
  
  