import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GrainCard = ({ grain }) => {
  const navigate = useNavigate();

  if (!grain) return null;  // Avoid rendering if grain is undefined/null

  const {
    _id,
    name,
    image,
    qualityGrade,
    origin,
    priceChange = 0,  
    trending
  } = grain;

  console.log(grain);
  
  // Helper function to render trending and quality badges
  const renderBadges = () => (
    <div className="absolute top-3 left-3 flex gap-2">
      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
        {qualityGrade}
      </span>
      {trending && (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
          Trending
        </span>
      )}
    </div>
  );

  // Helper function to render price change badge
  // const renderPriceChangeBadge = () => (
  //   <div className="absolute top-3 right-3">
  //     <span className={`px-2 py-1 rounded-full text-sm text-white ${
  //       priceChange > 0 ? 'bg-green-500' : 'bg-red-500'
  //     }`}>
  //       {priceChange > 0 ? '↑' : '↓'} {Math.abs(priceChange)}%
  //     </span>
  //   </div>
  // );

  return (
    <Link 
      to={`/grains/${_id}`}
      className="border border-black-700 p-4  shadow-sm block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={image[0]} 
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {/* {renderBadges()}
        {} */}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{origin}</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Price: {grain.price}</p>
          {/* <button 
            onClick={(e) => {
              e.preventDefault();
              navigate(`/place-order/${_id}`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Order Now
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default GrainCard;
