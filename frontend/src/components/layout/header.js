import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import {Form, FormControl, Button } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">BagHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item href="#products">All Products</NavDropdown.Item>
              <NavDropdown.Item href="#brands">All Brands</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#separated-link">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-2"/>
            <Button variant="outline-dark">Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="#cart" aria-label="Shopping Cart">
              <i className="bi bi-cart"></i> Cart <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </Nav.Link>
          </Nav>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
