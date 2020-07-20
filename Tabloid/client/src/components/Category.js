import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";


//using the Card component that comes with reactstrap to organize some of the post details
const Category = ({ category }) => {
  const history = useHistory()

  const { updateCategory, deleteCategory } = useContext(CategoryContext)
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState();

  const toggleEdit = () => {
    setEditModal(!editModal)
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal)
  };

  const submitForm = () => {
    updateCategory({
      id: category.id,
      name: name,
    });
    toggleEdit();
  }
  
  return (
    <>
    <Card className="m-4">
      <p className="text-left px-2">{category.name}</p>
        <Button onClick={toggleEdit}>Edit</Button>
        <Button onClick={toggleDelete}>Delete</Button>
    </Card>

    <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      onChange={e => setName(e.target.value)}
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
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>
              Are you sure you want to delete the category "{category.name}"?
                    </h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCategory(category.id)
                  .then(() => {toggleDelete()}
                  )
                }
                }
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
     
      </>
  );
};

export default Category;