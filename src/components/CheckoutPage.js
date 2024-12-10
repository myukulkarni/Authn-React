import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = ({ cartItems }) => {
    const [checkoutData, setCheckoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const token = localStorage.getItem("access");

            if (!token) {
                setError("You must be logged in to proceed to checkout.");
                setLoading(false);
                return;
            }

            try {
                console.log("Sending Cart Items:", cartItems); // Debugging
                const response = await axios.post(
                    "http://127.0.0.1:8000/products/checkout/",
                    { cart_items: cartItems },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Checkout Response:", response.data); // Debugging
                setCheckoutData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error:", err.response || err.message); // Debugging
                if (err.response && err.response.status === 401) {
                    setError("Unauthorized. Please log in again.");
                } else if (err.response && err.response.status === 400) {
                    setError(err.response.data.error || "Invalid request.");
                } else {
                    setError("Failed to fetch checkout details.");
                }
                setLoading(false);
            }
        };

        fetchCheckoutData();
    }, [cartItems]);

    const handleProceedToConfirmation = () => {
        if (checkoutData) {
            navigate("/confirmationPage", { state: { checkoutData, cartItems } });
        }
    };

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>
            <ul className="checkout-items">
                {checkoutData.items.map((item) => (
                    <li key={item.product_id} className="checkout-item">
                        <span className="item-name">{item.product_name}</span>
                        <span className="item-quantity">
                            {item.quantity} x ${item.price}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="checkout-summary">
                <p>
                    <strong>Total:</strong> ${checkoutData.total_amount}
                </p>
                <p>
                    <strong>Delivery Address:</strong> {checkoutData.delivery_address}
                </p>
                <p>
                    <strong>Payment Method:</strong> {checkoutData.payment_method}
                </p>
            </div>
            <button
                className="proceed-button"
                onClick={handleProceedToConfirmation}
            >
                Proceed to Confirmation
            </button>
        </div>
    );
};

export default CheckoutPage;
