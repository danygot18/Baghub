import React, { Fragment, useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const updateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    let navigate = useNavigate();

    const getProfile = async () => {
        setLoading(true);
        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/profile`, config)
            console.log(data)
            // setUser(data.user)
            setName(data.user.name);
            setEmail(data.user.email);
            setAvatarPreview(data.user.avatar.url)
            setLoading(false)
        } catch (error) {
            toast.error('user not found', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const updateProfile = async (userData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/profile/update`, userData, config)
            setIsUpdated(data.success)
            setLoading(false)
            toast.success('user updated', {
                position: toast.POSITION.TOP_LEFT
            });
            //  getProfile();
            navigate('/profile', { replace: true })


        } catch (error) {
            console.log(error)
            toast.error('user not found', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    // console.log(error)
    useEffect(() => {
        getProfile()

    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        updateProfile(formData)
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }
    console.log(user)
    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row wrapper" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <div className="col-10 col-lg-5">
                    <h3 className="mt-2 mb-3" style={{ fontWeight: "light" }}>Update Profile</h3>
                    <form className="shadow-lg p-3 pt-5" onSubmit={submitHandler} style={{ borderRadius: '20px' }}>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='Avatar Preview'
                                    style={{ width: '150px', height: '150px' }}
                                />
                            </figure>
                        </div>
                        <div className="form-group mb-3 px-4">
                            <label htmlFor="name_field" className='w-100' style={{ textAlign: "left" }}>Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3 px-4">
                            <label htmlFor="email_field" className='w-100' style={{ textAlign: "left" }}>Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group px-4">
                            <label htmlFor="avatar_upload" className='w-100' style={{ textAlign: "left" }}>Avatar</label>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input form-control'
                                    id='customFile'
                                    accept='image/*'
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <button type="submit" bor className="btn update-btn btn-outline-success mt-4 mb-3" disabled={loading ? true : false} >
                            Update Profile
                        </button>

                        {loading && <div className="text-center mt-3">Updating...</div>}

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        {isUpdated && <div className="alert alert-success mt-3">Profile updated successfully!</div>}

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default updateProfile