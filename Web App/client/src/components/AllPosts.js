import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { FetchPosts, UpdatePost } from "./../actions/PostActions";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Loader from "./Loader";
import Moment from "react-moment";
import { connect } from "react-redux";

const AllPosts = ({ FetchPosts, post, author,UpdatePost }) => {
  useEffect(() => {
    FetchPosts(author);
  }, [FetchPosts, author]);
  
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("author",author)
    const formdata = {
      author,
      status: "REJECTED",
    };
    console.log(   UpdatePost(formdata))
    UpdatePost(formdata);
  };
  const Allposts = post.posts.map((post) => (
    <div className="post col-md-8 mx-auto" key={post._id}>
      <Row>
        <Col sm="12">
          <Card body outline color="secondary">
            <CardTitle>
              <strong>Slot :</strong> {post.slot}{" "}
            </CardTitle>
            <CardText>
              <strong>Description :</strong> {post.description}
            </CardText>
            <CardText>
              <strong>Client Name :</strong> {post.senderName}
            </CardText>
            <Button onClick={handleSubmit} disabled={post.status==="REJECTED"}>
              {post.status === "REQUESTED" ? "ACCEPT" : "REJECTED"}
            </Button>
          </Card>
        </Col>
      </Row>
      <hr className="m-1" />
    </div>
  ));
  if (post.loading) return <Loader />;
  return <div className="blogposts">{Allposts}</div>;
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, {UpdatePost, FetchPosts })(AllPosts);
