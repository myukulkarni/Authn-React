import React, { useState, useEffect } from "react";
import "./Banner.css";

function Banner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
      title: "One Stop Shop for Kids",
      description: "Your go-to store for everything your kid needs!",
      buttonText: "Shop Now",
    },
    {
      title: "Exclusive Offers on New Arrivals",
      description: "Grab exciting offers on our latest collection!",
      buttonText: "Explore Offers",
    },
    {
      title: "Festive Season Discounts",
      description: "Enjoy up to 50% off on selected items!",
      buttonText: "Check Discounts",
    },
    {
      title: "Special Deals for Members",
      description: "Join now and get special member-only discounts!",
      buttonText: "Join Now",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="banner">
      <div className="banner-content">
        <h1>{banners[currentBanner].title}</h1>
        <p>{banners[currentBanner].description}</p>
        <button className="shop-now-btn">{banners[currentBanner].buttonText}</button>
      </div>
    </section>
  );
}

export default Banner;
