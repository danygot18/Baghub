import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  
  const navigate = useNavigate();

  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/password/forgot`, formData, config);
      console.log(data.message);

      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    forgotPassword(formData);
  };

  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <div className="row align-items-center" style={{ height: '80vh' }}>
        <div className="col-10 col-lg-5 mx-auto">
          <form className="shadow-lg p-4" onSubmit={submitHandler}>
            <h1 className="mb-4 text-center">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn mt-2 btn-outline-primary"
              variant="dark" 
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Forgot;
