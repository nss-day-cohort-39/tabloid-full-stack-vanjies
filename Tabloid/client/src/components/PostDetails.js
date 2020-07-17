import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap"
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";


const PostDetail = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { getPostById, updatePost } = useContext(PostContext);

    const history = useHistory();

    const { id } = useParams();

    const [post, setPost] = useState({ category: {}, userProfile: {}, publishDateTime: "" });
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [categoryId, setCategoryId] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [publishDateTime, setPublishDateTime] = useState("");
   

    const [editModal, setEditModal] = useState(false);

    const toggleEdit = () => {
        setEditModal(!editModal)
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
        updatePost(thePost).then(() => history.push(`/posts/${id}`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
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

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        <p className="post-details-image">{imageLocation}</p>
                        <p className="post-details-title">{title}</p>
                        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                        <p className="post-details-content">{content}</p>
                        <p className="post-details-publishDate">{publishDateTime}</p>
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