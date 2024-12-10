import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/products/get_products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

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
    
            // Update the product's 'is_liked' status and like count locally
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? {
                              ...product,
                              is_liked: updatedProduct.is_liked,
                              like_count: updatedProduct.like_count,
                          }
                        : product
                )
            );
    
            // Notify user
            if (updatedProduct.is_liked) {
                alert('Product is shortlisted!');
            } else {
                alert('Product is removed from shortlist.');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
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
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setCart((prevCart) =>
                    prevCart.includes(product.id)
                        ? prevCart.filter((id) => id !== product.id)
                        : [...prevCart, product.id]
                );
                alert(
                    `${product.name} has been ${
                        cart.includes(product.id) ? 'removed from' : 'added to'
                    } the cart!`
                );
            } else {
                alert('Failed to update the cart. Please try again.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('An error occurred while updating the cart.');
        }
    };

    return (
        <div className="homepage-container">
            <h1>Welcome to Our Product Store</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`}>
                                <div className="product-image-container">
                                    {product.image1 ? (
                                        <img
                                            src={`http://127.0.0.1:8000${product.image1}`}
                                            alt={`${product.name} `}
                                            className="product-image"
                                        />
                                    ) : (
                                        <div className="placeholder-image">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                <h2>{product.name}</h2>
                            </Link>
                            <p>{product.description}</p>
                            <p className="price">${product.price}</p>
                            <div className="button-container">
                            <button
    className={`shortlist-button ${product.is_liked ? 'shortlisted' : ''}`}
    onClick={() => handleLike(product.id)}
>
    {product.is_liked ? "❤️" : "🤍"}
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
            )}
        </div>
    );
}

export default HomePage;
