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



function App() {

  return (
    <div className="App">
      <Router>
        <MyNavbar />

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

          <Route path="/product/:id" element={<ProductDetails />}/>

          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<>
            <MyCarousel />
            <Home  /></>} exact="true" />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
