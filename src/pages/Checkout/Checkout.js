import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const deliveryCharge = subtotal > 499 ? 0 : 40;
  const total = subtotal + deliveryCharge;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
      newErrors.phone = 'Enter valid 10-digit phone number';
    if (!form.addressLine1.trim())
      newErrors.addressLine1 = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode))
      newErrors.pincode = 'Enter valid 6-digit pincode';
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      navigate('/auth');
      return;
    }

    setPlacing(true);

    try {
      const address = `${form.addressLine1}${form.addressLine2 ? ', ' + form.addressLine2 : ''}, ${form.city}, ${form.state} - ${form.pincode}`;

      const res = await axios.post(
        'https://amazon-clone-1-2wgs.onrender.com/api/orders',
        {
          cartItems,
          paymentMethod: form.paymentMethod,
          address,
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems([]);
      navigate('/order-confirmation', {
        state: {
          orderId: res.data.orderId,
          total,
          totalItems,
          form,
        },
      });
    } catch (err) {
      setErrors({
        general: err.response?.data?.error || 'Failed to place order. Try again.',
      });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__container">

        {/* LEFT — Form */}
        <div className="checkout__left">

          {/* Delivery Address */}
          <div className="checkout__section">
            <h2 className="checkout__sectionTitle">
              <span className="checkout__step">1</span>
              Delivery Address
            </h2>

            {errors.general && (
              <div style={{
                background: '#fff0f0',
                border: '1px solid #cc0000',
                borderRadius: '4px',
                padding: '10px 12px',
                color: '#cc0000',
                fontSize: '13px',
                marginBottom: '14px'
              }}>
                {errors.general}
              </div>
            )}

            <div className="checkout__formGrid">
              <div className="checkout__field checkout__fieldFull">
                <label>Full Name *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && (
                  <span className="checkout__error">{errors.fullName}</span>
                )}
              </div>

              <div className="checkout__field">
                <label>Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && (
                  <span className="checkout__error">{errors.phone}</span>
                )}
              </div>

              <div className="checkout__field">
                <label>Pincode *</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  className={errors.pincode ? 'error' : ''}
                />
                {errors.pincode && (
                  <span className="checkout__error">{errors.pincode}</span>
                )}
              </div>

              <div className="checkout__field checkout__fieldFull">
                <label>Address Line 1 *</label>
                <input
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  placeholder="House No, Building, Street"
                  className={errors.addressLine1 ? 'error' : ''}
                />
                {errors.addressLine1 && (
                  <span className="checkout__error">{errors.addressLine1}</span>
                )}
              </div>

              <div className="checkout__field checkout__fieldFull">
                <label>Address Line 2 (Optional)</label>
                <input
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Area, Colony, Locality"
                />
              </div>

              <div className="checkout__field">
                <label>City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && (
                  <span className="checkout__error">{errors.city}</span>
                )}
              </div>

              <div className="checkout__field">
                <label>State *</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                >
                  <option value="">Select State</option>
                  {['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat',
                    'Haryana','Himachal Pradesh','Karnataka','Kerala',
                    'Madhya Pradesh','Maharashtra','Odisha','Punjab',
                    'Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh',
                    'Uttarakhand','West Bengal'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && (
                  <span className="checkout__error">{errors.state}</span>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout__section">
            <h2 className="checkout__sectionTitle">
              <span className="checkout__step">2</span>
              Payment Method
            </h2>

            <div className="checkout__paymentOptions">
              {[
                { value: 'cod',        label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
                { value: 'upi',        label: '📱 UPI',              desc: 'GPay, PhonePe, Paytm, etc.' },
                { value: 'card',       label: '💳 Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                { value: 'netbanking', label: '🏦 Net Banking',      desc: 'All major banks supported' },
              ].map((option) => (
                <label key={option.value} className="checkout__paymentOption">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={form.paymentMethod === option.value}
                    onChange={handleChange}
                  />
                  <div className="checkout__paymentLabel">
                    <span className="checkout__paymentName">{option.label}</span>
                    <span className="checkout__paymentDesc">{option.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Order Review */}
          <div className="checkout__section">
            <h2 className="checkout__sectionTitle">
              <span className="checkout__step">3</span>
              Review Items
            </h2>
            <div className="checkout__reviewItems">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout__reviewItem">
                  <img src={item.image} alt={item.name} className="checkout__reviewImage" />
                  <div className="checkout__reviewInfo">
                    <p className="checkout__reviewName">{item.name}</p>
                    <p className="checkout__reviewQty">Qty: {item.quantity}</p>
                    <p className="checkout__reviewPrice">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT — Order Summary */}
        <div className="checkout__right">
          <div className="checkout__summary">
            <button
              className="checkout__placeOrderBtn"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing Order...' : 'Place your order'}
            </button>

            <p className="checkout__legal">
              By placing your order, you agree to Amazon's{' '}
              <span className="checkout__link">privacy notice</span> and{' '}
              <span className="checkout__link">conditions of use</span>.
            </p>

            <div className="checkout__summaryDivider" />

            <h3 className="checkout__summaryTitle">Order Summary</h3>

            <div className="checkout__summaryRow">
              <span>Items ({totalItems}):</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="checkout__summaryRow">
              <span>Delivery:</span>
              <span className={deliveryCharge === 0 ? 'checkout__free' : ''}>
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="checkout__summaryDivider" />

            <div className="checkout__summaryRow checkout__orderTotal">
              <span>Order Total:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div className="checkout__secureNote">
              🔒 Transactions are secure and encrypted
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;