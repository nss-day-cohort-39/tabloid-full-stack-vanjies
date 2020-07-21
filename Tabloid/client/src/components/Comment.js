import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CommentContext } from "../providers/CommentProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostContext } from "../providers/PostProvider";



//using the Card component that comes with reactstrap to organize some of the post details
const Comment = ({ comment }) => {

  
  return (
    <>
    <Card className="m-4">
      <p className="text-left px-2">{comment.userProfile.displayName}</p>
     
        <CardBody>
             <p className="comment-subject"><b>Subject: </b>{comment.subject}</p>
             <p className="comment-content"><b>Conetnt: </b>{comment.content}</p>
             <p className="comment-creationDate"><b>Comment Date: </b> {comment.createDateTime.substr(0, 10)}</p>
        </CardBody>
       
    </Card>
    </>
    
  )
  

}  
  export default Comment;

