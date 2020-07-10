import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
//using the Card component that comes with reactstrap to organize some of the post details
const PostDetail = () => {
    const { getPostById } = useContext(PostContext)
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <p className="post-details-image">{post.imageLocation}</p>
                    <p className="post-details-title">{post.title}</p>
                    <p className="text-left px-2">Posted by: {post.userProfile.DisplayName}</p>
                    <p className="post-details-content">{post.content}</p>
                    <p className="post-details-publishDate">{post.publishDateTime}</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;