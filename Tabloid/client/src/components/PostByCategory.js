import React, { useEffect, useContext } from "react";
import { Button } from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider";
import { PostContext } from "../providers/CategoryProvider";
import PostCategory from "./PostCategorySelector";
const PostByCategory = () => {
  const { getAllCategories, getCategoryById, categories } = useContext(
    CategoryContext
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {categories.map((category) => (
              <PostCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostByCategory;
