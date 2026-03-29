import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (remove if hits 0)
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = subtotal > 499 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="cart__empty">
        <div className="cart__emptyInner">
          <img
            src="https://picsum.photos/id/120/200/150"
            alt="empty cart"
            className="cart__emptyImage"
          />
          <h2>Your Amazon Cart is empty</h2>
          <p>Shop today's deals</p>
          <Link to="/" className="cart__shopNow">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">

        {/* LEFT — Cart Items */}
        <div className="cart__left">
          <div className="cart__header">
            <h1 className="cart__title">Shopping Cart</h1>
            <span className="cart__headerPrice">Price</span>
          </div>

          <div className="cart__divider" />

          {cartItems.map((item) => (
            <div key={item.id} className="cart__item">

              {/* Product Image */}
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart__itemImage"
                />
              </Link>

              {/* Product Info */}
              <div className="cart__itemDetails">
                <Link to={`/product/${item.id}`} className="cart__itemName">
                  {item.name}
                </Link>

                <p className="cart__itemStock">In Stock</p>
                <p className="cart__itemDelivery">
                  FREE delivery <strong>Tomorrow</strong>
                </p>

                {/* Quantity Controls */}
                <div className="cart__itemActions">
                  <div className="cart__qtyControl">
                    <button
                      className="cart__qtyBtn"
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span className="cart__qtyNumber">{item.quantity}</span>
                    <button
                      className="cart__qtyBtn"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart__actionDivider">|</span>

                  <button
                    className="cart__deleteBtn"
                    onClick={() => removeItem(item.id)}
                  >
                    Delete
                  </button>

                  <span className="cart__actionDivider">|</span>

                  <button className="cart__saveBtn">Save for later</button>
                </div>
              </div>

              {/* Item Price */}
              <div className="cart__itemPrice">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>

            </div>
          ))}

          <div className="cart__divider" />

          {/* Subtotal at bottom of list */}
          <div className="cart__subtotalBottom">
            Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}):
            <strong> ₹{subtotal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="cart__right">
          <div className="cart__summary">

            {/* Free delivery banner */}
            {deliveryCharge === 0 && (
              <div className="cart__freeDelivery">
                ✅ Your order qualifies for <strong>FREE Delivery</strong>
              </div>
            )}

            <p className="cart__summarySubtotal">
              Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}):
              <span className="cart__summaryAmount">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </p>

            <div className="cart__summaryRow">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? 'cart__free' : ''}>
                {deliveryCharge === 0
                  ? 'FREE'
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="cart__summaryDivider" />

            <div className="cart__summaryRow cart__totalRow">
              <span>Order Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="cart__checkoutBtn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Buy ({totalItems} item{totalItems > 1 ? 's' : ''})
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;