import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { checkoutData, cartItems } = location.state || {};

    if (!checkoutData) {
        return <p className="error-message">No checkout data available.</p>;
    }

    const handleConfirmOrder = async () => {
        const token = localStorage.getItem("access");

        if (!token) {
            alert("You must be logged in to confirm the order.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/products/confirm-order/",
                {
                    cart_items: cartItems,
                    total_amount: checkoutData.total_amount,
                    delivery_address: checkoutData.delivery_address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("Order confirmed!");
                navigate("/thank-you"); // Navigate to a thank-you page or clear cart
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("Unauthorized. Please log in again.");
            } else {
                alert("Failed to confirm order. Please try again.");
            }
        }
    };

    return (
        <div className="confirmation-container">
            <h2 className="confirmation-title">Confirm Your Order</h2>
            <p>
                <strong>Total:</strong> ${checkoutData.total_amount}
            </p>
            <p>
                <strong>Delivery Address:</strong> {checkoutData.delivery_address}
            </p>
            <button
                className="confirm-order-button"
                onClick={handleConfirmOrder}
            >
                Confirm Order
            </button>
        </div>
    );
};

export default ConfirmationPage;
