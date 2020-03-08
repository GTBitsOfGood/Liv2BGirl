import React from "react";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import style from "./NavBar.module.scss";
import urls from "../../../utils/urls";

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
          <Button className={style.navBarButton} />
        </NavLink>
        <header className={style.navBarButtonHeader}>Home</header>
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
          <Button className={style.navBarButton} />
        </NavLink>
        <header className={style.navBarButtonHeader}>Group</header>
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
          <Button className={style.navBarButton} />
        </NavLink>
        <header className={style.navBarButtonHeader}>Ask Me</header>
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
          <Button className={style.navBarButton} />
        </NavLink>
        <header className={style.navBarButtonHeader}>Notifications</header>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
