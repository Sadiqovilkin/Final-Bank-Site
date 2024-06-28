import React from 'react'
import Hero from '../../../components/client/Hero/Hero'
import AboutUs from './AboutUs/AboutUs'
import Why from './Why/Why'

const About = () => {
  return (
    <main>
      <Hero text={"About Us"}/>
      <AboutUs/>
      <Why/>
    </main>
  )
}

export default About