import React, { useEffect, useState } from 'react'
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from 'react-router-dom';
const BlogCards = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        
    }, [ ])
    return (
        <section id='blogCards'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="blogCard">
                            <div className="card_img">
                                <img src="https://23july.hostlin.com/metrobank/wp-content/uploads/2023/10/news-25.jpg" alt="" />
                            </div>
                            <div className="card_desc">
                                <h3>
                                    Self-Guided Driving & Tours Walk Of Greater City
                                </h3>
                                <p>

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ornare non non massa elit rutrum. ...
                                </p>
                                <ul className='post_info'>
                                    <li>
                                        <MdPersonOutline/>
                                        Admin
                                    </li>
                                    <li>
                                    <AiOutlineComment />
                                        No Comments
                                    </li>
                                </ul>
                                <div className='btns'>

                                <Link className='read_more'>Read More</Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogCards