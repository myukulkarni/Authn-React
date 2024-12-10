import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import VerifyOtp from "./components/verify-otp";
import HomePage from "./components/HomePage";
import AdminProductUpload from "./components/pu";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/ProductUpdate"; // Import the UpdateProduct component
import Header from "./components/Header";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import CartPage from "./components/CartPage"; // Import the CartPage component
import UserProfile from "./components/UserProfile"; // Import userprofile
import ProductDetails from "./components/ProductDetails"; // Import the ProductDetails component
import ShortList from "./components/ShortList"; // Import the ProductDetails component
import OrderHistory from "./components/order";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";
import "./App.css";

function Layout() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />

      {/* Show Banner and Categories only on the HomePage */}
      {location.pathname === "/" && (
        <>
          <Banner />
          <Categories />
        </>
      )}

      <Routes>
        {/* Existing routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp/:id" element={<VerifyOtp />} />
        <Route path="/" element={<HomePage />} /> {/* Customer Homepage */}
        <Route path="/pu" element={<AdminProductUpload />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/admin" element={<ProductList />} /> {/* Admin Product Management */}
        <Route path="/update-product/:id" element={<UpdateProduct />} /> {/* Update Product Page */}
        <Route path="/cart" element={<CartPage />} /> {/* Cart Page Route */}
        <Route path="/ShortList" element={<ShortList />} /> {/* Cart Page Route */}
        <Route path="/order" element={<OrderHistory/>} />
        <Route path="/CheckoutPage" element={<CheckoutPage/>} />
        <Route path="/ConfirmationPage" element={<ConfirmationPage/>} />


        {/* New Routes for Profile */}
        <Route path="/profile" element={<UserProfile />} /> {/* User Profile Page */}

        {/* New Route for Product Details */}
        <Route path="/product/:productId" element={<ProductDetails />} /> {/* Product Details Page */}
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
