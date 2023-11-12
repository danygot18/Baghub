import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getUser, } from '../../utils/helpers';;
import { getToken } from '../../utils/helpers';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    const getProfile = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/profile`, config);
            console.log(data)
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch user profile", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    <div className="container mt-5">
                        <h2 className="text-center mb-4">My Profile</h2>
                        <div className="shadow-lg w-75 mx-auto py-5 row justify-content-center align-items-center" style={{ borderRadius: "30px" }}>
                            <div className="col-lg-6 col-md-4 text-center">
                                <figure className='avatar avatar-profile'>
                                    <img className="rounded-circle img-fluid"
                                        src={user.avatar.url} alt={user.name}
                                        style={{ width: '250px', height: '250px' }}
                                    />
                                </figure>
                                <Link to="/profile/update" id="edit_profile" className="btn btn-primary btn-block mt-3 mb-4">
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="col-lg-6 col-md-8">
                                <div className="profile-info">
                                    <h4 className="text-uppercase mb-3">Full Name</h4>
                                    <p>{user.name}</p>

                                    <h4 className="text-uppercase mb-3">Email Address</h4>
                                    <p>{user.email}</p>

                                    <h4 className="text-uppercase mb-3">Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>
                                </div>
                                <div className='d-flex' style={{ gap: "10px", justifyContent: 'center', flexDirection: 'row', alignItems: "end" }}>
                                    {user.role !== 'admin' && (
                                        <Link to="/orders/me" className="btn btn-danger btn-block mt-4">
                                            My Orders
                                        </Link>
                                    )}

                                    <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
