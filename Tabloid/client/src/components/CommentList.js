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
     
     
        <div className="cards-column">
        <p className="post-details-title"><b>Post Title: </b> {post.title}</p>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={id} />
          ))}
          <br></br>
          <br></br>
          <br></br>
          <Link to={`/posts/${id}`} type="button" class="btn btn-info" value="Back to Posts" size="sm">
            Back to Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommentList;