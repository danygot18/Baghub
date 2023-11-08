import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa'; // Import the icons

function LoginModal({ show, handleClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here (e.g., API request for authentication)
    console.log('Logging in with username:', username, 'and password:', password);
    handleClose(); // Close the modal after login
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="custom-modal-title custom-font">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal custom-font">
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>
              <FaUser /> Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Button variant="dark" className="mt-2 btn-outline-white" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
