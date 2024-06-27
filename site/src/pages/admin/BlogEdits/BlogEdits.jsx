import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { endpoints } from '../../../services/constant';
import controller from '../../../services/requests';
import Swal from 'sweetalert2';

const BlogEdits = () => {
    const [updateBlog, setUpdateBlog] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        controller.getOne(endpoints.Blogs, id,).then((res) => {

          setUpdateBlog({ ...res.data });
          console.log(updateBlog);
        });
      }, [id]);
      console.log("Uptadate Blogsa", updateBlog);
    const formik = useFormik({
        initialValues: {
          title: updateBlog?.title,
          src: updateBlog?.src,
          description: updateBlog?.description,
        },
        
        onSubmit: async (values) => {
            console.log(values);
          const updated = { ...values };
          controller.patch(endpoints.Blogs, id, updated);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Blog Updated",
            showConfirmButton: false,
            timer: 1000,
          }).then(()=>{
            navigate('/admin/blog-add');
          });
          formik.resetForm();
        },
      });
     
  return (
    <section>
        <div className="container">
            <div className="row justify-content-center py-5">
                <div className="col-lg-8">
                <form onSubmit={formik.handleSubmit} >
            <input placeholder="title" className="form-control my-2" id="title" name="title" type="text"onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={updateBlog.title} />
              {formik.errors.title ? <div style={{ color: "red" }}>{formik.errors.title}</div> : null}
            <input placeholder="description" className="form-control my-2" id="description" name="description" type="text" onChange={formik.handleChange} value={updateBlog.description} />
              {formik.errors.description ? <div style={{ color: "red" }}>{formik.errors.description}</div> : null}
            <input placeholder="src" className="form-control my-2" id="src" name="src" type="text" onChange={formik.handleChange} value={updateBlog.src} />
              {formik.errors.src ? <div style={{ color: "red" }}>{formik.errors.src}</div> : null}

            <button  className="btn btn-info text-white" type='submit'>Edit Blogs</button>
            </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BlogEdits