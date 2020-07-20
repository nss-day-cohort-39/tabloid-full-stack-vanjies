import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CategoryContext } from "../providers/CategoryProvider";


export default function NewCategoryForm() {
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);
    
    const [name, setName] = useState();
   

    const submitForm = (e) => {
        e.preventDefault();
        if (!name) {
            window.alert("You forgot to enter a category name!")
        }
        else 
        {
            const newCategory = {
                name: name
            }
            addCategory(newCategory)
                .then(() => history.push("/category"))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="name">Category Name</Label>
                <Input placeholder="Category Name" id="new-category-name" type="text" onChange={e => setName(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form >
    );
}