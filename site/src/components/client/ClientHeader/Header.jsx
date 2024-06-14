import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../../../assets/Removal'
const Header = () => {
  return (
   <header id='clientHeader' >
    <div className="container-fluid p-0 m-0">
      <div className="row align-items-center">
      <div className="col-3">
  <div className="logo">
    {/* <img src={Logo} alt="Ilk Bank" /> */}
    <h3>Ilk Bank</h3>
  </div>
</div>
<div className="col-9">
  <div className="row justify-content-between">
    <div className="col-6">

  <div className="nav_items">
    <ul>
      <li>
        <Link to={"/"} className='btn'>Home</Link>
      </li>
      <li>
        <Link to={"/about"} className='btn'>About</Link>
      </li>
      <li>
        <Link to={"/"} className='btn'>Services</Link>
      </li>
      <li>
        <Link to={"/contact"} className='btn'>Contact</Link>
      </li>
    </ul>
  </div>
    </div>
    <div className="col-4">
      <div className="nav_btns">
        <Link to={"/login"} className='btn'>Login</Link>
        <Link to={"/register"} className='btn'>Open Account</Link>
      </div>
    </div>
  </div>
</div>
      </div>

    </div>
   </header>
  )
}

export default Header