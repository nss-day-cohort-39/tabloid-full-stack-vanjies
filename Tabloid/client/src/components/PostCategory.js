import React, { useState, useContext, useEffect } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import Post from "./Post";
import { PostContext } from "../providers/PostProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Category = ({ category }) => {
  const { categories } = useContext(CategoryContext);
  const { posts, getAllPosts } = useContext(PostContext);
  const [categoryPostModal, setCategoryPostModal] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const toggleCategoryPosts = () => {
    setCategoryPostModal(!categoryPostModal);
  };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{category.name}</p>
        <Button onClick={toggleCategoryPosts}>View Posts</Button>
      </Card>

      <Modal isOpen={categoryPostModal} toggle={toggleCategoryPosts}>
        <ModalBody>
          <div className="row justify-content-center">
            <div className="cards-column">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Category;
