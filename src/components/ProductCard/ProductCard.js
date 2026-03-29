import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  const handleAddToCart = (e) => {
    // Stop click from bubbling up to the card (which navigates)
    e.stopPropagation();

    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } else {
      console.error('onAddToCart is not a function!', onAddToCart);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="productCard" onClick={handleCardClick}>

      <div className="productCard__imageContainer">
        <img
          src={product.image}
          alt={product.name}
          className="productCard__image"
        />
      </div>

      <div className="productCard__info">
        <p className="productCard__name">{product.name}</p>

        <div className="productCard__rating">
          {renderStars(product.rating)}
          <span className="productCard__reviewCount">({product.reviewCount})</span>
        </div>

        <div className="productCard__price">
          <span className="productCard__currency">₹</span>
          <span className="productCard__amount">
            {product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <p className="productCard__delivery">
          FREE delivery by <strong>Tomorrow</strong>
        </p>
      </div>

      <button
        className={`productCard__addToCart ${added ? 'added' : ''}`}
        onClick={handleAddToCart}
      >
        {added ? '✓ Added!' : 'Add to Cart'}
      </button>

    </div>
  );
}

export default ProductCard;