import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

function RentCarCards() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPopupCarId, setOpenPopupCarId] = useState(null);

  const { email } = useContext(AppContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cars");
        setCars(response.data);
      } catch (err) {
        setError("Failed to load car data");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleCarPurchased = (purchasedCarId) => {
    setCars((prev) => prev.filter((car) => car._id !== purchasedCarId));
    setOpenPopupCarId(null);
  };

  const handlePurchase = async (car) => {
    if (!email) {
      toast.error("You must be logged in to purchase a car.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/purchase", {
        carId: car._id,
        buyerEmail: email,
      });

      if (response.status === 200) {
        toast.success("Car purchased successfully!");
        handleCarPurchased(car._id);
      }
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
      console.error(error);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">Loading cars...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cars.length > 0 ? (
        cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-md rounded-lg cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
            onClick={() => setOpenPopupCarId(car._id)}
          >
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {car.brand} {car.model}
              </h3>
              <p className="text-indigo-600 font-bold mt-2">
                ₹ {car.Price} /hr
              </p>
            </div>

            {openPopupCarId === car._id && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setOpenPopupCarId(null)}
                />
                {/* Popup modal */}
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="popup-title"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  onClick={(e) => e.stopPropagation()} // Prevent popup click bubbling
                >
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden relative">
                    <img
                      src={car.img}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h2
                        id="popup-title"
                        className="text-2xl font-semibold text-gray-900"
                      >
                        {car.brand} {car.model}
                      </h2>
                      <p className="text-gray-700 mt-2">ID: {car._id}</p>
                      <p className="text-indigo-600 font-bold mt-2">
                        ₹ {car.Price} /hr
                      </p>

                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => handlePurchase(car)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                          Purchase
                        </button>
                        <button
                          onClick={() => setOpenPopupCarId(null)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-white bg-gradient-to-r from-indigo-500 to-blue-500 mt-10 text-xl font-semibold py-6 px-4 rounded-lg shadow-md animate-pulse">
          No cars available.
        </p>

      )}
    </div>
  );
}

export default RentCarCards;
