import React from 'react'
import { Link } from 'react-router-dom'

const Hero = ({text}) => {
  return (
    <section id='hero'>

        <div className="hero_text">
            <h1>{text}</h1>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li><Link to={`/`}>{text}</Link></li>
            </ul>
        </div>

    </section>
  )
}

export default Hero