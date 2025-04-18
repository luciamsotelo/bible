import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css"; // Updated for CSS Modules

const Header = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Button className={styles.homeButton}>Home</Button>
          </Link>
        </Navbar.Brand>

        <Link to="/" style={{ textDecoration: "none" }}>
  <h1 className={styles.navbarTitle}>A Bible Adventure</h1>
</Link>

        <Navbar.Toggle aria-controls="navbar-nav" className={styles.navbarToggler} />

        <Navbar.Collapse id="navbar-nav">
          <Nav className={`ml-auto d-flex justify-content-center flex-wrap ${styles.navLinks}`}>
            <Link to="/stories">
              <Button className={styles.navButton}>Bible Stories</Button>
            </Link>
            <Link to="/games">
              <Button className={styles.navButton}>Games</Button>
            </Link>
            <Link to="/sing-along">
              <Button className={styles.navButton}>Sing Along</Button>
            </Link>
            <Link to="/comingSoon">
              <Button className={styles.navButton}>Printable Crafts</Button>
            </Link>
            <Link to="/prayer-board">
              <Button className={styles.navButton}>Send up a Prayer</Button>
            </Link>
            <Link to="/bio">
              <Button className={styles.navButton}>Character Bios</Button>
            </Link>
            <Link to="/comingSoon">
              <Button className={styles.navButton}>Character Dress Up</Button>
            </Link>
            <Link to="/adventure-map">
              <Button className={styles.navButton}>Adventure Map</Button>
            </Link>
            <Link to="/prayer">
              <Button className={styles.navButton}>Daily Prayer</Button>
            </Link>
            <Link to="/lessons">
              <Button className={styles.navButton}>Storytime</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
