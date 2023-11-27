import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUser } from '../../utils/helpers';
import MetaData from '../layout/MetaData';

const Cart = ({ cartItems, removeItemFromCart, setIsLoginOpen, addItemToCart }) => {
  const navigate = useNavigate();

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    addItemToCart(id, newQty);
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    addItemToCart(id, newQty);
  };

  const removeCartItemHandler = (id) => {
    removeItemFromCart(id);
  };

  const checkoutHandler = () => {
    if (getUser()) {
      navigate('/shipping');
    } else {
      setIsLoginOpen(true);
    }
  };

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  return (
    <Fragment>
      <MetaData title={'Your Cart'} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map(item => (
                <Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={item.image} alt="Product" className="img-fluid" />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-2 mt-2 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                          <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                          <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-2 mt-lg-0">
                        <DeleteIcon fontSize='large' className="btn btn-danger py-1 px-2 ml-2 mr-5" onClick={() => removeCartItemHandler(item.product)}>
                          <i className="fa fa-trash"></i>
                        </DeleteIcon>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
