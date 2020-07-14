import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Post = ({ post }) => {

  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.displayName}

      </p>

      <CardBody>
        <Link to={`/posts/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>
        <p>{post.category.name}</p>
      </CardBody>
      <Button>Delete</Button>
    </Card>
  );
};

export default Post;