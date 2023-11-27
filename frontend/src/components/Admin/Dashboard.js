import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import UserSalesChart from "./userSalesChart";
import MonthlySalesChart from "./monthlyChart";
import ProductSalesChart from "./productSalesChart";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint, setData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/${endpoint}`,
        config
      );
      setData(data[endpoint]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("products/show", setProducts);
    fetchData("users", setUsers);
    fetchData("categories", setCategories);
    fetchData("orders", setOrders);
  }, []);

  return (
    <Fragment>
    <Row>
      <Col md={2}>
        <Sidebar />
      </Col>

      <Col md={10}>
        <Card className="my-4" style={{ width: "100%", minHeight: "100vh" }}>
          <Card.Body>
            <h1 className="mb-4">Dashboard</h1>

              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  <MetaData title={"Admin Dashboard"} />

                  <Row className="pr-5 mt-5">
                    {/* Total Amount Card */}

                    {/* Products, Orders, Users, Categories Cards */}
                    {[
                      { label: "Products", data: products, link: "/admin/products" },
                      { label: "Users", data: users, link: "/admin/users" },
                      { label: "Categories", data: categories, link: "/admin/category" },
                      { label: "Orders", data: orders, link: "/admin/orders" },
                    ].map((item, index) => (
                      <Col key={index} xl={3} sm={6} mb={3}>
                        <Card className={`bg-${index % 4 === 0 ? "success" : index % 4 === 1 ? "danger" : index % 4 === 2 ? "info" : "warning"} text-white o-hidden h-100`}>
                          <Card.Body>
                            <div className="text-center card-font-size">
                              {item.label}
                              <br /> <b>{item.data && item.data.length}</b>
                            </div>
                          </Card.Body>
                          <Link
                            className="card-footer text-white clearfix small z-1"
                            to={item.link}
                          >
                            <span className="float-left">View Details</span>
                            <span className="float-right">
                              <i className="fa fa-angle-right"></i>
                            </span>
                          </Link>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {/* Charts Section */}
                  <Row className="mt-5">
                    <Col md={7}>
                      <UserSalesChart />
                    </Col>
                    <Col md={5}>
                      <MonthlySalesChart />
                    </Col>
                    <Col md={20}>
                      <ProductSalesChart />
                    </Col>
                  </Row>
                </Fragment>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;