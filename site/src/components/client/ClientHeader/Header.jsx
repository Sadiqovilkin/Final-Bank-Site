import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../images/İLKBANKPNG.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { HiMenu } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Header = ({ userID, setUserID, setLocalUserID }) => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState("disable");
  const [toTop, setTotop] = useState("d-none");

  const [scrollNavbar, setScrollNavbar] = useState("navSticky");
  useEffect(()=>{
    const handleScroll = () => {
      // console.log(window.scrollY);
      
      if (window.scrollY > 200) {
        setScrollNavbar("navFixed");
        setTotop("scrollToTop")
      } else {
        setScrollNavbar("navSticky");
        setTotop("d-none")
      }
    };

    window.addEventListener('scroll', handleScroll);
  })
  return (
    <>
    <header id="clientHeader" className={scrollNavbar} >
      <div className="container-fluid p-0 m-0">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-4 col-4">
            <div className="logo">
              <img src={Logo} alt="Ilk Bank" />
              {/* <h3>Ilk Bank</h3> */}
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-8">
            <div className="row desktopNavbar justify-content-between">
              {userID ? (
                <>
                  <div className="col-9">
                    <div className="nav_items">
                      <ul>
                        <li>
                          <Link to={"/"} className="btn">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"} className="btn">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link to={"/service"} className="btn">
                            Services
                          </Link>
                        </li>
                        <li>
                          <Link to={"/blogs"} className="btn">
                            Blogs
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"} className="btn">
                            Contact
                          </Link>
                        </li>
                        {userID.role == "client" ? (
                          <>
                            {" "}
                            <Link to={"/user-dashboard"} className="btn">
                              User Dashboard
                            </Link>
                          </>
                        ) : (
                          <Link to={"/company-dashboard"} className="btn">
                            Company Dashboard
                          </Link>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-7">
                    <div className="nav_items">
                      <ul>
                        <li>
                          <Link to={"/"} className="btn">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link to={"/about"} className="btn">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"} className="btn">
                            Services
                          </Link>
                        </li>
                        <li>
                          <Link to={"/blogs"} className="btn">
                            Blogs
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"} className="btn">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
              {userID ? (
                <>
                  <div className="col-3">
                    <div className="nav_btns">
                      <Link
                        onClick={() => {
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
                              Cookies.remove("token");
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              }).then(() => {
                                navigate("/login");
                              });
                            }
                          });
                        }}
                        className="btn open"
                      >
                        Log Out
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-5">
                    <div className="nav_btns">
                      <Link to={"/login"} className="btn login">
                        Login
                      </Link>
                      <Link to={"/register"} className="btn open">
                        Open Account
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row  mobileNavbar justify-content-end px-4">
              <HiMenu onClick={() => {setNavbar("active")}} />
            </div>
          </div>
        </div>
        <div className={navbar} onClick={(e) => {
          e.stopPropagation()
          setNavbar("disable")}}>
        <div className="mobilNavbar">
          <div className="mobileNavbar_close">
              <IoIosCloseCircleOutline onClick={() => {setNavbar("disable")}}/>
          </div>
        <div className="mobilenavbar_list">
            {userID ? (
              <>
                <div className="nav_items">
                  <ul>
                    <li>
                      <Link to={"/"} className="btn">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about"} className="btn">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} className="btn">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blogs"} className="btn">
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"} className="btn">
                        Contact
                      </Link>
                    </li>
                    {userID.role == "client" ? (
                      <>
                        {" "}
                        <Link to={"/user-dashboard"} className="btn">
                          User Dashboard
                        </Link>
                      </>
                    ) : (
                      <Link to={"/company-dashboard"} className="btn">
                        Company Dashboard
                      </Link>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="nav_items">
                  <ul>
                    <li>
                      <Link to={"/"} className="btn">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about"} className="btn">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"} className="btn">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blogs"} className="btn">
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"} className="btn">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="mobileBtns">
            {userID ? (
              <>
                <div className="nav_btns">
                  <Link
                    onClick={() => {
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
                          Cookies.remove("token");
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          }).then(() => {
                            navigate("/login");
                          });
                        }
                      });
                    }}
                    className="btn open"
                  >
                    Log Out
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="nav_btns">
                  <Link to={"/login"} className="btn login">
                    Login
                  </Link>
                  <Link to={"/register"} className="btn open">
                    Open Account
                  </Link>
                </div>
              </>
            )}
          </div>
         
        </div>
      </div>
      </div>
     
    </header>
    <div className={toTop}>
      <button onClick={()=>{
       document.body.scrollTop = 0;
       document.documentElement.scrollTop = 0;
      }}> <BsArrowLeft/>  Go To Top</button>
    </div>
    </>
  );
};

export default Header;
