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

  const addCategory = (category) =>
  getToken().then((token) =>
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    }).then(resp => {
      return resp.json()
    }
    ));

    const updateCategory = (category) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
      }).then(getAllCategories)
      );

  const getCategoryById = (id) =>
    getToken().then((token) =>
      fetch(`/api/category/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));

      const deleteCategory = (id) => {
        return getToken().then((token) =>
          fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then(getAllCategories)
        );
      };

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};