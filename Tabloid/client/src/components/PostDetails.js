import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
          <div><img src={post.imageLocation} className="post-details-image"/></div>
            <p className="post-details-title"><b>Post Title: </b> {post.title}</p>
            <p className="post-details-postedBy"><b>Posted By: </b> {post.userProfile.displayName}</p>
            <pre className="post-details-content">{post.content}</pre>
            <p className="post-details-publishDate"><b>Publish Date: </b> {post.publishDateTime.substr(0, 10)}</p>
          </div>
        </div>
        <Button onClick={toggleDelete}>Delete Post</Button>

        <Link to={`/getbypost/${id}`}>
            <p>View Comments</p>
          </Link>
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
