import React, { useState, useContext } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { PostContext } from "../providers/PostProvider"

//using the Card component that comes with reactstrap to organize some of the post details
const Post = ({ post }) => {

  const { deletePost } = useContext(PostContext)
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal)
  };


  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>

        <CardBody>
          <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
          <p>{post.category.name}</p>
        </CardBody>
        <Button>Delete</Button>
      </Card>

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>
              Do you want to delete the post "{post.title}"?
            </h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deletePost(post.id)
                }
                }
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >No</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Post;