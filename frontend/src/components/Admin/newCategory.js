import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { getToken } from '../../utils/helpers';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategory = () => {

    const [name, setName] = useState('');   
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [category, setCategory] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState('')
    

    let navigate = useNavigate()
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        images.forEach(image => {
            formData.append('images', image)
        })
        
        newCategory(formData)
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
    const newCategory = async (formData) => {
       
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/category/new`, formData, config)
            setLoading(false)
            setSuccess(data.success)
            setCategory(data.category)
        } catch (error) {
            setError(error.response.data.message)

        }
    }
    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (success) {
            navigate('/admin/category');
            toast.success('Category created successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })

        }

    }, [error, success,])


    return (
        <Fragment>
        <MetaData title={'Create Category'} />
        <div className="custom-container mt-5" style={{ maxWidth: '1000px', margin: '100px auto 0' }}>
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header bg-primary text-white text-center">
                  <h2>Create Category</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={submitHandler} className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name_field" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
  
                    <div className='col-md-6'>
                      <label htmlFor="customFile" className='form-label'>Images</label>
  
                      <div className='custom-file'>
                        <input
                          type='file'
                          name='images'
                          className='custom-file-input'
                          id='customFile'
                          onChange={onChange}
                          multiple
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                          Choose Images
                        </label>
                      </div>
  
                      {imagesPreview.map(img => (
                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                      ))}
                    </div>
  
                    <div className="col-md-12 text-center">
                      <button
                        id="Create_button"
                        type="submit"
                        className="btn btn-primary"
                      >
                        CREATE
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
}
export default NewCategory