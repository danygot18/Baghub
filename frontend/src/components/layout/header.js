
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

import { Form, FormControl, Button } from 'react-bootstrap';
import LoginModal from '../user/login';
import SignUpModal from '../user/signup';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../../utils/helpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyNavbar = ({ cartItems, setIsLoginOpen, isLoginOpen }) => {
  const [user, setUser] = useState('')
  const navigate = useNavigate()
  const logoutUser = async () => {

    try {
      await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`)

      setUser('')

      logout(() => navigate('/'))
    } catch (error) {
      toast.error(error.response.data.message)

    }
  }
  const logoutHandler = () => {
    logoutUser();
    toast.success('log out', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  useEffect(() => {
    setUser(getUser())
  }, [])

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
        <Navbar.Brand href="/" className="custom-font"><strong>BagHub</strong></Navbar.Brand>
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
            <Nav.Link href="/cart" aria-label="Shopping Cart" className="custom-font">
              <i className="bi bi-cart"></i> Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItems && cartItems.length}</span>
            </Nav.Link>
            {/* <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <i className="bi bi-cart"></i> Cart{' '}
                        <b>{cartItems && cartItems.length}</b>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link> */}
          </Nav>


          {user ? (
            <Nav className="ml-4 dropdown d-inline">
              {/* <Link to="#!" className="btn dropdown-toggle text-white mr-4" style={{ height: "80px" }} type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
              <NavDropdown title={user && user.name} className="btn dropdown-toggle text-white mr-4" style={{ height: "55px" }} type="button" id="dropDownMenuButton">
                {/* <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                    width={65}
                    height={65}
                  />
                </figure> */}
                {/* <span>{user && user.name}</span> */}
                {/* <LinkContainer to="/profile" className='bg-white'> */}
                {/* <NavDropdown.Item className="dropdown-item"> */}
                <Link to="/profile" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Profile</Link>
                <Link to="/dashboard" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Dashboard</Link>
                <Link to="/orders" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>orders</Link>
                {/* </NavDropdown.Item> */}
                {/* </LinkContainer> */}
                <NavDropdown.Item className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              {/* </Link> */}

              {/* <NavDropdown className="btn dropdown-toggle text-white mr-4" aria-labelledby="dropDownMenuButton"> */}
              {/* {user && user.role === 'admin' && (
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                            )} */}
              {/* <Link className="dropdown-item" to="/orders/me">Orders</Link> */}
              {/* <Link className="dropdown-item" to="/me">Profile</Link> */}
              {/* <NavDropdown.Item Link className="custom-font" to="">All Products</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="#brands" className="custom-font">All Brands</NavDropdown.Item> */}
              {/* <NavDropdown.Item  className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown> */}


            </Nav>) : <div>
            <Button variant="outline-white" onClick={() => setIsLoginOpen(true)} className="custom-font">
              Login
            </Button>
            <Button variant="outline-white" onClick={handleSignUpModalOpen} className="custom-font">
              Sign Up
            </Button></div>}
          <SignUpModal show={showSignUpModal} handleClose={handleSignUpModalClose} />
        </Navbar.Collapse>
      </Container>

    </Navbar>


  );
}

export default MyNavbar;