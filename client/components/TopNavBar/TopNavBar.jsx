import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../../../public/img/logo.png";
import classes from "./TopNavBar.module.scss";

const TopNavBar = () => (
  <Navbar className={classes.topNavbar} light expand="md">
    <Nav navbar>
      <NavItem>
        <NavLink href="/app/profile">
          <img
            className={classes.navbarAvatar}
            src="https://picsum.photos/200/200"
            alt="Avatar"
          />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/app/">
          <img className={classes.navbarLogo} src={logo} alt="Liv2BGirl Logo" />
        </NavLink>
      </NavItem>
      <div />
    </Nav>
  </Navbar>
);

export default TopNavBar;
