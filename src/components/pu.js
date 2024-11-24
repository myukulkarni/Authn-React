import React, { useState } from "react";
import axios from "axios";
import "./pu.css";

function AdminProductUpload() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
    });

    // Separate state for each image
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setImages({ ...images, [name]: files[0] }); // Update the corresponding image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to handle product data and images
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);

        // Append each image only if it's not null
        Object.keys(images).forEach((key) => {
            if (images[key]) {
                formData.append(key, images[key]);
            }
        });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/products/create_product/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Product submitted:", response.data);

            // Reset form
            setProduct({ name: "", description: "", price: "" });
            setImages({ image1: null, image2: null, image3: null, image4: null });
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
                    type="file"
                    name="image1"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <input
                    type="file"
                    name="image2"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <input
                    type="file"
                    name="image3"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <input
                    type="file"
                    name="image4"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Upload Product</button>
            </form>
        </div>
    );
}

export default AdminProductUpload;
