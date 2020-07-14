import React, { useState } from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Post = ({ post }) => {

  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal)
  };

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
      <Button onClick={toggleEdit}></Button>
    </Card>

<Modal isOpen={editModal} toggle={toggleEdit}>
<ModalBody>
  <div className="form-group">
    <input
      type="text"
      id="name"
      onChange={e => setName(e.target.value)}
      required
      autoFocus
      className="form-control mt-4"
      defaultValue={tag.name}
    />
    <div className="">
      <Button
        type="submit"
        size="sm"
        color="info"
        onClick={(evt) => {
          evt.preventDefault();
          submitForm(tag);
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