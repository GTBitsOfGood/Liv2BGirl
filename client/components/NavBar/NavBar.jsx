import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./NavBar.scss";

const NavBar = () => (
  <Navbar color="light" light expand="md">
    <Nav navbar>
      <NavItem>
        <NavLink href="/" exact>
          <Button className="navbar-button" />
        </NavLink>
        <p>Home</p>
      </NavItem>
      <NavItem>
        <NavLink href="/groups">
          <Button className="navbar-button" />
        </NavLink>
        <p>Group</p>
      </NavItem>
      <NavItem>
        <NavLink href="/ask-me">
          <Button className="navbar-button" />
        </NavLink>
        <p>Ask Me</p>
      </NavItem>
      <NavItem>
        <NavLink href="/notifications">
          <Button className="navbar-button" />
        </NavLink>
        <p>Notifications</p>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
