import React, { useContext, useState} from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CommentContext } from "../providers/CommentProvider";
import { Card, CardBody, Button, Modal, ModalBody } from "reactstrap";






//using the Card component that comes with reactstrap to organize some of the post details
const Comment = ({ comment, postId }) => {

 const [ theComment, setTheComment ] = useState(comment);


  const { userProfile } = useContext(UserProfileContext);
  const theUserProfile = JSON.parse(userProfile);
  const { updateComment } = useContext(CommentContext);

  const [subject, setSubject] = useState();
  const [content,setContent] = useState()

   const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const submitForm = () => {
    debugger
    updateComment({
      id: comment.id,
      subject: subject,
      content: content,
      postId: parseInt(postId),
      userProfileId: theUserProfile.id,
      createDateTime: comment.createDateTime
    })
  };


  
  return (
    <>
    <Card className="m-4">
      <p className="text-left px-2">{comment.userProfile.displayName}</p>
     
        <CardBody>
             <p className="comment-subject"><b>Subject: </b>{theComment.subject}</p>
             <p className="comment-content"><b>Conetnt: </b>{theComment.content}</p>
             <p className="comment-creationDate"><b>Comment Date: </b> {comment.createDateTime.substr(0, 10)}</p>
             {comment.userProfileId === theUserProfile.id && (
          <Button onClick={toggleEdit}>Edit</Button>
        )}
        </CardBody>
       
    </Card>

    <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="subject">Subject: </label>
            <input
              type="text"
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={theComment.subject}
            />

            <label htmlFor="content">Content: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={theComment.content}
            />

            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (!content) {
                    window.alert("You forgot to enter content!");
                  } else if (!subject) {
                    window.alert("You forgot the subject!");
                  } else {
                    
                    submitForm(comment);
                    setTheComment({
                      id: comment.id,
                      subject: subject,
                      content: content,
                      postId: parseInt(postId),
                      userProfileId: theUserProfile.id,
                      createDateTime: comment.createDateTime
                    })
                    toggleEdit();
                  }
                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
    
  )
  

}  
  export default Comment;

