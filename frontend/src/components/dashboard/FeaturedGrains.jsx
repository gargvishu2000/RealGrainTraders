import React, { useContext, useEffect, useState } from "react";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedGrains = () => {
  const navigate = useNavigate();
  const { grains } = useContext(ShopContext);
  const [featuredGrains, setFeaturedGrains] = useState([]);

  useEffect(() => {
    setFeaturedGrains(grains);
  }, [grains]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 4 },
    desktop: { breakpoint: { max: 1536, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  // Helper function to format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Helper function to get trend icon and color
  const getTrendIndicator = (trend) => {
    if (trend === "up") {
      return { icon: "↑", color: "text-green-600", bg: "bg-green-50" };
    } else if (trend === "down") {
      return { icon: "↓", color: "text-red-600", bg: "bg-red-50" };
    } else {
      return { icon: "→", color: "text-gray-600", bg: "bg-gray-50" };
    }
  };

  return (
    <div className="mb-12">
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        Our selection of premium quality grains sourced directly from verified suppliers
      </p>

      {/* Carousel Container */}
      <div className="relative mt-8">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          showDots={true}
        >
          {/* Grain Cards */}
          {featuredGrains.map((grain) => {
            const trendIndicator = getTrendIndicator(grain.trend);
            
            return (
              <div
                key={grain._id}
                className="mx-3 group"
              >
                <div 
                  className="flex-none border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => navigate(`/grains/${grain._id}`)}
                >
                  {/* Image container with overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={grain.image[0]}
                      alt={grain.name}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Quality badge */}
                    {grain.quality && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                          {grain.quality}
                        </span>
                      </div>
                    )}
                    
                    {/* Quick view button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="bg-white/90 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/grains/${grain._id}`);
                        }}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                        {grain.name}
                      </h3>
                      
                      {/* Trend indicator */}
                      <span
                        className={`text-sm font-semibold ${trendIndicator.color} ${trendIndicator.bg} p-1 rounded-full h-6 w-6 flex items-center justify-center`}
                      >
                        {trendIndicator.icon}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{grain.type || "Premium Quality"}</p>
                    
                    {/* Price and action */}
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">₹{formatPrice(grain.price)}</p>
                        <p className="text-xs text-gray-500">per ton</p>
                      </div>
                      
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart or wishlist functionality
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      
      {/* View All Button */}
      <div className="text-center mt-8">
        <button 
          onClick={() => navigate('/grains')}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeaturedGrains;