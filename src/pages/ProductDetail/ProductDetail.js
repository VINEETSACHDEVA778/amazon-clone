import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../../data/products';
import './ProductDetail.css';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();          // gets the :id from the URL
  const navigate = useNavigate();       // lets us go to another page in code

  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // If product not found
  if (!product) {
    return (
      <div className="productDetail__notFound">
        <h2>Product not found!</h2>
        <button onClick={() => navigate('/')}>Go back to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // reset after 2s
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="productDetail">

      {/* BREADCRUMB */}
      <div className="productDetail__breadcrumb">
        <span onClick={() => navigate('/')} className="productDetail__breadcrumbLink">
          Home
        </span>
        <span> › </span>
        <span>{product.category}</span>
        <span> › </span>
        <span className="productDetail__breadcrumbCurrent">{product.name}</span>
      </div>

      <div className="productDetail__container">

        {/* LEFT — Image Carousel */}
        <div className="productDetail__imageSection">
          {/* Thumbnail column */}
          <div className="productDetail__thumbnails">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`view ${i + 1}`}
                className={`productDetail__thumbnail ${i === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="productDetail__mainImageContainer">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="productDetail__mainImage"
            />
          </div>
        </div>

        {/* MIDDLE — Product Info */}
        <div className="productDetail__info">
          <h1 className="productDetail__name">{product.name}</h1>

          <div className="productDetail__rating">
            <div className="productDetail__stars">{renderStars(product.rating)}</div>
            <span className="productDetail__ratingNumber">{product.rating}.0</span>
            <span className="productDetail__reviews">
              {product.reviewCount.toLocaleString()} ratings
            </span>
          </div>

          <div className="productDetail__divider" />

          {/* Price */}
          <div className="productDetail__priceSection">
            <span className="productDetail__dealLabel">Deal of the Day</span>
            <div className="productDetail__price">
              <span className="productDetail__currency">₹</span>
              <span className="productDetail__amount">
                {product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="productDetail__tax">Inclusive of all taxes</p>
          </div>

          <div className="productDetail__divider" />

          {/* Description */}
          <div className="productDetail__description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>

          {/* Stock */}
          <p className={`productDetail__stock ${product.stock > 0 ? 'inStock' : 'outOfStock'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </p>
        </div>

        {/* RIGHT — Buy Box */}
        <div className="productDetail__buyBox">
          <div className="productDetail__buyBoxPrice">
            <span className="productDetail__currency">₹</span>
            {product.price.toLocaleString('en-IN')}
          </div>

          <p className="productDetail__buyBoxDelivery">
            FREE Delivery <strong>Tomorrow</strong>
          </p>
          <p className="productDetail__buyBoxDelivery" style={{ color: 'green', fontWeight: 'bold' }}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Quantity selector */}
          <div className="productDetail__quantity">
            <label>Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            className={`productDetail__addToCart ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>

          <button
            className="productDetail__buyNow"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            Buy Now
          </button>

          <div className="productDetail__secure">
            🔒 Secure transaction
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;