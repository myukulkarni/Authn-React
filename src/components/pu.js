import React, { useState } from 'react';
import axios from 'axios';
import './pu.css';

function AdminProductUpload() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send a POST request with product data to the backend
            const response = await axios.post('http://127.0.0.1:8000/products/create_product/', product, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Product submitted:", response.data);

            // Reset form
            setProduct({ name: '', description: '', price: '', imageUrl: '' });
            alert("Product uploaded successfully!");
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Error uploading product. Please try again.");
        }
    };

    return (
        <div className="admin-form-container">
            <h1>Admin Product Upload</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    placeholder="Product Name"
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    value={product.description}
                    placeholder="Product Description"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    placeholder="Product Price"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    placeholder="Image URL"
                    onChange={handleChange}
                />
                <button type="submit">Upload Product</button>
            </form>
        </div>
    );
}

export default AdminProductUpload;
