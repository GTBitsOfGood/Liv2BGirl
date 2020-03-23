import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../../../public/img/logo.png";

// Styling
import "./TopNavBar.scss";

const TopNavBar = () => (
  <Navbar className="top-navbar" light expand="md">
    <Nav navbar>
      <NavItem>
        <NavLink href="/app/profile">
          <img
            className="navbar-avatar"
            src="https://picsum.photos/200/200"
            alt="Avatar"
          />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/app/">
          <img className="navbar-logo" src={logo} alt="Liv2BGirl Logo" />
        </NavLink>
      </NavItem>
      <div />
    </Nav>
  </Navbar>
);

export default TopNavBar;
