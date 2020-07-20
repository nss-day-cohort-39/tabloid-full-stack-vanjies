import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllComments = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setComments));

  const getCommentById = (id) =>
    getToken().then((token) =>
      fetch(`/api/comment/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


      const getCommentsByPostId = (id) =>
      getToken().then((token) =>
        fetch(`/api/comment/getbypost/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setComments)
      );


  return (
    <CommentContext.Provider value={{ comments, getAllComments,  getCommentById, getCommentsByPostId }}>
      {props.children}
    </CommentContext.Provider>
  );
};