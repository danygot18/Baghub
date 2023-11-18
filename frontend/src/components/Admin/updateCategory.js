import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errMsg, successMsg } from '../../utils/helpers';
import { getToken } from '../../utils/helpers';
import axios from 'axios';

const updateCategory = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(true);   
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const { id } = useParams();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
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
    const getCategoryDetails = async (id) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/categories/${id}`, config)
            setCategory(data.categories)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const updateCategory = async (id, categoryData) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/admin/update/${id}`, categoryData, config)
            setIsUpdated(data.success)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        // console.log(user && user._id !== userId);
        if (category && category._id !== id) {
            getCategoryDetails(id)
        } else {
            setName(category.name);
            setAvatar(category.avatar)
        }
        if (error) {
            errMsg(error);
            setError('');
        }
        if (isUpdated) {
            successMsg('Category updated successfully')
            navigate('/admin/category')

        }
    }, [error, isUpdated, id, category])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        avatar.forEach(image => {
            formData.append('images', image)
        })

        updateCategory(category._id, formData)
    }

    return (
        <Fragment>
            <MetaData title={`Category User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Category</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default updateCategory