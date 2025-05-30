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
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cars`);
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/purchase`, {
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
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white rounded-xl bg-opacity-10 m-auto mt-3  w-[90%]">
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
                <div
                  className="fixed inset-0 bg-black bg-opacity-60 z-40"
                  onClick={() => setOpenPopupCarId(null)}
                />
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="popup-title"
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-xl shadow-2xl max-w-sm overflow-hidden relative border border-gray-100 mt-20 "
                    style={{
                      boxShadow: '  0 4px 15px rgba(100, 100, 100, 0.2)'
                    }}
                  >
                    <img
                      src={car.img}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-52 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h2
                        id="popup-title"
                        className="text-2xl font-extrabold text-gray-900 tracking-tight border-b border-gray-200 pb-2 mb-3"
                      >
                        {car.brand} {car.model}
                      </h2>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-gray-700 text-xs">
                        {/** Smaller padding in fields for compactness */}
                        <div className="p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-default">
                          <h3 className="font-semibold text-gray-900">Number Plate</h3>
                          <p className="mt-1">{car.numberPlate}</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-default">
                          <h3 className="font-semibold text-gray-900">Fuel Type</h3>
                          <p className="mt-1">{car.Fuel}</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-default">
                          <h3 className="font-semibold text-gray-900">Gear</h3>
                          <p className="mt-1">{car.Gear}</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-default">
                          <h3 className="font-semibold text-gray-900">Seller</h3>
                          <p className="mt-1">{car.firstname} {car.lastname}</p>
                        </div>
                        <div className="col-span-2 p-3 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-default">
                          <h3 className="font-semibold text-gray-900">Contact</h3>
                          <p className="mt-1">{car.number}</p>
                        </div>
                      </div>

                      <p className="text-indigo-600 font-extrabold text-xl mt-4 text-right">
                        ₹ {car.Price} <span className="text-sm font-normal">/hr</span>
                      </p>

                      <div className="mt-4 flex justify-end space-x-3">
                        <button
                          onClick={() => handlePurchase(car)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                        >
                          Purchase
                        </button>
                        <button
                          onClick={() => setOpenPopupCarId(null)}
                          className="px-4 py-2 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition"
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
