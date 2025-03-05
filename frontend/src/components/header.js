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

        <h1 className={styles.navbarTitle}>A Bible Adventure</h1>

        <Navbar.Toggle aria-controls="navbar-nav" className={styles.navbarToggler} />

        <Navbar.Collapse id="navbar-nav">
          <Nav className={`ml-auto d-flex justify-content-center flex-wrap ${styles.navLinks}`}>
            <Link to="/stories">
              <Button className={styles.navButton}>Short Stories</Button>
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
              <Button className={styles.navButton}>Prayer Board</Button>
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
            <Link to="/carve-path">
              <Button className={styles.navButton}>Eli's Journey</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
