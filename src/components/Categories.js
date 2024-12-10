// src/components/Categories.js
import React from "react";
import "./Categories.css";

// Import images directly
import toysImage from "../assets/images/toys.png";
import clothesImage from "../assets/images/clothes.png";
import educationalImage from "../assets/images/educational.png";
import essentialImage from "../assets/images/essential.png";
import girlImage from "../assets/images/girl.png";
import boyImage from "../assets/images/boy.png";
import SHOESImage from "../assets/images/SHOES.png"



function Categories() {
  // Use imported images in the array
  const categories = [
    { name: "Essentials", image: essentialImage },
    { name: "Toys", image: toysImage },
    { name: "Clothes", image: clothesImage },
    { name: "Educational", image: educationalImage },
    { name: "girls", image: girlImage },
    { name: "boys", image: boyImage },
    { name: "Shoes", image: SHOESImage },
    
  ];
  

  return (
    <section className="categories" id="categories">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <div className="circle-frame">
            <img src={category.image} alt={category.name} />
          </div>
          <div className="text-box">
            <p>{category.name}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Categories;
