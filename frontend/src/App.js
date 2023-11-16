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
          <Route path="/" element={<>
            <MyCarousel />
            <ProductCard /></>} exact="true" />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
