import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Category = ({ category }) => {
  const { updateCategory } = useContext(CategoryContext);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState();

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const submitForm = () => {
    updateCategory({
      id: category.id,
      name: name,
    });
    toggleEdit();
  };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{category.name}</p>
        <Button onClick={toggleEdit}>Edit</Button>
      </Card>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={category.name}
            />
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  submitForm(category);
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

export default Category;
