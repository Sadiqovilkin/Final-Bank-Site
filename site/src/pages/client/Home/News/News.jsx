import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
const News = () => {
  return (
    <section id="news">
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-6 p-0 g-3">
            <div className="loan_card">
              <div className="head">
                <h2>Online loan payment</h2>
              </div>
              <div className="body">
                <div className="description">
                  <p>
                  Pay off your credit debt in 4 steps with your card without coming to the bank and wasting time in queues.
                  </p>
                  <a href="#">
                    Ödəniş <AiOutlineArrowRight />
                  </a>
                </div>
                <div className="card_img">
                  <img
                    src="https://www.kapitalbank.az/assets/static/img/content/elements/png/webp/cashPayment.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0 g-3 pl-3">
            <div className="loan_card red_news">
              <div className="head">
                <h2>Human resources</h2>
              </div>
              <div className="body">
                <div className="description">
                  <p>
                  Join the professional team of "Ilk Bank"
                    if you want, to apply for the relevant vacancy
                    we invite you. We are interested in you in a dynamic environment
                    We offer a promising job.
                  </p>
                  <a href="#">
                  Payment <AiOutlineArrowRight />
                  </a>
                </div>
                <div className="card_img">
                  <img
                    src="https://www.kapitalbank.az/assets/static/img/content/elements/png/webp/90789318742-min.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg_gray my-4 py-3">
        <div className="container ">
          <div className="news_header ">
            <h3>News </h3>
            <a href="#">
              All news <AiOutlineArrowRight />
            </a>
          </div>
          <div className="row my-4">
            <div className="col-lg-4">
              <div className="news_card">
                <div className="card_left">
                  <div className="circle_div">
                    <span>12</span>
                  </div>
                  <p>May</p>
                </div>
                <div className="card_right">
                  <p>
                    
                    “Campbell Biologiya” kitabının BDU-da və ADPU-da təqdimatı
                    keçirildi
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="news_card">
                <div className="card_left">
                  <div className="circle_div">
                    <span>6</span>
                  </div>
                  <p>April</p>
                </div>
                <div className="card_right">
                  <p>
                    
                    Bank Rəhbərliyinin doğum günü şənliyi keçirildi 
                    
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="news_card">
                <div className="card_left">
                  <div className="circle_div">
                    <span>1</span>
                  </div>
                  <p>İyul</p>
                </div>
                <div className="card_right">
                  <p>
                   
                    Bankın Online Sisteminin Teqdimatı Olundu 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;