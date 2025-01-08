import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../styles/header.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar expand="lg" className="text-center" style={{ background: 'linear-gradient(135deg, black, #FF5733)' }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <Button variant="warning">Home</Button>
                    </Link>
                </Navbar.Brand>
                <h1 style={{ color: '#ffd700', fontSize: '4rem', fontFamily: 'Bubblegum Sans, sans-serif', border: '4px inset yellow', borderRadius: '10px', boxShadow: '0 4px 8px rgba(250, 250, 25, 0.9)',padding: '15px', marginBottom: "30px" }}>Biblical Adventure</h1>
                <Navbar.Toggle aria-controls="navbar-nav" style={{ color: 'white' }} />
                <Navbar.Collapse id="navbar-nav">
                    <Navbar.Brand className="mx-auto">
                    </Navbar.Brand>
                    <Nav className="ml-auto d-flexjustify-content-center flex-wrap">
                        <Link to="/stories">
                            <Button variant="outline-secondary" className="m-1 text-warning">Short Stories</Button>
                        </Link>
                        <Link to="/games">
                            <Button variant="outline-secondary" className="m-1 text-warning">Games</Button>
                        </Link>
                        <Link to="/sing-along">
                            <Button variant="outline-secondary" className="m-1 text-warning">Sing Along</Button>
                        </Link>
                        <Link to="/crafts">
                            <Button variant="outline-secondary" className="m-1 text-warning">Printable Crafts</Button>
                        </Link>
                        <Link to="/prayer-board">
                            <Button variant="outline-secondary" className="m-1 text-warning">Prayer Board</Button>
                        </Link>
                        <Link to="/bio">
                            <Button variant="outline-secondary" className="m-1 text-warning">Character Bios</Button>
                        </Link>
                        <Link to="/dress-up">
                            <Button variant="outline-secondary" className="m-1 text-warning">Character Dress Up</Button>
                        </Link>
                        <Link to="/adventure-map">
                            <Button variant="outline-secondary" className="m-1 text-warning">Adventure Map</Button>
                        </Link>
                        <Link to="/create-story">
                            <Button variant="outline-secondary" className="m-1 text-warning">Create Your Own Story</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
