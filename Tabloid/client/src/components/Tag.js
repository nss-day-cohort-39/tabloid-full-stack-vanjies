import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { TagContext } from "../providers/TagProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const Tag = ({ tag }) => {

  const { updateTag } = useContext(TagContext)
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState();

  const toggleEdit = () => {
    setEditModal(!editModal)
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
      <Link onClick={toggleEdit}>Update</Link>
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

    </>
  );
};

export default Tag;