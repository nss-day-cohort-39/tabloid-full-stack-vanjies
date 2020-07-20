import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";


const CommentList = () => {

  const { post, setPost } = useState({})
  const { comments, getCommentsByPostId } = useContext(CommentContext)
  const { getPost } = useContext(PostContext)

  const {id} = useParams();

  useEffect(() => {
    getCommentsByPostId(id);
    getPost(id).then(setPost)
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentList;