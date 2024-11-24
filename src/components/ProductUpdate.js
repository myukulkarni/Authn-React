import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductUpdate.css";
import Cookies from 'js-cookie';

axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageErrors, setImageErrors] = useState({});  // Object to hold errors for each image field
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/products/get_product/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Failed to load product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Basic file validation (only allow images and limit file size to 5MB)
            const isValidFile = file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024; // max 5MB
            if (isValidFile) {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    [name]: file, // Dynamically update the correct image field (image1, image2, etc.)
                }));
                setImageErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: null, // Reset error if file is valid
                }));
            } else {
                setImageErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Invalid file. Please upload an image smaller than 5MB.",
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!product.name || !product.description || !product.price) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);

            // Append images to the formData
            if (product.image1) formData.append("image1", product.image1);
            if (product.image2) formData.append("image2", product.image2);
            if (product.image3) formData.append("image3", product.image3);
            if (product.image4) formData.append("image4", product.image4);

            // Axios will automatically include the CSRF token
            const response = await axios.put(
                `http://127.0.0.1:8000/products/update/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // multipart form data for file upload
                    },
                }
            );

            if (response.status === 200) {
                alert("Product updated successfully!");
                navigate("/products");
            } else {
                alert("Failed to update the product.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product.");
        }
    };

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="update-product-container">
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} className="update-product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description || ""}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image Inputs */}
                <div className="form-group">
                    <label htmlFor="image1">Image 1:</label>
                    <input
                        type="file"
                        id="image1"
                        name="image1"
                        onChange={handleFileChange}
                    />
                    {imageErrors.image1 && <p className="error-message">{imageErrors.image1}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="image2">Image 2:</label>
                    <input
                        type="file"
                        id="image2"
                        name="image2"
                        onChange={handleFileChange}
                    />
                    {imageErrors.image2 && <p className="error-message">{imageErrors.image2}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="image3">Image 3:</label>
                    <input
                        type="file"
                        id="image3"
                        name="image3"
                        onChange={handleFileChange}
                    />
                    {imageErrors.image3 && <p className="error-message">{imageErrors.image3}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="image4">Image 4:</label>
                    <input
                        type="file"
                        id="image4"
                        name="image4"
                        onChange={handleFileChange}
                    />
                    {imageErrors.image4 && <p className="error-message">{imageErrors.image4}</p>}
                </div>

                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
