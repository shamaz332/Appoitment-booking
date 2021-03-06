import {
  Button,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";
import React, { useState } from "react";
import { Toggle_Foucs, Toggle_modal } from "./../actions/ToggleActions";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../actions/AuthActions";

const AppNavbar = (props) => {
  const [collapsed, setCollapsed] = useState(true); // navbar collapse
  const toggleNavbar = () => setCollapsed(!collapsed); //navbar Toggler
  const closeNavbar = () => setCollapsed(true); // strictly closes the navbar.

  const registerBtn = (
    <NavLink onClick={closeNavbar} key="2" className="my-auto">
      <Button
        size="sm"
        onClick={() => {
          props.Toggle_Foucs(false);
          props.Toggle_modal();
        }}
      >
        Log In
      </Button>
    </NavLink>
  );

  const loginBtn = (
    <NavLink onClick={closeNavbar} key="1" className="my-auto">
      <Button
        size="sm"
        color="success"
        onClick={() => {
          props.Toggle_Foucs(true);
          props.Toggle_modal();
        }}
      >
        Sign Up
      </Button>
    </NavLink>
  );

  const logoutBtn = (
    <UncontrolledDropdown nav inNavbar key="69">
      <DropdownToggle nav caret>
        Hi, {props.auth.user ? props.auth.user.username : "Guest"}
      </DropdownToggle>
      <DropdownMenu right className="text-center">
        <DropdownItem>
          <Link
            className="text-link"
            to={`/api/users/${props.auth.user?.username}`}
          >
            Account
          </Link>
        </DropdownItem>
        {/* <DropdownItem>
          <Link
            to={{
              pathname: `/api/users/${props.auth.user?.username}`,
              state: {
                edit: true,
              },
            }}
            className="text-link"
          >
            Edit Profile
          </Link>
        </DropdownItem> */}
        <DropdownItem divider />
        <Button
          size="md"
          onClick={() => {
            props.logout();
            closeNavbar();
          }}
        >
          log out
        </Button>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
  return (
    <div className="navbar">
      <Navbar
        color="dark"
        dark
        expand="sm"
        className="mb-5 fixed-top shadow-bar"
      >
        <Container>
          <NavbarBrand
            className="mr-auto"
            onClick={closeNavbar}
            tag={Link}
            to="/"
          >
            <span className="text-success font-weight-bold"></span>Appoitment booking
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              {props.auth.isAuthenticated
                ? [logoutBtn]
                : [loginBtn, registerBtn]}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { Toggle_Foucs, Toggle_modal, logout })(
  AppNavbar
);
