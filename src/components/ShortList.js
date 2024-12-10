import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ShortList.css';

const ShortList = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          setError('You need to be logged in to view your shortlisted products.');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/products/liked-products/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLikedProducts(response.data.liked_products || []);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch liked products. Please try again later.');
        }
        console.error('Error fetching liked products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [message, navigate]);

  const handleLike = async (productId) => {
    try {
      const token = localStorage.getItem('access');
      if (!token) {
        alert('You must be logged in to like a product.');
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/products/products/${productId}/like/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedProduct = response.data;

      // Update the product's 'is_liked' status locally
      setLikedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? {
                ...product,
                is_liked: updatedProduct.is_liked,
              }
            : product
        )
      );

      setMessage(
        updatedProduct.is_liked
          ? 'Product has been added to your shortlist.'
          : 'Product has been removed from your shortlist.'
      );
    } catch (err) {
      console.error('Error toggling like:', err);
      alert('Failed to update shortlist. Please try again later.');
    }
  };

  const handleAddToCartToggle = async (product) => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('You must be logged in to add products to the cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/products/add_to_cart/',
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setCart((prevCart) =>
          prevCart.includes(product.id)
            ? prevCart.filter((id) => id !== product.id)
            : [...prevCart, product.id]
        );

        setMessage(
          cart.includes(product.id)
            ? 'Product removed from cart.'
            : 'Product added to cart.'
        );
      } else {
        alert('Failed to update the cart. Please try again.');
      }
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('An error occurred while updating the cart.');
    }
  };

  return (
    <div className="shortlist-container">
      <h1>Shortlisted Products</h1>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {loading ? (
        <p className="loading-message">Loading shortlisted products...</p>
      ) : likedProducts.length > 0 ? (
        <div className="product-grid">
          {likedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-image-container">
                  {product.image1_url ? (
                    <img
                      src={product.image1_url}
                      alt={`${product.name}`}
                      className="product-image"
                    />
                  ) : (
                    <div className="placeholder-image">No Image Available</div>
                  )}
                </div>
                <h2>{product.name}</h2>
              </Link>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <div className="button-container">
                <button
                  className={`shortlist-button ${
                    product.is_liked ? 'shortlisted' : ''
                  }`}
                  onClick={() => handleLike(product.id)}
                >
                  {product.is_liked ? '❤️' : '🤍'}
                </button>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCartToggle(product)}
                >
                  {cart.includes(product.id) ? '🛒' : '🛍️ '}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No shortlisted products yet.</p>
      )}
    </div>
  );
};

export default ShortList;
