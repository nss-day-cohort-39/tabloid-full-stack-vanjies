import React, { useState, useContext, useEffect } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import Post from "./Post";
import { PostContext } from "../providers/PostProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Category = ({ category }) => {
  const { categories, getAllCategories } = useContext(CategoryContext);
  const { getPostsByCategoryId } = useContext(PostContext);

  const [categoryPostModal, setCategoryPostModal] = useState(false);
  const [postsByCategory, setPostsByCategory] = useState([]);

  //toggles the CategoryPosts
  //sets the modal to not active then on click will activate
  //once the modal activates it is invoking the getPostsByCategoryId and passes it a id value
  //then sets the state of postsByCategory to be mapped over on line 38
  const toggleCategoryPosts = () => {
    setCategoryPostModal(!categoryPostModal);
    //always passing the category.id from object destructuring
    getPostsByCategoryId(category.id).then(setPostsByCategory);
  };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{category.name}</p>
        <Button onClick={() => toggleCategoryPosts()}>View Posts</Button>
      </Card>
      <Modal isOpen={categoryPostModal} toggle={toggleCategoryPosts}>
        <ModalBody>
          <div className="row justify-content-center">
            <div className="cards-column">
              {postsByCategory.map((post) => (
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
