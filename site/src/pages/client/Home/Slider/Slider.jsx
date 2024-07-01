import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { TiArrowLeft } from "react-icons/ti";
import { TiArrowRight } from "react-icons/ti";
const Slider = () => {
  return (
    <section id="homeSlider">
      <Swiper navigation={true} modules={[Autoplay, Navigation]} autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} loop={true} className="mySwiper">
        <SwiperSlide>

        <div className="sliders" style={{backgroundImage:"url(https://23july.hostlin.com/metrobank/wp-content/uploads/2023/10/banner-2.jpg)"}}>
        <div className="inner">
          <h1>
            Open our <span>Current</span> <br /> Account Online
          </h1>
          <div className="text">
            This statistic is based on our average personal current account
            online <br /> opening time from the last 12 months.
          </div>
          <div className="link-box">
            <a
              href="https://23july.hostlin.com/metrobank/contact/"
              className="btn-1 btn-large"
            >
              Make an Appointment <span></span>
            </a>
          </div>
        </div>
      </div>
        </SwiperSlide>
        <SwiperSlide>

        <div className="sliders" style={{backgroundImage:"url(https://23july.hostlin.com/metrobank/wp-content/uploads/2023/10/banner-3.jpg)"}}>
        <div className="inner">
          <h1>
            Open our <span>Current</span> <br /> Account Online
          </h1>
          <div className="text">
            This statistic is based on our average personal current account
            online <br /> opening time from the last 12 months.
          </div>
          <div className="link-box">
            <a
              href="https://23july.hostlin.com/metrobank/contact/"
              className="btn-1 btn-large"
            >
              Make an Appointment <span></span>
            </a>
          </div>
        </div>
      </div>
        </SwiperSlide>
        <SwiperSlide>

        <div className="sliders" style={{backgroundImage:"url(https://23july.hostlin.com/metrobank/wp-content/uploads/2023/10/banner-1.jpg)"}}>
        <div className="inner">
          <h1>
            Open our <span>Current</span> <br /> Account Online
          </h1>
          <div className="text">
            This statistic is based on our average personal current account
            online <br /> opening time from the last 12 months.
          </div>
          <div className="link-box">
            <a
              href="https://23july.hostlin.com/metrobank/contact/"
              className="btn-1 btn-large"
            >
              Make an Appointment <span></span>
            </a>
          </div>
        </div>
      </div>
        </SwiperSlide>
        
       
      </Swiper>
    
    </section>
  );
};

export default Slider;
