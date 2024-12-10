import React, { useState, useEffect } from "react";
import "./Banner.css";
import banner4Image from "../assets/images/banner1.jpg"; // Import images
import banner2Image from "../assets/images/banner2.jpg";
import banner3Image from "../assets/images/banner3.jpg";


function Banner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
      image: banner3Image
      
    },
    {
      image: banner2Image
     
    },
    {
      image: banner4Image
     
    },
    {
      image: "https://via.placeholder.com/800x400?text=Special+Deals+for+Members",
      alt: "Special Deals for Members",
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
      <img
        src={banners[currentBanner].image}
        alt={banners[currentBanner].alt}
        className="banner-image"
      />
    </section>
  );
}

export default Banner;
