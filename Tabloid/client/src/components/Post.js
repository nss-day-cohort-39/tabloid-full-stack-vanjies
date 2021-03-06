import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Post = ({ post, setCategoryPostModal, categoryPostModal }) => {
  const history = useHistory();

  const { categories, getAllCategories } = useContext(CategoryContext);
  const { userProfile } = useContext(UserProfileContext);
  const theUserProfile = JSON.parse(userProfile);

  useEffect(() => {
    getAllCategories();
  }, []);

  const { updatePost } = useContext(PostContext);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [categoryId, setCategoryId] = useState(post.category.id);
  const [imageLocation, setImageLocation] = useState(post.imageLocation);
  const [publishDateTime, setPublishDateTime] = useState(post.publishDateTime);

  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const submitForm = () => {
    updatePost({
      id: post.id,
      title: title,
      content: content,
      categoryId: parseInt(categoryId),
      imageLocation: imageLocation,
      publishDateTime: publishDateTime,
      createDateTime: post.createDateTime,
    }).then(() => history.push(`/posts/${post.id}`));
  };

  const { deletePost } = useContext(PostContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">
          Posted by: {post.userProfile.displayName}
        </p>
        <CardBody>
          <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
          <p>{post.category.name}</p>
        </CardBody>
        {post.userProfileId === theUserProfile.id && (
          <Button onClick={toggleEdit}>Edit</Button>
        )}
        {post.userProfileId === theUserProfile.id && (
          <Button onClick={toggleDelete}>Delete</Button>
        )}
      </Card>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.title}
            />

            <label htmlFor="content">Content: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.content}
            />

            <label htmlFor="category">Category: </label>
            <select
              id="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={post.category.id}
            >
              <option key="0" value="0">
                Select A Category
              </option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label htmlFor="imageLocation">Image URL: </label>
            <input
              type="text"
              id="imageLocation"
              onChange={(e) => setImageLocation(e.target.value)}
              autoFocus
              className="form-control mt-4"
              defaultValue={post.imageLocation}
            />

            <label htmlFor="publicationDate">Publication Date: </label>
            <input
              type="date"
              name="publishDateTime"
              id="new=post-publish-date-time"
              placeholder="Pick a Date"
              defaultValue={post.publishDateTime.substr(0, 10)}
              onChange={(e) => setPublishDateTime(e.target.value)}
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
                  } else if (!title) {
                    window.alert("You forgot a title!");
                  } else if (categoryId === "0") {
                    window.alert("You forgot a category!");
                  } else {
                    submitForm(post);
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

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Do you want to delete the post "{post.title}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deletePost(post.id)
                    .then(() => {
                      toggleDelete();
                    })
                    .then(() => setCategoryPostModal(!categoryPostModal)); //setting the category post modal and toggling it
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

export default Post;
