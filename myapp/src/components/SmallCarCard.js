import React, { useState } from "react";
import { User, Mail, Phone } from "lucide-react";

const SmallCarCard = ({ data, cardSize }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!data) return null;

  const handleShowDetails = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const baseCardClasses =
    "border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer flex flex-col";

  const outsideFields = [
    { label: "Price", value: `₹${data.Price || "N/A"}` },
    { label: "Fuel Type", value: data.Fuel || "N/A" },
    { label: "Number Plate", value: data.numberPlate || "N/A" },
  ];

  const popupFields = [
    { label: "Seller Name", value: `${data.firstname || ""} ${data.lastname || ""}`.trim() || "N/A", icon: <User size={20} /> },
    { label: "Contact Email", value: data.email || "N/A", icon: <Mail size={20} /> },
    { label: "Contact Number", value: data.number || "N/A", icon: <Phone size={20} /> },
  ];

  return (
    <>
      <div className={`${baseCardClasses}  mx-auto w-[90%] p-3 `}>
        <img
          src={data.img || "https://via.placeholder.com/150"}
          alt={`${data.brand || "Car"} ${data.model || ""}`}
          className="w-full h-40 object-cover rounded-lg mb-4"
          loading="lazy"
        />

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 truncate">
          {data.brand || "Unknown Brand"} - {data.model || "Unknown Model"}
        </h3>

        <div className="mb-6 rounded-lg border border-gray-100 bg-gray-50 shadow-inner divide-y divide-gray-200 p-3">
          {outsideFields.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between py-2 last:border-none"
            >
              <span className="text-gray-600 font-medium">{label}</span>
              <span className="text-gray-900 font-semibold truncate max-w-[60%] text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Only Show Details button remains */}
        <div className="flex">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 flex-1"
            onClick={handleShowDetails}
            aria-haspopup="dialog"
            aria-expanded={isPopupOpen}
          >
            Show Details
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 md:p-6"
          onClick={handleClosePopup}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              onClick={handleClosePopup}
              aria-label="Close details"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900 truncate">
              {data.brand || "Unknown Brand"} - {data.model || "Unknown Model"}
            </h2>

            <img
              src={data.img || "https://via.placeholder.com/300"}
              alt={`${data.brand || "Car"} ${data.model || ""}`}
              className="w-full h-50 object-cover rounded-lg mb-6"
              loading="lazy"
            />

            <div className="space-y-4">
              {popupFields.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                  <div className="text-blue-600">{icon}</div>
                  <div className="flex flex-col w-full">
                    <span className="text-sm text-gray-500 font-medium">{label}</span>
                    <span className="text-gray-900 font-semibold break-words">{value}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SmallCarCard;
