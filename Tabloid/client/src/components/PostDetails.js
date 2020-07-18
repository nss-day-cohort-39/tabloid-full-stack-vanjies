import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap"
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory } from "react-router-dom";


const PostDetail = () => {
    const history = useHistory();

    const { categories, getAllCategories } = useContext(CategoryContext);
    const { getPostById, updatePost, deletePost } = useContext(PostContext);

    const { id } = useParams();

    const [post, setPost] = useState({ category: {}, userProfile: {}, publishDateTime: "" });
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [categoryId, setCategoryId] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [publishDateTime, setPublishDateTime] = useState("");


    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const toggleEdit = () => {
        setEditModal(!editModal)
    };

    const toggleDelete = () => {
        setDeleteModal(!deleteModal);
    };

    const submitForm = () => {

        const thePost = {
            id: parseInt(id),
            title: title,
            content: content,
            categoryId: categoryId,
            imageLocation: imageLocation,
            publishDateTime: publishDateTime,
            createDateTime: post.createDateTime,
            isApproved: true

        }
        console.log(thePost);
        updatePost(thePost);
    };

    useEffect(() => {
        getPostById(id).then((post) => {
            setPost(post);
            setTitle(post.title);
            setContent(post.content);
            setCategoryId(post.categoryId);
            setImageLocation(post.imageLocation);
            setPublishDateTime(post.publishDateTime);

            getAllCategories();
        });
    }, []);

    if (!post) {
        return null;
    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        <div><img src={imageLocation} className="post-details-image" /></div>
                        <p className="post-details-title"><b>Post Title: </b> {title}</p>
                        <p className="post-details-postedBy"><b>Posted By: </b> {post.userProfile.displayName}</p>
                        <pre className="post-details-content">{content}</pre>
                        <p className="post-details-publishDate"><b>Publish Date: </b> {post.publishDateTime.substr(0, 10)}</p>
                    </div>
                </div>
                <Button onClick={toggleEdit}>Edit</Button>
                <Button onClick={toggleDelete}>Delete Post</Button>
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
                            value={title}
                        />

                        <label htmlFor="content">Content: </label>
                        <input
                            type="text-area"
                            id="content"
                            onChange={e => setContent(e.target.value)}
                            autoFocus
                            className="form-control mt-4"
                            value={content}
                        />

                        <label htmlFor="category">Category: </label>
                        <select
                            id="category"
                            onChange={e => setCategoryId(parseInt(e.target.value))}
                            required
                            autoFocus
                            className="form-control mt-4"
                            value={categoryId}
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
                            value={imageLocation}
                        />

                        <label htmlFor="publicationDate">Publication Date: </label>
                        <input
                            type="date"
                            name="publishDateTime"
                            id="new=post-publish-date-time"
                            placeholder="Pick a Date"
                            value={publishDateTime.substr(0, 10)}
                            onChange={e => setPublishDateTime(e.target.value)}
                        />

                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (content === "") {
                                        window.alert("You forgot to enter content!")
                                    }
                                    else if (title === "") {
                                        window.alert("You forgot a title!")
                                    }
                                    else if (categoryId === "0") {
                                        window.alert("You forgot a category!")
                                    }
                                    else {
                                        console.log(post);
                                        submitForm(post);
                                        toggleEdit();
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

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalBody>
                    <div className="form-group">
                        <h3>Do you want to delete the post "{post.title}"?</h3>
                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deletePost(post.id).then(() => history.push(`/`));
                                }}
                                className="btn mt-4"
                            >
                                Yes
              </Button>
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={toggleDelete}
                            >
                                No
              </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
};