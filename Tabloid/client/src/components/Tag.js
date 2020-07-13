import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Tag = ({ tag }) => {
  
  return (
    <Card className="m-4">
      <p className="text-left px-2">{tag.name}</p>
    </Card>
  );
};

export default Tag;