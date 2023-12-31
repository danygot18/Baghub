import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { getToken } from '../../utils/helpers';

const NewProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    images: null,
  });
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = Array.from(e.target.files);
      const imagePreviews = [];
      const selectedImages = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imagePreviews.push(reader.result);
            selectedImages.push(file);
          }
        };

        reader.readAsDataURL(file);
      });

      setImagesPreview(imagePreviews);
      setImages(selectedImages);
    } else if (name === 'price') {
      setProduct({
        ...product,
        [name]: parseFloat(value),
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };
  const configs = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${getToken()}`
    }
  }
  

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('seller', product.seller);
    formData.append('stock', product.stock);
    formData.append('category', product.category);

    images.forEach((image) => {
      formData.append('images', image);
    });
    // console.log(e.target.images.value);
    console.log(images);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${getToken()}`
        }
      };

      await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/product/new`, formData, config);

      toast.success('Product Created successfully', {
        position: toast.POSITION.TOP_RIGHT_RIGHT
      })
      setProduct({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        images: null,
      });
      setImages([]);
      setImagesPreview([]);
      navigate('/admin/product');
    } catch (error) {
      toast.success('ERROR: PRODUCT NOT CREATED', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      console.error(error);
    }
  };
  useEffect(() => {
    console.log('Fetching categories...');
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/admin/categories`, configs)
      .then((response) => {
        console.log('Categories data:', response.data);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
  }, []);

  return (
    <Fragment>
      <MetaData title={'Create Product'} />
  
      <div className="custom-container mt-5" style={{ maxWidth: '1000px', margin: '800px auto 0' }}>
    <div className="row">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <h2>Create Product</h2>
          </div>
          <div className="card-body">
            <form onSubmit={submitForm} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    required
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label htmlFor="seller" className="form-label">
                    Seller
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="seller"
                    name="seller"
                    required
                    value={product.seller}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    required
                    value={product.stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    required
                    value={product.category}
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    name="images"
                    required
                    onChange={handleChange}
                    multiple
                  />
                  {imagesPreview.map((img) => (
                    <img src={img} key={img} alt="Images Preview" className="mt-3" width="55" height="52" />
                  ))}
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-primary">
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
  

};

export default NewProduct;