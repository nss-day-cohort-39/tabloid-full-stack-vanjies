import React, { useContext, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";


const CommentList = () => {
 
  const { comments, getCommentsByPost } = useContext(CommentContext);
  const { post, getPost } = useContext(PostContext);

  const {id} = useParams();

  useEffect(() => {
    getCommentsByPost(id);
    getPost(id)
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentList;