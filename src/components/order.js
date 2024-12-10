import React, { useEffect, useState } from "react";
import axios from "axios";
import './order.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("access"); // Assuming the JWT token is in localStorage
        const response = await axios.get("http://localhost:8000/products/order-history/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token
          },
        });
        setOrders(response.data.order_history);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.product_id}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.purchased_at).toLocaleDateString()}</td> {/* Date formatting */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
