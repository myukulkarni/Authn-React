import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access the product ID from the URL
import './ProductDetails.css'; // Import the CSS file for styling
import ShareButton from './Share';

function ProductDetails() {
    const { productId } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shortlisted, setShortlisted] = useState(false);
    const [cart, setCart] = useState(false); // Track if the product is in the cart
    const [mainImage, setMainImage] = useState(''); // State for the main image

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/products/get_product/${productId}/`);
                setProduct(response.data);
                setMainImage(response.data.image1); // Set the default main image
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Failed to load product details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId]);

    // Toggle shortlist status
    const handleShortlistToggle = () => {
        setShortlisted(!shortlisted);
    };

    // Add to cart functionality
    const handleAddToCartToggle = async () => {
        const token = localStorage.getItem("access"); // Get token from local storage

        if (!token) {
            alert("You must be logged in to add products to the cart.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/products/add_to_cart/",
                { product_id: productId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setCart(!cart); // Toggle cart status
                alert(`${product.name} has been ${cart ? "removed from" : "added to"} the cart!`);
            } else {
                alert("Failed to update the cart. Please try again.");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred while adding the product to the cart.");
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-details-container">
            <div className="product-image-gallery">
                {/* Main Product Image */}
                <div className="main-image-container">
                    <img
                        src={`http://127.0.0.1:8000${mainImage}`}
                        alt={product.name}
                        className="main-product-image"
                    />
                </div>

                {/* Thumbnail Images */}
                <div className="thumbnail-images-container">
                    {product.image1 && (
                        <img
                            src={`http://127.0.0.1:8000${product.image1}`}
                            alt=""
                            className="thumbnail-image"
                            onClick={() => setMainImage(product.image1)} // Set as main image on click
                        />
                    )}
                    {product.image2 && (
                        <img
                            src={`http://127.0.0.1:8000${product.image2}`}
                            alt=""
                            className="thumbnail-image"
                            onClick={() => setMainImage(product.image2)} // Set as main image on click
                        />
                    )}
                    {product.image3 && (
                        <img
                            src={`http://127.0.0.1:8000${product.image3}`}
                            alt=""
                            className="thumbnail-image"
                            onClick={() => setMainImage(product.image3)} // Set as main image on click
                        />
                    )}
                    {product.image4 && (
                        <img
                            src={`http://127.0.0.1:8000${product.image4}`}
                            alt=""
                            className="thumbnail-image"
                            onClick={() => setMainImage(product.image4)} // Set as main image on click
                        />
                    )}
                </div>
            </div>

            <div className="product-info-container">
                <h1>{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="price">${product.price}</p>

                <div className="button-container">
                    <button
                        className={`shortlist-button ${shortlisted ? 'shortlisted' : ''}`}
                        onClick={handleShortlistToggle}
                    >
                        {shortlisted ? "❤️ Shortlisted" : "🤍 Shortlist"}
                    </button>
                    <button
                        className={`add-to-cart-button ${cart ? 'in-cart' : ''}`}
                        onClick={handleAddToCartToggle}
                    >
                        {cart ? "🛒 In Cart" : "🛍️ Add to Cart"}
                    </button>
                    <ShareButton productUrl={`http://127.0.0.1:8000/products/product/${product.id}`} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
