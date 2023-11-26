// Import necessary modules and components
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "react-bootstrap";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserSalesChart from "./userSalesChart";
import MonthlySalesChart from "./monthlyChart";
import ProductSalesChart from "./productSalesChart";
// ... (other imports)

const Dashboard = () => {
  // ... (existing code)
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState([]);
  let outOfStock = 0;
  // products.forEach(product => {
  //   if (product.stock === 0) {
  //     outOfStock += 1;
  //   }
  // })
  const getAdminProducts = async () => {
    try {
      const config = {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/products/show`,
        config
      );
      console.log(data.products);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const getAdminUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/users`,
        config
      );
      console.log(data);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getAdminCategory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/categories`,
        config
      );
      console.log(data);
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const getAdminOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/orders`,
        config
      );
      console.log(data);
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminProducts();
    // allOrders()
    // allUsers()
    getAdminUsers();
    getAdminCategory();
    getAdminOrders();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>

        <Col md={10}>
          <h1 className="my-4">Dashboard</h1>

          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />

              <Row className="pr-4">
                {/* Total Amount Card */}
                <Col xl={12} sm={12} mb={3}>
                  <Card className="bg-primary text-white o-hidden h-100">
                    <Card.Body>
                      {/* <div className="text-center card-font-size">
                        Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                      </div> */}
                    </Card.Body>
                  </Card>
                </Col>

                {/* Products Card */}
                <Col xl={3} sm={6} mb={3}>
                  <Card className="bg-success text-white o-hidden h-100">
                    <Card.Body>
                      <div className="text-center card-font-size">
                        Products
                        <br /> <b>{products && products.length}</b>
                      </div>
                    </Card.Body>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/product"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </Card>
                </Col>

                {/* Orders Card */}
                <Col xl={3} sm={6} mb={3}>
                  <Card className="bg-danger text-white o-hidden h-100">
                    {/* ... (existing code) */}
                    <CardBody>
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </CardBody>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </Card>
                </Col>

                {/* Users Card */}
                <Col xl={3} sm={6} mb={3}>
                  <Card className="bg-info text-white o-hidden h-100">
                    <Card.Body>
                      <div className="text-center card-font-size">
                        Category
                        <br /> <b>{categories && categories.length}</b>
                      </div>
                    </Card.Body>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/category"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </Card>
                </Col>

                {/* Out of Stock Card */}
                <Col xl={3} sm={6} mb={3}>
                  <Card className="bg-warning text-white o-hidden h-100">
                    <Card.Body>
                      <div className="text-center card-font-size">
                        Orders
                        <br /> <b>{orders && orders.length}</b>
                      </div>
                    </Card.Body>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                      <div>
                        <Fragment>
                          <UserSalesChart />
                        </Fragment>
                        <Fragment>
                          <MonthlySalesChart />
                        </Fragment>
                        <Fragment>
                          <ProductSalesChart />
                        </Fragment>
                      </div>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Fragment>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
