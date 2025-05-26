import React, { useState } from "react";

const SmallCarCard = ({ data, cardSize }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!data) return null;

  const handleShowDetails = () => {
    setIsPopupOpen(true);
  };

  const baseCardClasses = "border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer";

  // Sizes for card width and padding
  const sizeClasses = {
    small: "max-w-md p-4",     
    medium: "max-w-lr p-5",     
    large: "w-80 p-6",    
  };

  const appliedSizeClass = sizeClasses[cardSize] || sizeClasses.medium;

  return (
    <>
      <div className={`${baseCardClasses} ${appliedSizeClass} mx-auto flex flex-col`}>
        <img
          src={data.image || data.img || "https://via.placeholder.com/150"}
          alt={data.model || data.Model || "Car"}
          className="w-full h-36 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
          {data.model || data.Model} - {data.company || data.CompanyName}
        </h3>
        <p className="text-gray-700 font-medium mb-3">
          Price: ₹{data.price || data.Price}
        </p>
        <button
          className="mt-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleShowDetails}
        >
          Show Details
        </button>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-6"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold focus:outline-none"
              onClick={() => setIsPopupOpen(false)}
              aria-label="Close details"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 truncate">
              {data.model || data.Model} - {data.company || data.CompanyName}
            </h2>
            <img
              src={data.image || data.img || "https://via.placeholder.com/300"}
              alt={data.model || data.Model}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <p className="text-gray-800 mb-2">
              <strong>Price:</strong> ₹{data.price || data.Price}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Fuel Type:</strong> {data.fuelType || "N/A"}
            </p>
            <p className="text-gray-800">
              <strong>Transmission:</strong> {data.transmission || "N/A"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallCarCard;
