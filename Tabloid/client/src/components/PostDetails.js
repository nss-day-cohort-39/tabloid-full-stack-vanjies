import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { Button, Modal, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";

const PostDetail = () => {
  const { getPostById } = useContext(PostContext);
  const [post, setPost] = useState();
  const { id } = useParams();
  const history = useHistory();

  const { deletePost } = useContext(PostContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
    getPostById(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-6">
            <p className="post-details-image">{post.imageLocation}</p>
            <p className="post-details-title">{post.title}</p>
            <p className="text-left px-2">
              Posted by: {post.userProfile.displayName}
            </p>
            <textarea className="post-details-content">{post.content}</textarea>
            <p className="post-details-publishDate">{post.publishDateTime}</p>
          </div>
        </div>
        <Button onClick={toggleDelete}>Delete Post</Button>
      </div>

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Do you want to delete the post "{post.title}"?</h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deletePost(post.id).then(() => history.push(`/`));
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PostDetail;
