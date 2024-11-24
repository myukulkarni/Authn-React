import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "./HomePage.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/products/get_products/");
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

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/products/delete/${productId}/`);
                if (response.status === 204) {
                    setProducts(products.filter((product) => product.id !== productId));
                    alert("Product deleted successfully.");
                } else {
                    alert("Failed to delete the product. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete the product.");
            }
        }
    };

    const handleUpdate = (productId) => {
        navigate(`/update-product/${productId}`); // Navigate to update page
    };

    const handleUploadNavigate = () => {
        navigate("/pu"); // Navigate to the product upload page
    };

    return (
        <div className="product-list-container">
            <h1>Admin Product Management</h1>
            <button className="btn" onClick={handleUploadNavigate}>
                Upload New Product
            </button>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            {/* Display only the first available image */}
                            <div className="product-image-container">
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
                            <p>{product.description}</p>
                            <p className="price">${product.price}</p>
                            <button
                                className="update-button"
                                onClick={() => handleUpdate(product.id)}
                            >
                                Update
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
