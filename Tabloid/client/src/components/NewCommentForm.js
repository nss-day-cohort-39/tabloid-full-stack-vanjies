import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CommentContext } from "../providers/CommentProvider";

export default function NewCommentForm() {
  const history = useHistory();
  const { addComment } = useContext(CommentContext);

  const { id } = useParams();

  const [subject, setSubject] = useState();
  const [content, setContent] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    if (!content) {
      window.alert("You forgot to enter content!");
    } else if (!subject) {
      window.alert("You forgot a subject!");
    } else {
      const NewComment = {
        subject: subject,
        content: content,
        createDateTime: new Date(),
        postId: parseInt(id)
      };
      addComment(NewComment)
        .then(() => history.push(`/`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>

        <Label for="title">Subject</Label>
        <Input
          placeholder="Subject"
          id="new-comment-subject"
          type="text"
          onChange={(e) => setSubject(e.target.value)}
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
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}
