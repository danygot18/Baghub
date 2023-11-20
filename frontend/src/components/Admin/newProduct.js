import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')
  const [product, setProduct] = useState({})

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', categories);
    formData.set('stock', stock);
    formData.set('seller', seller);

    images.forEach(image => {
      formData.append('images', image)
    })

    newProduct(formData)
  }
  const onChange = e => {
    const files = Array.from(e.target.files)
    setImagesPreview([]);
    setImages([])
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, reader.result])
        }
      }

      reader.readAsDataURL(file)
      // console.log(reader)
    })

  }
  const newProduct = async (formData) => {

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      }

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/product/new`, formData, config)
      setLoading(false)
      setSuccess(data.success)
      setProduct(data.product)
    } catch (error) {
      setError(error.response.data.message)

    }
  }
  useEffect(() => {
    console.log('Fetching categories...');
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/admin/categories`)
      .then((response) => {
        console.log('Categories data:', response.data);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

    if (success) {
      navigate('/admin/products');
      toast.success('Product created successfully', {
        position: toast.POSITION.BOTTOM_RIGHT
      })

    }

  }, [[error, success,]]);


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2>Create Product</h2>
          <form onSubmit={submitForm}>
            <div className="mb-3">
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
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
              <label htmlFor="cupSize" className="form-label">
                Cup Size
              </label>
              <select
                className="form-select"
                id="cupSize"
                name="cupSize"
                value={product.cupSize}
                onChange={handleChange}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>


            <div className="mb-3">
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

            <div className="mb-3">
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

            <div className="mb-3">
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
                onChange={onChange}
                multiple
              />
              {imagesPreview.map((img) => (
                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;