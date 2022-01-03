import React, { useEffect } from "react";
import { edit_profile, get_profile } from "./../../actions/ProfileActions";

import AllPosts from "./../AllPosts";
import { Button } from "reactstrap";
import EditProfile from "./EditProfile";
import Loader from "./../Loader";
import { connect } from "react-redux";
import defaultDp from "./../../images/defaultDp.png";

const Profile = ({ match, auth, profile, get_profile, edit_profile }) => {
  useEffect(() => {
    get_profile(match.params.username);
  }, [get_profile, match.params.username]);

  if (profile.isLoading) return <Loader />;
  if (profile.isEditing) return <EditProfile />;
  return (
    <div>
      <div className="row">
        <div className="col-sm-3 text-center m-auto">
          <img
            src={defaultDp}
            className="rounded img-fluid"
            alt="defaultDp"
            width="200px"
            height="200px"
          />
        </div>
        <div className="col-sm-9">
          {match.params.username === auth.user?.username ? (
            <Button
              style={{ float: "right" }}
              color="light"
              onClick={() => edit_profile()}
            >
              <i className="fa fa-pencil" />
            </Button>
          ) : null}
          <div className="text-danger display-5">
            {profile.profile?.username}
          </div>
          <div className="text-info display-4">
            {profile.profile?.info?.fullname}
          </div>

          <div className="text-muted display-5">{profile.profile?.email}</div>
        </div>
      </div>
      <hr />
      <h2 className="text-muted m-4">Appointment Requests {match.params.username}</h2>
      {/* <AllPosts author={match.params.username} /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { get_profile, edit_profile })(Profile);
