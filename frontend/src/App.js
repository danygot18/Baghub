import React, { useState } from 'react'
import MyNavbar from './components/layout/header'
import MyCarousel from './components/layout/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductCard from './components/product/productcard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/user/login';
import Signup from './components/user/signup';
import Profile from './components/user/profile';
import Forgot from './components/user/forgot';
import ResetPassword from './components/user/resetPassword';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/updatePassword';

// Admin
import Dashboard from './components/Admin/Dashboard';
import UsersList from './components/Admin/usersList';
import UpdateUser from './components/Admin/updateUsers';
import NewCategory from './components/Admin/newCategory';
import CategoryList from './components/Admin/categoryList';
import UpdateCategory from './components/Admin/updateCategory';

import NewProduct from './components/Admin/newProduct';
import ProductList from './components/Admin/productList';
import UpdateProduct from './components/Admin/updateProduct';
import Home from './components/Home';

import ProductDetails from './components/product/productDetails';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import OrdersList from './components/Admin/orderList';
import ProcessOrder from './components/Admin/updateOrder';

//Orders
import Cart from './components/cart/cart';
import Shipping from './components/cart/shipping';
import ConfirmOrder from './components/cart/confirmOrder';

import LoginModal from './components/user/login';
import SignUpModal from './components/user/signup';
import Payment from './components/cart/payment';
import OrderSuccess from './components/cart/orderSuccess';

import ListOrders from './components/order/listOrder';
import OrderDetails from './components/order/orderDetails';

function App() {
  const [state, setState] = useState({
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
      
  })
  console.log(localStorage.getItem('cartItems'));
  const addItemToCart = async (id, quantity) => {
    console.log(id, quantity)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/${id}`)
      const item = {
        product: data.products._id,
        name: data.products.name,
        price: data.products.price,
        image: data.products.images[0].url,
        stock: data.products.stock,
        quantity: quantity
      }

      const isItemExist = state.cartItems.find(i => i.product === item.product)
      console.log(isItemExist, state)
      // setState({
      //   ...state,
      //   cartItems: [...state.cartItems, item]
      // })
      if (isItemExist) {
        setState({
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
        })
      }
      else {
        setState({
          ...state,
          cartItems: [...state.cartItems, item]
        })
      }

      toast.success('Item Added to Cart', {
        position: toast.POSITION.BOTTOM_RIGHT
      })

    } catch (error) {
      console.log(error)
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT
      });
      // navigate('/')
    }

  }

  const removeItemFromCart = async (id) => {
    setState({
      ...state,
      cartItems: state.cartItems.filter(i => i.product !== id)
    })
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
  }

  const saveShippingInfo = async (data) => {
    setState({
      ...state,
      shippingInfo: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
  }

  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="App">
      <Router>
        <MyNavbar cartItems={state.cartItems} setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />

        <Routes>
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/signup" element={<Signup />} exact="true" />
          <Route path="/profile" element={<Profile />} exact="true" />
          <Route path="/password/forgot" element={<Forgot />} exact="true" />
          <Route path="/profile/update" element={<UpdateProfile />} exact="true" />
          <Route path="/password/reset/:token" element={<ResetPassword />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} exact="true" />


          {/* Admin */}
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/dashboard" element={<Dashboard />} exact="true" />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/category/new" element={<NewCategory />} />
          <Route path="/admin/category" element={<CategoryList />} />
          <Route path="/admin/category/:id" element={<UpdateCategory />} />

          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product" element={<ProductList />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />

          <Route path="/product/:id" element={<ProductDetails cartItems={state.cartItems} addItemToCart={addItemToCart} />} />
          

          <Route path="/cart" element={
            <Cart cartItems={state.cartItems}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
              setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen}
            />
          } exact="true" />
          <Route path="/shipping" element={<Shipping
            shipping={state.shippingInfo}
            saveShippingInfo={saveShippingInfo}
          />}
          />
          <Route path="/confirm" element={<ConfirmOrder cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/payment" element={<Payment cartItems={state.cartItems} shippingInfo={state.shippingInfo} />} />
          <Route path="/success" element={<OrderSuccess />} />
          
          <Route path="/orders" element={<ListOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<>
            <MyCarousel />
            <Home /></>} exact="true" />
        </Routes>
        <LoginModal show={isLoginOpen} handleClose={() => {
          setIsLoginOpen(false)
        }} />
      </Router>
    </div>

  );
}

export default App;