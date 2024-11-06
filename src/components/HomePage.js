import React from 'react';
import ProductList from './ProductList';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <h1 className="homepage-header">Welcome to Our Product Store</h1>
            <p className="homepage-subtitle">Explore our collection of amazing products</p>
            <ProductList />
        </div>
    );
}

export default HomePage;
