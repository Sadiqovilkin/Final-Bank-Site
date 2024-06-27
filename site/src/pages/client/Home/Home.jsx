import React from 'react'
import Slider from './Slider/Slider'
import AboutUs from '../About/AboutUs/AboutUs'
import OurServices from './OurSevices/OurServices'
import Calcuator from './Calcuator/Calcuator'

const Home = () => {
  return (
    <main>
      <Slider/>
      <AboutUs/>
      <OurServices/>
      <Calcuator/>
    </main>
  )
}

export default Home