import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";

export default function NewPostForm() {
  const history = useHistory();
  const { addPost } = useContext(PostContext);
  const { categories, getAllCategories } = useContext(CategoryContext);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [publicationDate, setPublicationDate] = useState();

  useEffect(() => {
    getAllCategories();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (!content) {
      window.alert("You forgot to enter content!");
    } else if (!title) {
      window.alert("You forgot a title!");
    } else if (!category) {
      window.alert("You forgot a category!");
    } else {
      const NewPost = {
        title: title,
        content: content,
        categoryId: parseInt(category),
        imageLocation: imageUrl,
        publishDateTime: publicationDate,
        createDateTime: new Date(),
        isApproved: true,
      };
      addPost(NewPost)
        .then((p) => history.push(`/posts/${p.id}`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          placeholder="Title"
          id="new-post-title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="new-post-content">Content</Label>
        <Input
          placeholder="Content"
          id="new-post-content"
          type="textarea"
          onChange={(e) => setContent(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select Category</Label>
        <Input
          type="select"
          name="select"
          id="new-post-category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option key="0" value="0">
            Select A Category
          </option>
          {categories.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="imageLocation">Image Url</Label>
        <Input
          type="text"
          name="imageLocation"
          id="new-post-image-url"
          placeholder="Image Url"
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="publicationDate">Publication Date</Label>
        <Input
          type="date"
          name="publicationDate"
          id="new=post-publication-date"
          placeholder="Pick a Date"
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}
