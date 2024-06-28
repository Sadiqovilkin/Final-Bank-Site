import React from 'react'
import Slider from './Slider/Slider'
import AboutUs from '../About/AboutUs/AboutUs'
import News from './News/News'

const Home = () => {
  return (
    <main>
      <Slider/>
      <AboutUs/>

      <News/>
    </main>
  )
}

export default Home