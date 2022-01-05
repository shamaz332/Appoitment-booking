// import defaultDp from "./../../images/defaultDp.png";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from "react";

import { connect } from "react-redux";
import { update_profile } from "./../../actions/ProfileActions";

const EditProfile = ({ profile, update_profile }) => {
  const { username, email, slots } = profile.profile;
  // const [Profileimg, setProfileimg] = useState(defaultDp);
  const [Profileform, setProfileform] = useState({
    availability: slots ? slots.availability : "",
   
  });

  const handleChange = (e) => {
    setProfileform({
      ...Profileform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      username,
      slots: Profileform,
    };
    update_profile(JSON.stringify(formdata));
  };

  return (
    <Form className="col-lg-6 mx-auto">
      <FormGroup>
        <Label className="text-info display-4">{username}</Label>
        <br />
        <Label className="text-muted display-5">{email}</Label>
      </FormGroup>
      <hr />

      <FormGroup>
        <Label>Appointment Slots</Label>
      
          <input type="datetime-local"  name="availability"
          value={Profileform.availability}
          onChange={handleChange}></input>
      </FormGroup>

      <Button onClick={handleSubmit} className="mt-2">
        Save Changes
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { update_profile })(EditProfile);

// const handleChange = (e) => {
//   if (!e.target.files[0]) return;
//   var reader = new FileReader();
//   reader.onload = () => {
//     if (reader.readyState === 2) setProfileimg(reader.result);
//   };
//   reader.readAsDataURL(e.target.files[0]);
// };

// {/* <div className="row my-3">
//         <div className="col-sm-3 text-center m-auto">
//           <img
//             src={Profileimg}
//             className="rounded img-fluid"
//             alt="defaultDp"
//             width="200px"
//             height="200px"
//           />
//         </div>
//         <div className="col-sm-9  mt-auto">
//           <FormGroup>
//             <Label for="exampleFile"> Add a Profile Pic</Label>
//             <Input
//               type="file"
//               name="profilepic"
//               accept="image/*"
//               onChange={handleChange}
//             />
//           </FormGroup>
//         </div>
//       </div>
//       <hr /> */}
