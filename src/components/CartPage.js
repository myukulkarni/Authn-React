import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";

function CartPage() {
    const [cartItems, setCartItems] = useState([]); // Cart items list
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(true); // Loading state
    const [totalAmount, setTotalAmount] = useState(0); // Total amount

    useEffect(() => {
        const fetchCart = async () => {
            console.log("Fetching cart items...");
            const token = localStorage.getItem("access");

            if (!token) {
                setError("You need to be logged in to view your cart.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/products/view_cart/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log("Cart API Response:", response.data); // Debug response
                    const items = response.data.cart_items || [];
                    setCartItems(items);

                    // Calculate total amount
                    const total = items.reduce((sum, item) => sum + item.total, 0);
                    setTotalAmount(total);
                } else {
                    setError("Failed to fetch cart items. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                if (error.response) {
                    setError(error.response.data.detail || "An error occurred while fetching cart details.");
                } else if (error.request) {
                    setError("Network error. Please check your internet connection.");
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (productId) => {
        console.log(`Removing product with ID: ${productId}`);
        const token = localStorage.getItem("access");

        if (!token) {
            alert("You must be logged in to remove items from the cart.");
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/products/cart/delete/${productId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update cart items locally
            const updatedCart = cartItems.filter((item) => item.product_id !== productId);
            setCartItems(updatedCart);

            // Recalculate total amount
            const updatedTotal = updatedCart.reduce((sum, item) => sum + item.total, 0);
            setTotalAmount(updatedTotal);
        } catch (error) {
            console.error("Error removing product:", error);
            alert("Failed to remove product from cart.");
        }
    };

    const handleBuyNow = () => {
        console.log("Proceeding to checkout...");
        alert("Proceeding to checkout with total: $" + totalAmount);
    };

    if (loading) {
        return <p>Loading cart items...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-page-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {cartItems.map((item) => (
                            <li key={item.product_id} className="cart-item">
                                <div className="item-details">
                                    <div className="cart-item-image-container">
                                        {/* Display all product images */}
                                        {item.product_image1 && (
                                            <img
                                                src={`http://127.0.0.1:8000${item.product_image1}`}
                                                alt="Product Image 1"
                                                className="cart-item-image"
                                            />
                                        )}
                                        {item.product_image2 && (
                                            <img
                                                src={`http://127.0.0.1:8000${item.product_image2}`}
                                                alt="Product Image 2"
                                                className="cart-item-image"
                                            />
                                        )}
                                        {item.product_image3 && (
                                            <img
                                                src={`http://127.0.0.1:8000${item.product_image3}`}
                                                alt="Product Image 3"
                                                className="cart-item-image"
                                            />
                                        )}
                                        {item.product_image4 && (
                                            <img
                                                src={`http://127.0.0.1:8000${item.product_image4}`}
                                                alt="Product Image 4"
                                                className="cart-item-image"
                                            />
                                        )}
                                    </div>
                                    <div className="cart-item-info">
                                        <h2>{item.product_name}</h2>
                                        <p>
                                            Quantity: {item.quantity} x ${item.price} = ${item.total}
                                        </p>
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemove(item.product_id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: ${totalAmount.toFixed(2)}</h3>
                        <button className="buy-now-button" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
