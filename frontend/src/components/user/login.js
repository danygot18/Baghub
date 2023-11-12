
import { Modal, Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa'; // Import the icons
import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Metadata from '../layout/MetaData'
// import Loader from '../Layout/Loader'

import axios from 'axios';
import { authenticate } from '../../utils/helpers'
import { getUser } from '../../utils/helpers';



function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config)
      console.log("ayaw")
      handleClose();
      authenticate(data, () => navigate("/"))
      toast.success('log in', {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch (error) {
      console.log("ayaw")
      toast.error("invalid email or password", {
        position: toast.POSITION.TOP_RIGHT, // or toast.POSITION.BOTTOM_LEFT
      });
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password)
  }


  // console.log('Logging in with email:', email, 'and password:', password);
  // handleClose(); // Close the modal after login


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="custom-modal-title custom-font">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal custom-font">
        <Form>
          <Form.Group controlId="formBasicemail">
            <Form.Label>
              <FaUser /> Email
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <FaLock /> Password {/* Lock icon */}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Form.Group>
          <Link to="/password/forgot" className="float-right mb-4" onClick={handleClose}>Forgot Password?</Link>
          </Form.Group>
          
          <Button variant="dark" className="mt-2 btn-outline-white" onClick={submitHandler}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
