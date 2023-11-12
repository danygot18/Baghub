import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaImage } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpModal({ show, handleClose }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingClick, setLoadingClick] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      console.log(error);
      setError('');
    }
  }, [error, isAuthenticated, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('avatar', avatar);

    register(formData);
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const register = async (userData) => {
    setLoadingClick(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, userData, config);
      console.log(data.user);
      setLoadingClick(false);
      handleClose();
      setIsAuthenticated(true);
      setLoading(false);
      setUser(data.user);
      toast.success('Profile Created', {
        position: toast.POSITION.TOP_RIGHT
      });
      navigate('/');
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Modal className='custom-font mt-4' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>
              <FaEnvelope /> Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={user.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <FaEnvelope /> Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              <FaLock /> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicImage">
            <Form.Label>
              <FaImage /> Images
            </Form.Label>
            <div className='d-flex align-items-center'>
              <div>
                <figure className='avatar mr-3 item-rtl'>
                  <img
                    src={avatarPreview}
                    className='rounded-circle mx-auto d-block'
                    alt='Avatar Preview'
                    style={{ width: '80px', height: '80px' }}
                  />
                </figure>
              </div>
            </div>
            <input
              type='file'
              name='avatar'
              className='custom-file-input'
              id='customFile'
              accept="images/*"
              onChange={onChange}
            />

          </Form.Group>
          <Button className='mt-4 btn-outline-white' variant="dark" disabled={loadingClick} onClick={handleSignUp}>
            {loadingClick ?
              "Creating......" :
              "Sign up"
            }
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
