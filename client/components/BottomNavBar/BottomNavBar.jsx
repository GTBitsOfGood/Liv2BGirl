import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "./BottomNavBar.scss";

const BottomNavBar = () => (
  <Navbar className="bottom-navbar" light expand="md">
    <Nav navbar>
      <NavItem>
        <NavLink href="/app" exact>
          <Button className="navbar-button" />
        </NavLink>
        <p>Home</p>
      </NavItem>
      <NavItem>
        <NavLink href="/app/groups">
          <Button className="navbar-button" />
        </NavLink>
        <p>Group</p>
      </NavItem>
      <NavItem>
        <NavLink href="/app/ask-me">
          <Button className="navbar-button" />
        </NavLink>
        <p>Ask Me</p>
      </NavItem>
      <NavItem>
        <NavLink href="/app/notifications">
          <Button className="navbar-button" />
        </NavLink>
        <p>Notifications</p>
      </NavItem>
    </Nav>
  </Navbar>
);

export default BottomNavBar;
