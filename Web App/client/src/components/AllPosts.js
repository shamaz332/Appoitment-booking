import { Button, ButtonGroup, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { FetchPosts, UpdatePost } from "./../actions/AppointmentActions";
import React, { useEffect } from "react";

import Loader from "./Loader";
import { connect } from "react-redux";

const AllPosts = ({ FetchPosts, post, author, UpdatePost }) => {
  useEffect(() => {
    FetchPosts(author);
  }, [FetchPosts, author]);
  const reject = (postID) => {
    console.log("author",postID);
    const formdata = {
      author: postID,
      status: "REJECTED",
    };
    console.log(UpdatePost(formdata));
    UpdatePost(formdata);
  };
  const accept = (postID) => {
    console.log("author",postID);
    const formdata = {
      author: postID,
      status: "ACCEPTED",
    };
    console.log(UpdatePost(formdata));
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
            {post.status === "REJECTED" || post.status === "ACCEPTED" ? (
              <h3>You have {post.status.toLowerCase()} this offer</h3>
            ) : (
              <ButtonGroup>
                <Button onClick={() => reject(post._id)}>Reject Request</Button>
                <Button onClick={() => accept(post._id)}>Accept Request</Button>
              </ButtonGroup>
            )}
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
export default connect(mapStateToProps, { UpdatePost, FetchPosts })(AllPosts);
