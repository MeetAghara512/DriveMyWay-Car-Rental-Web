import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import SmallCarCard from "./SmallCarCard";

const AccountProfile = () => {
  const { firstname, lastname, number, email } = useContext(AppContext);
  const [providedCars, setProvidedCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    if (!email) return;

    const fetchProvidedCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/providedCars?ownerEmail=${encodeURIComponent(email)}`
        );
        const data = await response.json();
        setProvidedCars(data);
      } catch (error) {
        console.error("Error fetching provided cars:", error);
      }
    };

    const fetchRentedCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/rentedCars?buyerEmail=${encodeURIComponent(email)}`
        );
        const data = await response.json();
        setRentedCars(data);
      } catch (error) {
        console.error("Error fetching rented cars:", error);
      }
    };

    fetchProvidedCars();
    fetchRentedCars();
  }, [email]);

  const handleRemoveProvidedCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:5000/providedCars/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete provided car");
      }
      setProvidedCars((prev) => prev.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error removing provided car:", error);
      alert("Failed to remove the car.");
    }
  };

  const handleReturnRentedCar = async (car) => {
    try {
      const response = await fetch(`http://localhost:5000/returnCar/${car._id}`, {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to return car");
      }
      setRentedCars((prev) => prev.filter((c) => c._id !== car._id));
      alert("Car returned successfully!");
    } catch (error) {
      console.error("Error returning rented car:", error);
      alert("Failed to return the car.");
    }
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Account Details */}
      <section className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-wide">
          Account Details
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <div className="flex items-center">
            <span className="w-32 font-semibold text-gray-800">Name:</span>
            <span>{firstname} {lastname}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-semibold text-gray-800">Email:</span>
            <span>{email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-semibold text-gray-800">Phone:</span>
            <span>{number || "N/A"}</span>
          </div>
        </div>
      </section>

      {/* Provided Cars */}
      <section className="mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide text-center md:text-left">
          Provided Cars
        </h2>
        {providedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {providedCars.map((car) => (
              <div key={car._id} className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden">
                <SmallCarCard data={car} cardSize="large" />
                <button
                  onClick={() => handleRemoveProvidedCar(car._id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
                  aria-label={`Remove provided car ${car._id}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic text-lg">No provided cars found.</p>
        )}
      </section>

      {/* Rented Cars */}
      <section>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide text-center md:text-left">
          Rented Cars
        </h2>
        {rentedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rentedCars.map((car) => (
              <div key={car._id} className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden">
                <SmallCarCard data={car} cardSize="large" />
                <button
                  onClick={() => handleReturnRentedCar(car)}
                  className="absolute top-3 right-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition"
                  aria-label={`Return rented car ${car._id}`}
                >
                  Return
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic text-lg">No rented cars found.</p>
        )}
      </section>
    </div>
  );
};

export default AccountProfile;
