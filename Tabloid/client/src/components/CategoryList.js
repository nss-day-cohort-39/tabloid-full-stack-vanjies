import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const CategoryList = () => {
 
  const { categories, getAllCategories } = useContext(CategoryContext);
  const history = useHistory();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>

    <Button onClick={
      () => {history.push(`/newcategory`)}
      }>
      Add Category
    </Button>

    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default CategoryList;