import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="info" expand="lg" className="text-center">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <Button variant="primary">Home</Button>
                    </Link>
                </Navbar.Brand>
                <h1>Biblical Adventure</h1>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Navbar.Brand className="mx-auto">
                    </Navbar.Brand>
                    <Nav className="ml-auto d-flex justify-content-center flex-wrap">
                        <Link to="/stories">
                            <Button variant="outline-secondary" className="m-1">Short Stories</Button>
                        </Link>
                        <Link to="/games">
                            <Button variant="outline-secondary" className="m-1">Games</Button>
                        </Link>
                        <Link to="/sing-along">
                            <Button variant="outline-secondary" className="m-1">Sing Along</Button>
                        </Link>
                        <Link to="/crafts">
                            <Button variant="outline-secondary" className="m-1">Printable Crafts</Button>
                        </Link>
                        <Link to="/prayer-board">
                            <Button variant="outline-secondary" className="m-1">Prayer Board</Button>
                        </Link>
                        <Link to="/bio">
                            <Button variant="outline-secondary" className="m-1">Character Bios</Button>
                        </Link>
                        <Link to="/dress-up">
                            <Button variant="outline-secondary" className="m-1">Character Dress Up</Button>
                        </Link>
                        <Link to="/adventure-map">
                            <Button variant="outline-secondary" className="m-1">Adventure Map</Button>
                        </Link>
                        <Link to="/create-story">
                            <Button variant="outline-secondary" className="m-1">Create Your Own Story</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
