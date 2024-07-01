import React from 'react'
import { FaStar } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
const AboutUs = () => {
  return (
    <section id='aboutUs'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 g-5">
                <div className="aboutImg">
                    <img src="https://23july.hostlin.com/metrobank/wp-content/uploads/2023/10/about-1.jpg" alt="" />
                <div className="image_circle">
                    <div className="red_div">
                        <h2>40</h2>
                        <h6>Years of Experiense</h6>
                    </div>
                </div>
                <div className="image_stars">
                    <div className="stars">
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                    <h6>5 Star Rating Bank</h6>
                </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 g-5">
                    <div className="aboutText">
                        <h6>About Us</h6>
                        <h2>Financial Guidance for Every
Stage of Life.</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit you take action against fraud. See it the Security Center for and Mobile and Online Banking.</p>
<ul>
    <li>
        <div className="icon">
            <CiCircleCheck/>
        </div>
        <div className="text">
            <h3>Solution Focused</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat</p>
        </div>
    </li>
    <li>
        <div className="icon">
            <CiCircleCheck/>
        </div>
        <div className="text">
            <h3>Solution Focused</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat</p>
        </div>
    </li>
</ul>
<button>Discover More</button>


                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUs