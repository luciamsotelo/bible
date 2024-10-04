import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
    return (
        <footer className=" fixed-bottom bg-light text-center text-lg-start mt-auto">
            <Container className="p-4">
                <h5 className="text-uppercase">About Us</h5>
                <p>
                    We provide engaging activities and stories that bring biblical characters to life. Join us on this adventure!
                </p>
            </Container>
            <div className="text-center p-1 bg-light">
                © {new Date().getFullYear()} Biblical Characters Adventure. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
