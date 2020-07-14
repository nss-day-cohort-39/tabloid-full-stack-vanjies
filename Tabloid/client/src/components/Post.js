import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
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