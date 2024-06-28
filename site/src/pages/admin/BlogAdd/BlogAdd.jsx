import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Swal from "sweetalert2";
import Blogs from '../../../classes/blog.class';
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';
import { Link } from 'react-router-dom';
const BlogAdd = () => {
  const [blog , setBlog] = useState([])
  function getBlogs() {
    controller.getAll(endpoints.Blogs).then((res)=>{
      // console.log(res.data);
      setBlog(res.data)
    })
  }
useEffect(()=>{
  getBlogs()
},[])
  const formik = useFormik({
    initialValues:{
      title:"",
      description:"",
      src:""
    },
    onSubmit: async ({title,description,src})=>{
      const newBlog = new Blogs(title,description,src,"66771a471a25d601098fdd2a")
      await controller.post(endpoints.Blogs , newBlog)
      getBlogs()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Blog Posted",
        showConfirmButton: false,
        timer: 1000,
      });
      formik.resetForm()
    }
  })
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <form onSubmit={formik.handleSubmit} >
            <input placeholder="title" className="form-control my-2" id="title" name="title" type="text" onChange={formik.handleChange} value={formik.values.title} />
              {formik.errors.title ? <div style={{ color: "red" }}>{formik.errors.title}</div> : null}
            <input placeholder="description" className="form-control my-2" id="description" name="description" type="text" onChange={formik.handleChange} value={formik.values.description} />
              {formik.errors.description ? <div style={{ color: "red" }}>{formik.errors.description}</div> : null}
            <input placeholder="src" className="form-control my-2" id="src" name="src" type="text" onChange={formik.handleChange} value={formik.values.src} />
              {formik.errors.src ? <div style={{ color: "red" }}>{formik.errors.src}</div> : null}

            <button  className="btn btn-info text-white" type='submit'>AddBlogs</button>
            </form>
          </div>
          <div className="col-lg-8">
            <table className="table">
              <thead className='table-dark'>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
              {blog&& blog.map((el,idx)=>
          
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{el.title}</td>
                  <td>{el.description}</td>
                  <td>
                    <img style={{width:"150px",height:"150px",objectFit:"cover"}} src={el.src} alt="" />
                  </td>
                  <td><button 
                  onClick={()=>{
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                    }).then( async (result) => {
                      if (result.isConfirmed) {
                        await controller.delete(endpoints.Blogs , el._id);
                        getBlogs()
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                      }
                    });
                   
                  }}
                  className="btn btn-danger">Delete</button></td>
                  <td>
                    <Link to={`/admin/blog/edit/${el._id}`} className="btn btn-success">Edit</Link>
                  </td>
                </tr>
              
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogAdd