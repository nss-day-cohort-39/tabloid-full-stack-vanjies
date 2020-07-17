import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap"
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";


const PostDetail = () => {
    const { getPostById, updatePost } = useContext(PostContext)
    const [post, setPost] = useState();
    const [editModal, setEditModal] = useState(false);
    const { categories } = useContext(CategoryContext);

    const post = getPostById(id);

    const { id } = useParams();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [categoryId, setCategoryId] = useState(post.category.name);
    const [imageLocation, setImageLocation] = useState(post.imageLocation);
    const [publishDateTime, setPublishDateTime] = useState(post.publishDateTime);

  

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);


    const toggleEdit = () => {
        setEditModal(!editModal)
    };

    const submitForm = () => {
        updatePost({
            id: post.id,
            title: title,
            content: content,
            categoryId: parseInt(categoryId),
            imageLocation: imageLocation,
            publishDateTime: publishDateTime,
            createDateTime: post.createDateTime

        });
        toggleEdit();
    }

    if (!post) {
        return null;
    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        <p className="post-details-image">{post.imageLocation}</p>
                        <p className="post-details-title">{post.title}</p>
                        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                        <p className="post-details-content">{post.content}</p>
                        <p className="post-details-publishDate">{post.publishDateTime}</p>
                    </div>

                    <Button onClick={toggleEdit}>Edit</Button>
                </div>
            </div>

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            id="title"
                            onChange={e => setTitle(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={post.title}
                        />

                        <label htmlFor="content">Content: </label>
                        <input
                            type="text-area"
                            id="content"
                            onChange={e => setContent(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={post.content}
                        />

                        <label htmlFor="category">Category: </label>
                        <select
                            id="category"
                            onChange={e => setCategoryId(e.target.value)}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={post.category.id}
                        >
                            <option key="0" value="0">Select A Category</option>
                            {categories.map(c => (
                                <option value={c.id} key={c.id} >
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="imageLocation">Image URL: </label>
                        <input
                            type="text"
                            id="imageLocation"
                            onChange={e => setImageLocation(e.target.value)}
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={post.imageLocation}
                        />

                        <label htmlFor="publicationDate">Publication Date: </label>
                        <input
                            type="date"
                            name="publishDateTime"
                            id="new=post-publish-date-time"
                            placeholder="Pick a Date"
                            defaultValue={post.publishDateTime.substr(0, 10)}
                            onChange={e => setPublishDateTime(e.target.value)}
                        />



                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (!content) {
                                        window.alert("You forgot to enter content!")
                                    }
                                    else if (!title) {
                                        window.alert("You forgot a title!")
                                    }
                                    else if (categoryId === "0") {
                                        window.alert("You forgot a category!")
                                    }
                                    else {
                                        submitForm(post);
                                    }
                                }}
                                className="btn mt-4"
                            >
                                Save
      </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
};

export default PostDetail;