import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import products from '../../data/products';
import './Home.css';

const bannerImages = [
  'https://picsum.photos/id/1/1400/500',
  'https://picsum.photos/id/20/1400/500',
  'https://picsum.photos/id/42/1400/500',
];

const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home'];

function Home({ onAddToCart, searchTerm, setSearchTerm }) {

  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
    selectedCategory === 'All' || p.category === selectedCategory;

    const matchesSearch = p.name
        .toLowerCase()
        .includes((searchTerm || '').toLowerCase());

    return matchesCategory && matchesSearch;
    });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Test: log to confirm onAddToCart is received
  console.log('Home received onAddToCart:', typeof onAddToCart);

  return (
    <div className="home">

      {/* CATEGORY BAR */}
      <div className="home__categoryBar">
        <span className="home__categoryItem">☰ All</span>
        <span className="home__categoryItem">Today's Deals</span>
        <span className="home__categoryItem">Customer Service</span>
        <span className="home__categoryItem">Registry</span>
        <span className="home__categoryItem">Gift Cards</span>
        <span className="home__categoryItem">Sell</span>
      </div>

      {/* HERO BANNER */}
      <div className="home__banner">
        <img
          src={bannerImages[currentBanner]}
          alt="banner"
          className="home__bannerImage"
        />
        <div className="home__bannerDots">
          {bannerImages.map((_, i) => (
            <span
              key={i}
              className={`home__dot ${i === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(i)}
            />
          ))}
        </div>
        <button
          className="home__bannerArrow left"
          onClick={() =>
            setCurrentBanner(
              (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
            )
          }
        >‹</button>
        <button
          className="home__bannerArrow right"
          onClick={() =>
            setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
          }
        >›</button>
      </div>

      {/* FILTER BAR */}
      <div className="home__filters">
        <div className="home__filterCategories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`home__filterBtn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="home__searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="home__productSection">
        <h2 className="home__sectionTitle">
          {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
          <span className="home__productCount"> ({filteredProducts.length} items)</span>
        </h2>

        <div className="home__grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;