import { useFormik } from 'formik';
import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import controller from '../../../services/requests';
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDataContext } from '../../../context/Context';

const AdminLogin = () => {
  const { setAdminID,setLocalAdminID}  = useDataContext()

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:'',
      password:""
    },
    onSubmit: async ({ email, password }) => {
      const response =await controller.post("adminlogin",{email:email,password:password})
    console.log(response);
    console.log(response.token);
    if (response.auth) {
      setAdminID({
        Id:response.user._id,
        role:response.user.role
      });
      setLocalAdminID({
            Id:response.user._id,
            role:response.user.role
          });
                 //token
          const token = response.token;
          Cookies.set('admintoken', token, {expires: 1});
          Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=>{
                    navigate('/admin');
                  })
    }
    else{
      Swal.fire({
                position: "top-end",
                icon: "error",
                title: "email or password inCorrect",
                showConfirmButton: false,
                timer: 1500
              })
    }
  },
  })
  return (
    <section id='adminLogin'>
      <div className="container">
        <div style={{height:"100vh"}} className="row justify-content-center align-items-center">
          <div className="col-lg-5">
            <form action="" onSubmit={formik.handleSubmit}>
              <input placeholder="email" className="form-control my-2" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
              {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}

              <input placeholder="password" className="form-control my-2" id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
              {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

              <button type='submit' className='btn'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin