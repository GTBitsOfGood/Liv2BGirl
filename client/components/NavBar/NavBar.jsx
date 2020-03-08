import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./NavBar.scss";

const NavBar = () => (
  <Navbar className="navbar" color="light" light expand="md">
    <Nav navbar className="nav">
      <NavItem className="nav-item">
        <NavLink href="/" exact>
          <Button className="navbar-button" />
        </NavLink>
        <p>Home</p>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink href="/groups">
          <Button className="navbar-button" />
        </NavLink>
        <p>Group</p>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink href="/ask-me">
          <Button className="navbar-button" />
        </NavLink>
        <p>Ask Me</p>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink href="/notifications">
          <Button className="navbar-button" />
        </NavLink>
        <p>Notifications</p>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
