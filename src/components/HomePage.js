import React from 'react';
import './HomePage.css'; // Make sure to create this CSS file for styles
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">KiddoKorner</div>
        <div className="search-bar">
          <input type="text" placeholder="Search for toys, clothes..." />
          <button><FaSearch /></button>
        </div>
        <div className="header-icons">
          <FaUser className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to KiddoKorner!</h1>
          <p>Your one-stop corner for kids!</p>
          <button className="shop-button">Start Shopping</button>
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {/* Sample Product Cards */}
            {[1, 2, 3, 4].map((product) => (
              <div className="product-card" key={product}>
                <img src={`https://via.placeholder.com/150?text=Product+${product}`} alt={`Product ${product}`} />
                <h3>Product {product}</h3>
                <p>$19.99</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <section className="fun-facts">
          <h2>Fun Facts!</h2>
          <ul>
            <li>Did you know kids giggle about 300 times a day?</li>
            <li>The average toddler has 8-10 tantrums a week!</li>
            <li>Kids' brains grow faster in the first five years than at any other time!</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 KiddoKorner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
