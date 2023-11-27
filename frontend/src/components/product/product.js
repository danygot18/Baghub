import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded" style={{ height: "100%" }}>
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          style={{ height: "200px", objectFit: "cover" }}
          alt={product.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ color: "#333" }}>
            <a href="" style={{ color: "#333", textDecoration: "none" }}>
              {product.name}
            </a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews" style={{ color: "#666" }}>
              ({product.numOfReviews} reviews)
            </span>
          </div>
          <p className="card-text" style={{ color: "#333" }}>
            ₱{product.price}
          </p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
            style={{ backgroundColor: "black", color: "#fff" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Product;
