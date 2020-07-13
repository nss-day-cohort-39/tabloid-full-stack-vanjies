import React, { useState, useContext } from "react";
import {UserProfileContext } from "../providers/UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  
  const apiUrl = "/api/category";
  const [categories, setCategories] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllCategories = () =>
  getToken().then((token) =>
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json())
      .then(setCategories));
      
      

// const getPostsByUser = () => {
//   getToken().then((token) =>
//     fetch(`${apiUrl}/getbyuser`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(resp => resp.json()).then(setPosts));
// };


  return (
    <CategoryContext.Provider value={{categories, getAllCategories}}>
      {props.children}
    </CategoryContext.Provider>
  );
};