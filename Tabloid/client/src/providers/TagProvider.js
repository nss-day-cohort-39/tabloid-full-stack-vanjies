import React, { useState, useContext } from "react";
import {UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllTags = () =>
  getToken().then((token) =>
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json())
      .then(setTags));
      
   const addTag = (tag) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
      }).then(resp => {
        return resp.json()
      }
      ));

  return (
    <TagContext.Provider value={{tags, getAllTags, addTag}}>
      {props.children}
    </TagContext.Provider>
  );
};