import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form, FormControl, Button } from 'react-bootstrap';
import LoginModal from '../user/login';
import SignUpModal from '../user/signup';
import React, { useState } from 'react';


function MyNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const [showSignUpModal, setshowSignUpModal] = useState(false);

  const handleSignUpModalOpen = () => {
    setshowSignUpModal(true);
  };

  const handleSignUpModalClose = () => {
    setshowSignUpModal(false);
  };
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home" className="custom-font"><strong>BagHub</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard" className="custom-font">Dashboard</Nav.Link>
            <Nav.Link href="#about" className="custom-font">About</Nav.Link>
            <NavDropdown className="custom-font" title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item href="#products" className="custom-font">All Products</NavDropdown.Item>
              <NavDropdown.Item href="#brands" className="custom-font">All Brands</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#separated-link" className="custom-font">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex me-3">
            <FormControl type="text" placeholder="Search" className="mr-2 custom-font" />
            <Button className="custom-font" variant="outline-dark">Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="#cart" aria-label="Shopping Cart" className="custom-font">
              <i className="bi bi-cart"></i> Cart{' '}
              <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </Nav.Link>
          </Nav>
          <div>
            <Button variant="outline-white" onClick={handleLoginModalOpen} className="custom-font">
              Login
            </Button>
            <Button variant="outline-white" onClick={handleSignUpModalOpen} className="custom-font">
              Sign Up
            </Button>
            <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
            <SignUpModal show={showSignUpModal} handleClose={handleSignUpModalClose} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;