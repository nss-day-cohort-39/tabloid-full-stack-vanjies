import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {

  const apiUrl = "/api/post";
  const [posts, setPosts] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllPosts = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setPosts));

  const getPostById = (id) =>
    getToken().then((token) =>
      fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));



  const getPostsByUser = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()).then(setPosts));
  };





  return (
    <PostContext.Provider value={{ posts, getAllPosts, getPostsByUser, getPostById }}>
      {props.children}
    </PostContext.Provider>
  );
};