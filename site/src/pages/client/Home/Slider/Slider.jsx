import React from "react";

const Slider = () => {
  return (
    <section id="homeSlider">
      <div className="sliders">
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
    </section>
  );
};

export default Slider;
