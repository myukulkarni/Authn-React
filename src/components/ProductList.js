import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/products/get_products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className="price">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
