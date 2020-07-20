import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CommentContext } from "../providers/CommentProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";



//using the Card component that comes with reactstrap to organize some of the post details
const Comment = ({ comment }) => {

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  
  return (
    <>
    <Card className="m-4">
      <p className="text-left px-2">{comment.userProfile.displayName}</p>
        <CardBody>
             <p className="comment-subject">Subject: {comment.subject}</p>
             <p className="comment-content">Conetnt: {comment.content}</p>
             <p className="comment-creationDate">Subject: {comment.createDateTime}</p>
        </CardBody>
    </Card>
    </>
    )
  }
  export default Comment;