import React from 'react'
import { useFormik } from 'formik';
const ClientRegister = () => {
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
      image: "",
      companyName: "",
      seniority: "",
      gender: ""
    }
  })
  return (
    <section id='clientRegister'>

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <form >
              <div className="fulnames d-flex gap-3">
                <input placeholder="name" className="form-control w-50 my-2" id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name ? <div style={{ color: "red" }}>{formik.errors.name}</div> : null}
                <input placeholder="surname" className="form-control w-50 my-2" id="surname" name="surname" type="text" onChange={formik.handleChange} value={formik.values.surname} />
                {formik.errors.surname ? <div style={{ color: "red" }}>{formik.errors.surname}</div> : null}
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientRegister