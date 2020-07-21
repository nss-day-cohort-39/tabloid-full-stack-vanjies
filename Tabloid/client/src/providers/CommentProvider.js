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
      fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


  const addComment = (comment) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }).then((resp) => {
        return resp.json()
      }
      ));


  
 




  return (
    <CommentContext.Provider value={{ comments, getCommentById, addComment, getAllComments }}>
      {props.children}
    </CommentContext.Provider>
  );
};