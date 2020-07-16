import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Post = ({ post }) => {

  const { categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
}, []);

const { updatePost } = useContext(PostContext)

  const [title, setTitile] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [categoryId, setCategoryId] = useState(post.category.name);
  const [imageLocation, setImageLocation] = useState(post.imageLocation);
  const [publishDateTime, setPublishDateTime] = useState(post.publishDateTime);

  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal)
  };

  const submitForm = () => {
    updatePost({
      id: post.id,
      title: title,
      content: content,
      categoryId: parseInt(categoryId),
      imageLocation: imageLocation,
      publishDateTime: publishDateTime
    });
    toggleEdit();
  }

  return (
<>

    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.displayName}

      </p>

      <CardBody>
        <Link to={`/posts/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>
        <p>{post.category.name}</p>
      </CardBody>
      <Button onClick={toggleEdit}>Edit</Button>
    </Card>

<Modal isOpen={editModal} toggle={toggleEdit}>
<ModalBody>
  <div className="form-group">
    <label htmlFor="title">Title: </label>
    <input
      type="text"
      id="title"
      onChange={e => setTitile(e.target.value)}
      required
      autoFocus
      className="form-control mt-4"
      defaultValue={post.title}
    />

    <label htmlFor="content">Content: </label>
    <input
      type="text-area"
      id="content"
      onChange={e => setContent(e.target.value)}
      required
      autoFocus
      className="form-control mt-4"
      defaultValue={post.content}
    />

    <label htmlFor="category">Category: </label>
    <select
      id="category"
      onChange={e => setCategoryId(e.target.value)}
      required
      autoFocus
      className="form-control mt-4"
      defaultValue={post.category.id}
    > 
    <option key="0" value="0">Select A Category</option>
                    {categories.map(c => (
                        <option value={c.id} key={c.id} >
                            {c.name}
                        </option>
                    ))}
    </select>

    <label htmlFor="imageLocation">Image URL: </label>
    <input
      type="text"
      id="imageLocation"
      onChange={e => setImageLocation(e.target.value)}
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
      onChange={e => setPublishDateTime(e.target.value)}
    />



    <div className="">
      <Button
        type="submit"
        size="sm"
        color="info"
        onClick={(evt) => {
          evt.preventDefault();
          submitForm(post);
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
  );
};

export default Post;