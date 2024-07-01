import React from 'react'
import Hero from '../../../components/client/Hero/Hero'
import AboutUs from './AboutUs/AboutUs'
import Why from './Why/Why'
import Subscripe from '../../../components/client/Subscripe/Subscripe'

const About = () => {
  return (
    <main>
      <Hero text={"About Us"}/>
      <AboutUs/>
      <Why/>
      <Subscripe/>
    </main>
  )
}

export default About