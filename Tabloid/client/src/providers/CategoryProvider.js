import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

  const apiUrl = "/api/category";
  const [categories, setCategories] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllCategories = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setCategories));
  }

  const getCategoryById = (id) =>
    getToken().then((token) =>
      fetch(`/api/category/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, getCategoryById }}>
      {props.children}
    </CategoryContext.Provider>
  );
};