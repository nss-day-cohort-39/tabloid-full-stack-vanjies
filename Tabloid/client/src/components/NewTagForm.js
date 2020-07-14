import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TagContext } from "../providers/TagProvider";


export default function NewTagForm() {
    const history = useHistory();
    const { addTag } = useContext(TagContext);
    
    const [name, setName] = useState();
   

    const submitForm = (e) => {
        e.preventDefault();
        if (!name) {
            window.alert("You forgot to enter tag name!")
        }
        else 
        {
            const newTag = {
                name: name
            }
            addTag(newTag)
                .then(() => history.push("/tag"))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="name">Tag Name</Label>
                <Input placeholder="Tag Name" id="new-tag-name" type="text" onChange={e => setName(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form >
    );
}