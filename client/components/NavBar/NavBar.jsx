import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import urls from "../../../utils/urls";
import "./NavBar.scss";

const NavBar = () => (
  <Navbar
    style={{ position: "fixed", bottom: 0, width: "100%" }}
    color="light"
    light
    expand="md"
  >
    <Nav
      className="mr-auto d-flex"
      navbar
      style={{
        dislay: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "19px",
        }}
      >
        <NavLink href={urls.pages.app.home}>
          <Button className="navBarButton" />
        </NavLink>
        <header className="navBarButtonHeader">Home</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "16px",
        }}
      >
        <NavLink href={urls.pages.app.groupList}>
          <Button className="navBarButton" />
        </NavLink>
        <header className="navBarButtonHeader">Group</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink href={urls.pages.app.askMe}>
          <Button className="navBarButton" />
        </NavLink>
        <header className="navBarButtonHeader">Ask Me</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "-1px",
          marginRight: "-16px",
        }}
      >
        <NavLink href={urls.pages.app.notifications}>
          <Button className="navBarButton" />
        </NavLink>
        <header className="navBarButtonHeader">Notifications</header>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
