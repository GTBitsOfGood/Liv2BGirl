import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./TopNavBar.scss";
import logo from "../../../public/img/logo.png";
const TopNavBar = () => (
  <Navbar className="top-navbar" color="light" light expand="md">
    <Nav navbar>
      <NavItem>
        <NavLink href="/profile">
          <img
            className="navbar-avatar"
            src="https://picsum.photos/200/200"
            alt="Avatar"
          />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/home">
          <img
            className="navbar-logo"
            src={logo}
          />
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default TopNavBar;
