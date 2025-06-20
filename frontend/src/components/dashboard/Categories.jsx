import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import { assets } from "./images/assets.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Categories = () => {
  const navigate = useNavigate();
  
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const categories = [
    { 
      id: 1, 
      name: "Rice", 
      image: assets.rice_img,
      description: "Premium quality rice varieties",
      varieties: 12,
      topSuppliers: 8
    },
    { 
      id: 2, 
      name: "Atta", 
      image: assets.aashirvad_img,
      description: "Whole wheat flour & multi-grain",
      varieties: 8,
      topSuppliers: 5
    },
    { 
      id: 3, 
      name: "Dals", 
      image: assets.dal_img,
      description: "Lentils and pulses collection",
      varieties: 15,
      topSuppliers: 10
    },
    { 
      id: 4, 
      name: "Oil", 
      image: assets.oil_img,
      description: "Cooking oils and ghee",
      varieties: 9,
      topSuppliers: 6
    },
    { 
      id: 5, 
      name: "Sugar", 
      image: assets.sugar_img,
      description: "Refined and natural sweeteners",
      varieties: 6,
      topSuppliers: 4
    },
  ];

  const handleTypeClick = (typeName) => {
    navigate(`/products?type=${typeName}`);
  };

  return (
    <div className="container mx-auto px-4">

      <div className="mt-8">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          customTransition="all 500ms ease"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {categories.map((category) => (
            <div key={category.id} className="px-3">
              <div
                className="border border-gray-200 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                onClick={() => handleTypeClick(category.name)}
              >
                {/* Image with overlay */}
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4 bg-white">
                  <h3 className="text-xl text-center font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  
                  <div className="flex justify-between text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">
                    <span>{category.varieties} Varieties</span>
                    <span>{category.topSuppliers} Suppliers</span>
                  </div>
                </div>

                {/* View button that appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    View Products
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      
      {/* View All Categories Button */}
      <div className="text-center mt-8">
        <button 
          onClick={() => navigate('/grains')}
          className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          View All Categories
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Categories;