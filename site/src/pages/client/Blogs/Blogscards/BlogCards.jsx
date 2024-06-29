import React, { useEffect, useState } from 'react'
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from 'react-router-dom';
import controller from '../../../../services/requests';
import { endpoints } from '../../../../services/constant';
const BlogCards = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        controller.getAll(endpoints.Blogs).then((res) => {
            setBlogs(res.data);
            console.log("MainBlogs", res.data);
        })
    }, [])
    return (
        <section id='blogCards'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="headers">
                            <h2>Blogs</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogs && blogs.map((el, idx) =>
                        <>
                            <div key={idx} className="col-lg-4 col-md-6 col-sm-12 g-4">
                                <div className="blogCard">
                                    <div className="card_img">
                                        <img src={el.src} alt="" />
                                    </div>
                                    <div className="card_desc">
                                        <div>
                                        <h3>
                                            {el.title}
                                        </h3>
                                        <p>
                                            {el.description}
                                        </p>
                                        </div>
                                        <div>
                                            
                                        <ul className='post_info'>
                                            <li>
                                                <MdPersonOutline />
                                                Admin
                                            </li>
                                            <li>
                                                <AiOutlineComment />
                                                {el.comments.length == 0 ? "No Comments" : <>{el.comments.length}</>}
                                            </li>
                                        </ul>
                                        <div className='btns'>

                                            <Link to={`/blogdetail/${el._id}`} className='read_more'>Read More</Link>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default BlogCards