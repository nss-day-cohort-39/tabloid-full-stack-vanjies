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



  // const getPostsByUser = (id) => {
  //   return fetch(`/api/post/getbyuser/${id}`).then((res) => res.json()).then(setPosts);
  // };

  //   const addPost = (post) => {
  //     return fetch("/api/post", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(post),
  //     }).then(getAllPosts);
  //   };

  //   const searchPosts = (searchTerm) => {
  //     if (!searchTerm) {
  //       getAllPosts()
  //       return
  //     }
  //     return fetch(`api/post/search?q=${searchTerm}&sortDesc=true`)
  //         .then((res) => res.json())
  //         .then(setPosts)
  //   }     




  return (
    <PostContext.Provider value={{ posts, getAllPosts, getPostById }}>
      {props.children}
    </PostContext.Provider>
  );
};