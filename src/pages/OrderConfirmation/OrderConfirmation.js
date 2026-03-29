import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const location = useLocation();
  const { orderId, total, totalItems, form } = location.state || {};

  if (!orderId) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No order found.</h2>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="orderConf">
      <div className="orderConf__box">

        <div className="orderConf__checkmark">✓</div>
        <h1 className="orderConf__title">Order Placed Successfully!</h1>
        <p className="orderConf__subtitle">
          Thank you, <strong>{form.fullName}</strong>! Your order has been confirmed.
        </p>

        <div className="orderConf__orderId">
          Order ID: <strong>{orderId}</strong>
        </div>

        <div className="orderConf__details">
          <div className="orderConf__detailRow">
            <span>Items ordered</span>
            <span>{totalItems}</span>
          </div>
          <div className="orderConf__detailRow">
            <span>Order total</span>
            <span>₹{total?.toLocaleString('en-IN')}</span>
          </div>
          <div className="orderConf__detailRow">
            <span>Payment</span>
            <span style={{ textTransform: 'uppercase' }}>{form.paymentMethod}</span>
          </div>
          <div className="orderConf__detailRow">
            <span>Deliver to</span>
            <span>{form.addressLine1}, {form.city}, {form.state} - {form.pincode}</span>
          </div>
          <div className="orderConf__detailRow">
            <span>Estimated delivery</span>
            <span style={{ color: '#007600', fontWeight: 600 }}>Tomorrow by 10 PM</span>
          </div>
        </div>

        <div className="orderConf__actions">
          <Link to="/" className="orderConf__homeBtn">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;