import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment";
import { PostContext } from "../providers/PostProvider";
import { useParams, Link } from "react-router-dom";



const CommentList = () => {

  const [ post, setPost ] = useState({})
  const { comments, getCommentsByPostId, comment } = useContext(CommentContext)
  const { getPostById } = useContext(PostContext)

  const {id} = useParams();

  useEffect(() => {
    getCommentsByPostId(id);
    getPostById(id).then(setPost)
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
      <p className="post-details-title"><b>Post Title: </b> {post.title}</p>
     
        <div className="cards-column">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={id} />
          ))}
           <Link to={'/'}>Back to Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default CommentList;