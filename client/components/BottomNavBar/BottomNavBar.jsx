import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import classes from "./BottomNavBar.module.scss";

const BottomNavBar = () => (
  <Navbar className={classes.bottomNavbar} light expand="md">
    <Nav navbar className={classes.navbarNav}>
      <NavItem className={classes.navItem}>
        <NavLink href="/app" exact>
          <Button className={classes.navbarButton} />
        </NavLink>
        <p>Home</p>
      </NavItem>
      <NavItem className={classes.navItem}>
        <NavLink href="/app/groups">
          <Button className={classes.navbarButton} />
        </NavLink>
        <p>Group</p>
      </NavItem>
      <NavItem className={classes.navItem}>
        <NavLink href="/app/ask-me">
          <Button className={classes.navbarButton} />
        </NavLink>
        <p>Ask Me</p>
      </NavItem>
      <NavItem className={classes.navItem}>
        <NavLink href="/app/notifications">
          <Button className={classes.navbarButton} />
        </NavLink>
        <p>Notifications</p>
      </NavItem>
    </Nav>
  </Navbar>
);

export default BottomNavBar;