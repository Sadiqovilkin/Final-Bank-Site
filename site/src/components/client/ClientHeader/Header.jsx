import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../images/İLKBANKPNG.png'
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
const Header = ({ userID, setUserID, setLocalUserID }) => {
  const navigate = useNavigate();
  // console.log(userID.role);
  return (
    <header id='clientHeader' >
      <div className="container-fluid p-0 m-0">
        <div className="row align-items-center">
          <div className="col-3">
            <div className="logo">
              <img src={Logo} alt="Ilk Bank" />
              {/* <h3>Ilk Bank</h3> */}
            </div>
          </div>
          <div className="col-9">
            <div className="row justify-content-between">
              <div className="col-6">

                <div className="nav_items">
                  {userID ? <>
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
                    {userID.role == "client" ? <> <Link to={"/user-dashboard"} className='btn'>User Dashboard</Link>
                    </>: <Link to={"/company-dashboard"} className='btn'>Company Dashboard</Link>}
                  </ul>
                  </> :<>
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
                  </>}
                </div>
              </div>
              <div className="col-4">
                <div className="nav_btns">
                  {userID ? <>
                    <Link onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setUserID(null);
                          setLocalUserID(null);
                          Cookies.remove('token');
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          }).then(() => {
                            navigate("/login");
                          });
                        }
                      });
                    }} className='btn open'>Log Out</Link>
                  </> : <>
                    <Link to={"/login"} className='btn login'>Login</Link>
                    <Link to={"/register"} className='btn open'>Open Account</Link>
                  </>}

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