import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import style from "./NavBar.module.css";

const NavBar = () => (
  <Navbar color="light" light expand="md">
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
          marginRight: "16px"
        }}
      >
        <NavLink href="http://localhost:3000">
          <Button className={style.navBarButton} />
{" "}
        </NavLink>
        <header className={style.navBarButtonHeader}>Home</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "13px"
        }}
      >
        <NavLink href="http://localhost:3000">
          <Button className={style.navBarButton} />
{" "}
        </NavLink>
        <header className={style.navBarButtonHeader}>Group</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <NavLink href="http://localhost:3000">
          <Button className={style.navBarButton} />
{" "}
        </NavLink>
        <header className={style.navBarButtonHeader}>Ask Me</header>
      </NavItem>
      <NavItem
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "-6px"
        }}
      >
        <NavLink href="http://localhost:3000">
          <Button className={style.navBarButton} />
{" "}
        </NavLink>
        <header className={style.navBarButtonHeader}>Notifications</header>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
