import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getComment = (id) => {
    return getToken().then((token) =>
        fetch(apiUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};


      const getCommentsByPostId = (id) =>
      getToken().then((token) =>
        fetch(apiUrl + `/getbypost/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(setComments)
      );


  return (
    <CommentContext.Provider value={{ comments, getComment, getCommentsByPostId }}>
      {props.children}
    </CommentContext.Provider>
  );
};