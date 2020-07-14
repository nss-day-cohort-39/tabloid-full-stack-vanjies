import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { TagContext } from "../providers/TagProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Tag = ({ tag }) => {

  const { updateTag, deleteTag } = useContext(TagContext)
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
    updateTag({
      id: tag.id,
      name: name
    });
    toggleEdit();
  }

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{tag.name}</p>
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
              defaultValue={tag.name}
            />
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  submitForm(tag);
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
              Are you sure you want to delete the tag "{tag.name}"?
                    </h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTag(tag.id)
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

export default Tag;