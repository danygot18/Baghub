import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { getUser, getToken, successMsg, errMsg } from "../../utils/helpers";
import ListReviews from "../product/listReview";
// import { useAlert} from '@blaumaus/react-alert'
import axios from "axios";

const ProductDetails = ({ addItemToCart, cartItems }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [user, setUser] = useState(getUser());
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorReview, setErrorReview] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);

  let { id } = useParams();
  // const alert = useAlert();

  const productDetails = async (id) => {
    let link = `${process.env.REACT_APP_API}/api/v1/products/${id}`;
    console.log(link);
    let res = await axios.get(link);
    console.log(res);
    if (!res) {
      setError("Product not found");
    }
    setProduct(res.data.products);
    setLoading(false);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  const addToCart = async () => {
    await addItemToCart(id, quantity);
  };
  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }
  const getCategory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/categories`,
        config
      );
      console.log(data);
      setCategories(data.categories);
      setName(data.categories.name)
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const newReview = async (reviewData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/review`,
        reviewData,
        config
      );
      setSuccess(data.success);
    } catch (error) {
      setErrorReview(error.response.data.message);
    }
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);
    newReview(formData);
  };

  useEffect(() => {
    getCategory();
    productDetails(id);
    if (errorReview) {
      errMsg(errorReview);
      setErrorReview("");
    }
    if (success) {
      successMsg("Reivew posted successfully");
      setSuccess(false);
    }
    
  }, [id]);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  console.log(categories.name)
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product && product.name} />
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <br></br>
              <br></br>
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100 rounded"
                        src={image.url}
                        alt={product.title}
                        style={{ maxHeight: "750px", objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3 style={{ textAlign: "left" }}>{product.name}</h3>
              <p id="product_id" style={{ textAlign: "left" }}>
                Product #{product._id}
              </p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">₱{product.price}</p>

              <hr />

              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control count mx-2"
                  style={{ width: "395px" }}
                  value={quantity}
                  readOnly
                />
                <span className="btn btn-dark plus mr-2" onClick={increaseQty}>
                  +
                </span>
                &nbsp;&nbsp;
                <span className="btn btn-secondary minus" onClick={decreaseQty}>
                  -
                </span>
                &nbsp;&nbsp;
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-dark d-inline ml-4"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>

              <hr />

              <h1
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                  color: product.stock > 0 ? "green" : "red",
                }}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </h1>

              <hr />

              <div style={{ textAlign: "left" }}>
                <div>
                  <h6 style={{ display: "inline" }}>Type of Bag:&nbsp;</h6>
                  <span id="product_category" style={{ display: "inline" }}>
                      {product.category && product.category.name }
                  </span>
                </div>
              </div>

              <h6 className="mt-2" style={{ textAlign: "left" }}>
                Product details
              </h6>
              <p style={{ textAlign: "justify" }}>{product.description}</p>

              <hr />

              <p
                id="product_seller"
                style={{ marginBottom: "3px", textAlign: "left" }}
              >
                Sold by: <strong>{product.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-dark mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review.
                </div>
              )}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {product.reviews && product.reviews.length > 0 && (
                <ListReviews reviews={product.reviews} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
