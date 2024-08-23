import {useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 
import GeneralHealthSection from './GeneralHealth';
import UserAge from './UserAge';


const Starting = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        <div>
          <UserAge nextStep={next} /> 
        </div>
        <div>
          <GeneralHealthSection nextStep={next} />
        </div>
      </Slider>
    </div>
  );
};

export default Starting;
