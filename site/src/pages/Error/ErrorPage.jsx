import React from 'react'
import "./Error.scss"
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <section id='Error'>
  <div class="error__wrapper">
    <h1>4 <img src="https://c.tenor.com/Nl45qRGQk_0AAAAi/ghost-white.gif"/> 4</h1>
    <p class="frown-it" data-splitting>ERROR</p>
    <Link to={"/"}>Back to Bank</Link>
  
  </div>
  
</section>
  )
}

export default ErrorPage