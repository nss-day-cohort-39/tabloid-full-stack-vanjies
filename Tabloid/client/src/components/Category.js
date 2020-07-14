import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Category = ({ category }) => {

  const { deleteCategory } = useContext(CategoryContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDelete = () => {
    setDeleteModal(!deleteModal)
  };



  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{category.name}

          <Button onClick={toggleDelete}>Delete</Button>


        </p>


      </Card>

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>
              Are you sure you want to delete this category "{category.name}"?
            </h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCategory(category.id)
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
                onClick={toggleDelete}
              >No</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Category;