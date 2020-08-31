import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import { Button, Menu, IconButton, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import logo from "./../images/logo.jpg";
import { DataCentral } from "./../context-component/Context";
import firebase from "./../firebase-component/firebase";

const Header = () => {
  const [nav, setNav] = useState(true);
  const { user, setUser } = useContext(DataCentral);
  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    const width = window.innerWidth;
    if (width > 996) {
      if (scrollHeight > 200) {
        setNav(false);
      } else {
        setNav(true);
      }
    }
  });
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [auth, setAuth] = React.useState(true);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Navbar
      sticky="top"
      expand="md"
      className={nav ? styles.myHeader : styles.myHeaderActive}
    >
      <Link to="/" className="navbar-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 32.909 32.909"
        >
          <path d="M30.362 29.232v-.688h-.136l-.193.585h-.004l-.194-.585H29.7v.688h.09v-.405-.171l.194.576h.094l.193-.576V29.232h.091zM29.057 28.625h.234v.607h.095v-.607h.229v-.081h-.558z" />
          <path
            fill={"#3ED2E8"}
            d="M16.457 0c9.059 0 16.452 7.394 16.452 16.452 0 9.063-7.394 16.457-16.452 16.457C7.394 32.909 0 25.516 0 16.452 0 7.394 7.394 0 16.457 0z"
          />
          <path
            d="M16.457.424c8.824 0 16.024 7.204 16.024 16.028 0 8.829-7.2 16.029-16.024 16.029-8.829 0-16.033-7.2-16.033-16.029C.424 7.628 7.628.424 16.457.424z"
            fill="#fff"
          />
          <path
            fill="white"
            d="M16.457 1.697c8.122 0 14.751 6.633 14.751 14.755 0 8.127-6.629 14.756-14.751 14.756-8.127 0-14.756-6.629-14.756-14.756 0-8.122 6.629-14.755 14.756-14.755z"
          />
          <path
            d="M22.275 27.414l-7.587-9.045v4.883a2.95 2.95 0 0 1-2.938 2.938 2.949 2.949 0 0 1-2.943-2.938V10.121c0-1.616 1.328-2.943 2.943-2.943s2.938 1.323 2.938 2.943v2.259l3.874-4.311c1.08-1.202 2.938-1.337 4.149-.271 1.215 1.066 1.372 2.97.27 4.149l-3.217 3.446 6.844 8.186a12.326 12.326 0 0 0 2.263-7.128c0-6.835-5.58-12.415-12.415-12.415-6.84 0-12.42 5.58-12.42 12.415 0 6.84 5.58 12.42 12.42 12.42a12.312 12.312 0 0 0 5.819-1.457z"
            fill="#3ED2E8"
          />
        </svg>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/expressTransaction" className="nav-link">
            <Button  color="primary" className={styles.btn}>
              Express Transaction
            </Button>
          </Link>
          {user ? null : (
            <Link to="/login" className="nav-link">
              <Button
              
                color="primary"
                className={styles.btn}
              >
                Sign In
              </Button>
            </Link>
          )}
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={styles.iconBtn}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                className={styles.menuList}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={styles.menuItem} onClick={handleClose}>
                  {" "}
                  <Link to="/user-profile">Profile</Link>{" "}
                </MenuItem>

                <MenuItem className={styles.menuItem} onClick={handleClose}>
                  {" "}
                  <Link to="/kycform">Kyc Form</Link>{" "}
                </MenuItem>
                <MenuItem
                  className={styles.menuItem}
                  onClick={() => {
                    handleClose();
                    handleLogOut();
                  }}
                >
                  {" "}
                  <Link>Log out</Link>{" "}
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/createAccount" className="nav-link">
              <Button
                variant="contained"
                color="primary"
                className={styles.createAcctBtn}
              >
                Create Account
              </Button>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
