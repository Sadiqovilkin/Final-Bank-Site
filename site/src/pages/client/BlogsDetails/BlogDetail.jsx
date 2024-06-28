import React, { useEffect, useState } from 'react'
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import Hero from '../../../components/client/Hero/Hero'
import { useNavigate, useParams } from 'react-router';
import controller from '../../../services/requests';
import { endpoints } from '../../../services/constant';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';

const BlogDetail = () => {
    const token = Cookies.get("token");
    const [comment, setComment] = useState("");
    const [isSensitive, setIsSensitive] = useState(false);
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);
    const localID = JSON.parse(localStorage.getItem('userID'));
    const [userID, setUserID] = useState(localID ? localID : null);


    const [loading, setLoading] = useState(true); // Başlangıçta loading true olacak şekilde state'i tanımlıyoruz


    async function GetDatas() {
        await controller.getAll(endpoints.Users).then((res) => {
            setUsers([...res.data]);
        });
        await controller.getOne(endpoints.Blogs, id,).then((res) => {
            setBlog({ ...res.data });
            console.log("Blogs", res.data);
        });
        setLoading(false)
    }

    const [Blog, setBlog] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {

        GetDatas()
    }, [id]);
    return (
        <main>
            <div>
                {loading ? (
                    <div>Loading...</div> 
                ) : (
                    <>

                        <Hero text={"Blog-Details"} />
                        <section id='blog_details'>
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="card">
                                            <div className="card-img">
                                                <img src={Blog.src} alt="" />
                                            </div>
                                            <div className="card-desc">
                                                <h5>{Blog.title}</h5>
                                                <p>{Blog.description}</p>
                                                <ul className='post_info'>
                                                    <li>
                                                        <MdPersonOutline />
                                                        Admin
                                                    </li>
                                                    <li>
                                                        <AiOutlineComment />
                                                        {Blog.comments && Blog.comments.length == 0 ? "No Comments" : `${Blog.comments && Blog.comments.length}`}
                                                    </li>
                                                </ul>
                                                <div className='btns'>

                                                    <Link to={`/blogs`} className='read_more'>Go Back  </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (token) {
                                                    const newComment = {
                                                        userId: userID.Id,
                                                        content: comment,
                                                        createdAt: new Date(),
                                                        isSensitive: isSensitive,
                                                    };
                                                    controller.patch(endpoints.Blogs, Blog._id, {
                                                        comments: [...Blog.comments, newComment],
                                                    });
                                                    setBlog((currentBlog) => {
                                                        return {
                                                            ...currentBlog,
                                                            comments: [...currentBlog.comments, newComment],
                                                        };
                                                    });
                                                    setComment("");
                                                    setIsSensitive(false);
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "success",
                                                        title: "comment posted successfully",
                                                        showConfirmButton: false,
                                                        timer: 1000,
                                                    });
                                                } else {
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "warning",
                                                        title: "log In to add comment",
                                                        showConfirmButton: false,
                                                        timer: 1000,
                                                    });
                                                }


                                            }}
                                        >
                                            <input onChange={(e) => setComment(e.target.value)}
                                                placeholder="share comment"
                                                type="text"
                                                value={comment}
                                                required className='form-control my-2' />

                                            <div className='my-3'>
                                                <input type="checkbox" value={isSensitive}
                                                    onChange={(e) => {
                                                        setIsSensitive(e.target.checked);
                                                    }} />  <label htmlFor="">Is Sensitive</label>
                                            </div>

                                            <button className='btn btn-primary' type='submit'>Send Comment</button>


                                        </form>
                                        {/* Comments */}

                                        <List
                                            sx={{
                                                width: "100%",
                                                maxHeight: "500px",
                                                overflowY: "auto",
                                                bgcolor: "background.paper",
                                            }}
                                        >
                                            {Blog.comments &&
                                                Blog.comments.toReversed().map((comment, idx) => {
                                                    // console.log(comment);
                                                    const currentUser = users.find((x) => x._id == comment.userId);
                                                    return (
                                                        currentUser && (
                                                            <React.Fragment key={idx}>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemAvatar>
                                                                        <Avatar
                                                                            alt={currentUser.name}
                                                                            src={currentUser.image}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={currentUser.name}
                                                                        secondary={
                                                                            <div
                                                                                style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "space-between",
                                                                                    alignItems: "center",
                                                                                }}
                                                                            >
                                                                                <div>
                                                                                    <Typography
                                                                                        sx={{ display: "inline" }}
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        color="text.primary"
                                                                                    ></Typography>
                                                                                    <span
                                                                                        style={{
                                                                                            cursor: "pointer",
                                                                                            filter: comment.isSensitive
                                                                                                ? "blur(2px)"
                                                                                                : "blur(0px)",
                                                                                        }}
                                                                                    >
                                                                                        {" "}
                                                                                        — {comment.content}
                                                                                    </span>
                                                                                    <br />
                                                                                </div>
                                                                                {userID == Blog.creatorId &&
                                                                                    comment.userId != userID && (
                                                                                        <Button
                                                                                            onClick={() => {
                                                                                                Swal.fire({
                                                                                                    title: "Report User",
                                                                                                    input: "text",
                                                                                                    inputAttributes: {
                                                                                                        autocapitalize: "off",
                                                                                                    },
                                                                                                    showCancelButton: true,
                                                                                                    confirmButtonText: "Report",
                                                                                                    showLoaderOnConfirm: true,
                                                                                                    preConfirm: async (reason) => {
                                                                                                        // controller.post(endpoints.reports, {
                                                                                                        //     reportId: user.id,
                                                                                                        //     reportedId: comment.userId,
                                                                                                        //     reason: reason,
                                                                                                        //     comment: comment.content
                                                                                                        // }, token);
                                                                                                    },
                                                                                                    allowOutsideClick: () =>
                                                                                                        !Swal.isLoading(),
                                                                                                }).then((result) => {
                                                                                                    if (result.isConfirmed) {
                                                                                                        Swal.fire({
                                                                                                            title: `User Reported Successfully`,
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }}
                                                                                            variant="outlined"
                                                                                            color="primary"
                                                                                        >
                                                                                            report
                                                                                        </Button>
                                                                                    )}
                                                                                {comment.userId == userID && (
                                                                                    <Button
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
                                                                                                    const updatedComments = [
                                                                                                        ...Blog.comments.filter(
                                                                                                            (x) =>
                                                                                                                x.createdAt != comment.createdAt
                                                                                                        ),
                                                                                                    ];
                                                                                                    controller.patch(
                                                                                                        endpoints.Blogs,
                                                                                                        Blog._id,
                                                                                                        {
                                                                                                            comments: updatedComments,
                                                                                                        }
                                                                                                    );
                                                                                                    setBlog((currentBlog) => {
                                                                                                        return {
                                                                                                            ...currentBlog,
                                                                                                            comments: updatedComments,
                                                                                                        };
                                                                                                    });
                                                                                                    Swal.fire({
                                                                                                        title: "Deleted!",
                                                                                                        text: "Your file has been deleted.",
                                                                                                        icon: "success",
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }}
                                                                                        variant="contained"
                                                                                        color="error"
                                                                                    >
                                                                                        delete
                                                                                    </Button>
                                                                                )}
                                                                            </div>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                                <Divider variant="inset" component="li" />
                                                            </React.Fragment>
                                                        )
                                                    );
                                                })}
                                        </List>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>


        </main>
    )
}

export default BlogDetail