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
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setPosts)
    );

  const getPostById = (id) =>
    getToken().then((token) =>
      fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );

  const addPost = (post) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then((resp) => {
        return resp.json();
      })
    );

  const getPostsByUser = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setPosts)
    );
  };

  const getPostsByCategory = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbycategory/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setPosts)
    );
  };

  const deletePost = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getAllPosts)
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        getPostsByUser,
        getPostById,
        addPost,
        deletePost,
        getPostsByCategory,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
