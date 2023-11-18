import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from '@mui/material';
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';

import axios from 'axios';
import { getToken, successMsg, errMsg } from '../../utils/helpers';
import Toast from '../layout/Toast';

const CategoryList = () => {         
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [isDeleted, setIsDeleted] = useState('')
    let navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${getToken()}`
        }
    }
    const listCategory = async () => {

        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/categories`, config)
            setAllCategory(data.categories)
            console.log(data)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
            
        }
    }
    const deleteCategory = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/category/${id}`, config)
            setIsDeleted(data.success)
            setLoading(false)
            
        } catch (error) {
           setError(error.response.data.message)
            
        }
    }

    useEffect(() => {
        listCategory();
        if (error) {
            errMsg(error);
            setError('')
        }
        if (isDeleted) {
            successMsg('Category deleted successfully');
            navigate('/admin/category');

        }

    }, [error, isDeleted,])


    const deleteUserHandler = (id) => {
       deleteCategory(id)
    }
    const setCategory = () => {
        const data = {
            columns: [
                {
                   label: 'Category ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        allCategory.forEach(category => {
            data.rows.push({
                id: category._id,
                name: category.name,
                actions: <Fragment>
                    <Link to={`/admin/category/${category._id}`} className="btn btn-primary py-1 px-2 mr-5">
                        <EditNoteTwoToneIcon />
                    </Link>
                    <DeleteIcon fontSize='large' className="btn btn-danger py-1 px-2 ml-2 mr-5" onClick={() => deleteUserHandler(category._id)}>

                    </DeleteIcon >
                </Fragment>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={'All category'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Category</h1>
                        {loading ? <Loader /> : (
                            <Table
                            component={MDBDataTable }
                                data={setCategory()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default CategoryList