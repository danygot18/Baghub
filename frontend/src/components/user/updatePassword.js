import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getToken } from '../../utils/helpers';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingClick, setLoadingClick] = useState(false);

    let navigate = useNavigate();
    const updatePassword = async (formData) => {
        setLoadingClick(true);
        console.log(formData)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/update`, formData, config)
            setIsUpdated(data.success)
            setLoadingClick(false);
            setLoading(false)
            toast.success('password updated', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/profile')
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }, [error,])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        updatePassword(formData)
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />
            <div className="row wrapper" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <div className="col-10 col-lg-5" >
                    <form className="shadow-lg p-3 pt-5" onSubmit={submitHandler} style={{ borderRadius: '20px' }}>
                        <h4 className="mb-3">Update Password</h4>
                        <div className="form-group mb-3 px-4">
                            <label htmlFor="old_password_field" className='w-100' style={{ textAlign: "left" }} >Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group px-4">
                            <label htmlFor="new_password_field" className='w-100' style={{ textAlign: "left" }}>New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" bor className="btn update-btn btn-outline-success mt-4 mb-3" disabled={loadingClick} >
                            {loadingClick ?
                                "Updating......" :
                                "Update Profile"
                            }</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdatePassword