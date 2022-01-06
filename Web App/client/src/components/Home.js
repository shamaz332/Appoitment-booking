import React, { useEffect } from "react";

import AllPosts from "./AllPosts";
import Loader from "./Loader";
import Profile from "./profile/Profile"
import { connect } from "react-redux";
import { get_profile } from "../actions/ProfileActions";

const Home = ({ match, auth, profile,get_profile}) => {
  useEffect(() => {
    get_profile(match.params.username);
    
  }, [get_profile, match.params.username]);

  if (profile.isLoading) return <Loader />;
  return (
    <div>
      <h1>Welcome to Appointment booking APP</h1>
        <AllPosts author={profile.profile?._id} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { get_profile })(Home);
