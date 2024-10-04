import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="text-center">
            <Container>
                <Navbar.Brand href="#home" className="mr-auto">
                    <Button variant="primary">Home</Button>
                </Navbar.Brand>
                <Navbar.Brand className="mx-auto">
                    <h1>Biblical Characters Adventure</h1>
                </Navbar.Brand>
            </Container>
            <Nav className="d-flex justify-content-center flex-wrap mt-3">
              <div>
                <Button variant="outline-secondary" className="m-1">Short Stories</Button>
                <Button variant="outline-secondary" className="m-1">Games</Button>
                <Button variant="outline-secondary" className="m-1">Sing Along</Button>
                <Button variant="outline-secondary" className="m-1">Printable Crafts</Button>
                <Button variant="outline-secondary" className="m-1">Prayer Board</Button>
                <Button variant="outline-secondary" className="m-1">Character Bios</Button>
                <Button variant="outline-secondary" className="m-1">Character Dress Up</Button>
                <Button variant="outline-secondary" className="m-1">Adventure Map</Button>
                <Button variant="outline-secondary" className="m-1">Create Your Own Story</Button>
                </div>
            </Nav>
        </Navbar>
    );
};

export default Header;
