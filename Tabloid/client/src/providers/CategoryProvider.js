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

    // const addPost = (post) => {
    //   return fetch("/api/post", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(post),
    //   }).then();
    // };

    // const addPost = (post) =>
    //     getToken().then((token) =>
    //         fetch(apiUrl, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(post)
    //         }).then(resp => {
    //             if (resp.ok) {
    //                 return resp.json()
    //                     .then(getPostById)
    //             }
    //             throw new Error("Unauthorized");
    //         }));

    // const getPostsByUser = (id) => {
    //   return fetch(`/api/post/getbyuser/${id}`).then((res) => res.json()).then(setPosts);
    // };


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
        <CategoryContext.Provider value={{ categories, getAllCategories, getCategoryById }}>
            {props.children}
        </CategoryContext.Provider>
    );
};