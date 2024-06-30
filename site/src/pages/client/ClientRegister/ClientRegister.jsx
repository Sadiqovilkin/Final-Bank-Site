import React from 'react'
import { useFormik } from 'formik';
import userSchema from '../../../validations/users.validations';
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';
import UsersClass from '../../../classes/users.class';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../../context/Context';
const ClientRegister = () => {
  const {userPost}=useDataContext()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      address: "",
      city: "",
      region: "",
      phone: "",
      dateofbirth: "",
      email: "",
      password: "",
      confPassword: "",
      image: "",
      companyName: "",
      seniority: "",
      gender: ""
    },
    onSubmit:(values)=>{
  
      const newUsers = new UsersClass(values.name,values.surname,values.address,values.city,values.region , values.phone , values.dateofbirth, values.email , values.password , values.image , values.companyName , values.seniority , values.gender)
      // controller.post(endpoints.Users , newUsers)
      userPost(newUsers)
     console.log("newUsers", newUsers);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User succses Sign Up",
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{

        navigate('/login');
      })
      formik.resetForm()  
    },
    validationSchema:userSchema
  })
  return (
    <section id='clientRegister'>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Personal Informations</legend>
          <div className="fulnames d-flex gap-3">
                <input placeholder="name" className="form-control w-50 my-2" id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name ? <div style={{ color: "red" }}>{formik.errors.name}</div> : null}
                <input placeholder="surname" className="form-control w-50 my-2" id="surname" name="surname" type="text" onChange={formik.handleChange} value={formik.values.surname} />
                {formik.errors.surname ? <div style={{ color: "red" }}>{formik.errors.surname}</div> : null}
              </div>
              <input placeholder="address" className="form-control  my-2" id="address" name="address" type="text" onChange={formik.handleChange} value={formik.values.address} />
                {formik.errors.address ? <div style={{ color: "red" }}>{formik.errors.address}</div> : null}
                <input placeholder="city" className="form-control  my-2" id="city" name="city" type="text" onChange={formik.handleChange} value={formik.values.city} />
                {formik.errors.city ? <div style={{ color: "red" }}>{formik.errors.city}</div> : null}
                <input placeholder="region" className="form-control  my-2" id="region" name="region" type="text" onChange={formik.handleChange} value={formik.values.region} />
                {formik.errors.region ? <div style={{ color: "red" }}>{formik.errors.region}</div> : null}
                  <div className="d-flex gap-3">
                  <input placeholder="phone" className="form-control w-50  my-2" id="phone" name="phone" type="tel" onChange={formik.handleChange} value={formik.values.phone} />
                {formik.errors.phone ? <div style={{ color: "red" }}>{formik.errors.phone}</div> : null}
                <input placeholder="dateofbirth" className="form-control w-50  my-2" id="dateofbirth" name="dateofbirth" type="date" onChange={formik.handleChange} value={formik.values.dateofbirth} />
                {formik.errors.dateofbirth ? <div style={{ color: "red" }}>{formik.errors.dateofbirth}</div> : null}
                  </div>
                <input placeholder="email" className="form-control  my-2" id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
               <div className="paswords d-flex gap-3">
               <input placeholder="password" className="form-control w-50 my-2" id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
                <input placeholder="confPassword" className="form-control w-50 my-2" id="confPassword" name="confPassword" type="password" onChange={formik.handleChange} value={formik.values.confPassword} />
                {formik.errors.confPassword ? <div style={{ color: "red" }}>{formik.errors.confPassword}</div> : null}
               </div>
               <input placeholder="image" className="form-control  my-2" id="image" name="image" type="text" onChange={formik.handleChange} value={formik.values.image} />
                {formik.errors.image ? <div style={{ color: "red" }}>{formik.errors.image}</div> : null}
                <select onChange={formik.handleChange} value={formik.values.gender} className='form-control my-2' name="gender" id="gender">
  <option value="" disabled>Choose Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
                {formik.errors.gender ? <div style={{ color: "red" }}>{formik.errors.gender}</div> : null}

        </fieldset>



                <fieldset >
                  <legend>Company Informations </legend>
                <input placeholder="companyName" className="form-control  my-2" id="companyName" name="companyName" type="text" onChange={formik.handleChange} value={formik.values.companyName} />
                {formik.errors.companyName ? <div style={{ color: "red" }}>{formik.errors.companyName}</div> : null}
              
                <input placeholder="seniority" className="form-control  my-2" id="seniority" name="seniority" type="text" onChange={formik.handleChange} value={formik.values.seniority} />
                {formik.errors.seniority ? <div style={{ color: "red" }}>{formik.errors.seniority}</div> : null}

                </fieldset>
                
                
                
                
              
              
              
              
              
              <button type='submit' className='btn btn-primary'>Open Account</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientRegister