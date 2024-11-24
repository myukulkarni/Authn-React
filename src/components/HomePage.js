import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css'; // Ensure the correct CSS file is imported

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shortlisted, setShortlisted] = useState([]); // State for shortlist items
    const [cart, setCart] = useState([]); // State for cart items

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/products/get_products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleShortlistToggle = (productId) => {
        setShortlisted((prevShortlisted) =>
            prevShortlisted.includes(productId)
                ? prevShortlisted.filter((id) => id !== productId) // Remove if already shortlisted
                : [...prevShortlisted, productId] // Add to shortlist
        );
    };

    const handleAddToCartToggle = async (product) => {
        const token = localStorage.getItem("access");

        if (!token) {
            alert("You must be logged in to add products to the cart.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/products/add_to_cart/",
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
                        ? prevCart.filter((id) => id !== product.id) // Remove if already in cart
                        : [...prevCart, product.id] // Add to cart
                );
                alert(`${product.name} has been ${cart.includes(product.id) ? "removed from" : "added to"} the cart!`);
            } else {
                alert("Failed to update the cart. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred while updating the cart.");
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
                            <Link to={`/product/${product.id}`}> {/* Link to product details page */}
                                <div className="product-image-container">
                                    {/* Display only the first available image */}
                                    {product.image1 ? (
                                        <img
                                            src={`http://127.0.0.1:8000${product.image1}`}
                                            alt={`${product.name} Image`}
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
                                    className="shortlist-button"
                                    onClick={() => handleShortlistToggle(product.id)}
                                >
                                    {shortlisted.includes(product.id) ? "❤️ Shortlisted" : "🤍 Shortlist"}
                                </button>
                                <button
                                    className="add-to-cart-button"
                                    onClick={() => handleAddToCartToggle(product)}
                                >
                                    {cart.includes(product.id) ? "🛒 In Cart" : "🛍️ Add to Cart"}
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
