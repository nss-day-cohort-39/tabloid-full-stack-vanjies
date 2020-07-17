import React, { useEffect } from "react";
import {Button} from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider";
import { PostContext } from "../providers/CategoryProvider";

const postByCategory = () => {

    const { getAllCategories, getCategoryById }


    useEffect(() => {
        getAllCategories();},
        []);

    return (
        <> 
        
    <div className="container">
      <div className="row justify-content-center">
        <Button className="cards-column">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </Button>
      </div>
    </div>
        
        
        </>









    )
  
};



