import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errMsg, successMsg } from '../../utils/helpers';
import { getToken } from '../../utils/helpers';
import axios from 'axios';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [seller, setSeller] = useState('');
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(true);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState([]);
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
        const files = Array.from(e.target.files)
        // setImagesPreview([]);
        // setImages([])
        // setOldImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const getProductDetails = async (id) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/${id}`, config)
            console.log(data)
            setProduct(data.products)
            setName(data.products.name)
            setPrice(data.products.price)
            setDescription(data.products.description)
            setCategory(data.products.categories)
            setStock(data.products.stock)
            setSeller(data.products.seller)
            setOldImages(data.products.images);
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const updateProduct = async (id, productData) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/product/update/${id}`, productData, config)
            setIsUpdated(data.success)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        // console.log(user && user._id !== userId);
        axios
            .get(`${process.env.REACT_APP_API}/api/v1/admin/categories`)
            .then((response) => {
                console.log('Categories data:', response.data);
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
        if (product && product._id !== id) {
            getProductDetails(id)
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock);
            setOldImages(product.images)

        }
        if (error) {
            errMsg(error);
            setError('');
        }
        if (isUpdated) {
            successMsg('Product updated successfully')
            navigate('/admin/product')

        }
    }, [error, isUpdated, id ])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        if (e.target.images.value) {
            images.forEach(image => {
                formData.append('images', image)
            })
        }
        updateProduct(product._id, formData)
    }
    console.log(images)
    console.log(categories)
    return (
        <Fragment>
            <MetaData title={`Product User`} />
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
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" onChange={(e) => setCategory(e.target.value)}>
                                        {categories && categories.map(category => (
                                            <option key={category.name} value={category._id} selected = {category.name === category} >{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className="form-group px-4">
                                    <label htmlFor="avatar_upload" className='w-100' style={{ textAlign: "left" }}>Avatar</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input form-control'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={onChange}
                                            multiple
                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
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

export default UpdateProduct