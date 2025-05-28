import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import SmallCarCard from "./SmallCarCard";
import { Mail, Phone, User } from "lucide-react";

const AccountProfile = () => {
  const { firstname, lastname, number, email } = useContext(AppContext);
  const [providedCars, setProvidedCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notifError, setNotifError] = useState("");

  useEffect(() => {
    if (!email) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }

    const fetchProvidedCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/providedCars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch provided cars");
        const data = await response.json();
        setProvidedCars(data);
      } catch (error) {
        console.error("Error fetching provided cars:", error);
      }
    };

    const fetchRentedCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/rentedCars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch rented cars");
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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to remove a car");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/providedCars/${carId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete provided car");
      }
      setProvidedCars((prev) => prev.filter((car) => car._id !== carId));
      alert("Car removed successfully");
    } catch (error) {
      console.error("Error removing provided car:", error);
      alert("Failed to remove the car.");
    }
  };

  const handleReturnRentedCar = async (car) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to return a car");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/returnCar/${car._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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

  // Notification icon click handler
  const handleToggleNotifications = async () => {
    if (showNotifications) {
      setShowNotifications(false);
      return;
    }

    setLoadingNotifications(true);
    setNotifError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const response = await fetch("http://localhost:5000/notification", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch notifications");
      let data = await response.json();

      // Filter notifications related to current user by owner email (adjust if you have ownerId)
      data = data.filter(notif => notif.ownerEmail === email);
      console.log("notification:", data);
      setNotifications(data);
      setShowNotifications(true);
    } catch (error) {
      setNotifError(error.message);
      setShowNotifications(true);
    } finally {
      setLoadingNotifications(false);
    }
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto relative">
      {/* Notification Icon */}
      <div
        className="fixed top-30 right-6 cursor-pointer z-50"
        onClick={handleToggleNotifications}
        aria-label="Toggle notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-700 hover:text-indigo-600 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <div className="fixed top-30 right-6 w-80 max-h-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-y-auto z-50 animate-fade-in" >
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-500 hover:text-red-500 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-4 text-sm text-gray-700">
            {loadingNotifications && (
              <p className="text-center text-gray-500">Loading...</p>
            )}
            {notifError && (
              <p className="text-center text-red-600 font-semibold">{notifError}</p>
            )}
            {!loadingNotifications && !notifError && notifications.length === 0 && (
              <p className="text-center text-gray-400 italic">No notifications</p>
            )}
            {!loadingNotifications &&
              notifications.map((notif, index) => (
                <div
                  key={notif._id || index}
                  className="bg-indigo-100 hover:bg-indigo-200 transition-all duration-200 text-indigo-900 p-4 rounded-lg shadow-md border border-indigo-200"
                >
                  <p className="font-semibold text-base">
                    🚗 {notif.brand} {notif.model}
                  </p>
                  <p className="text-sm mt-1">💰 Price: <span className="font-medium">{notif.Price}</span></p>
                  <p className="text-sm">📧 Buyer: <span className="text-indigo-800">{notif.buyerEmail}</span></p>
                </div>
              ))}
          </div>
        </div>

      )}

      {/* Account Details */}
      <section className="mb-16 p-10   rounded-3xl shadow-2xl border border-white/40 bg-white max-w-3xl mx-auto transition-transform duration-300 hover:scale-[1.01] bg-opacity-80">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">✨ Account Details</h2>
        <div className="space-y-6 text-gray-800 text-lg">
          <div className="flex items-center space-x-4">
            <User className="text-purple-600 w-6 h-6" />
            <span className="font-medium w-32">Name:</span>
            <span className="font-semibold">{firstname} {lastname}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-blue-600 w-6 h-6" />
            <span className="font-medium w-32">Email:</span>
            <span className="font-semibold">{email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-green-600 w-6 h-6" />
            <span className="font-medium w-32">Phone:</span>
            <span className="font-semibold">{number || "N/A"}</span>
          </div>
        </div>
      </section>

      {/* Provided Cars */}
      <section className="mb-20 bg-white bg-opacity-80 from-gray-50 via-white to-gray-50 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide text-center md:text-left">
          Provided Cars
        </h2>
        {providedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {providedCars.map((car) => (
              <div
                key={car._id}
                className="relative  hover:shadow-2xl transition-shadow overflow-hidden"
              >
                <SmallCarCard data={car} cardSize="large" />
                <button
                  onClick={() => handleRemoveProvidedCar(car._id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition"
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
      <section className="mb-20 bg-white bg-opacity-80 from-gray-50 via-white to-gray-50 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide text-center md:text-left">
          Rented Cars
        </h2>
        {rentedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rentedCars.map((car) => (
              <div
                key={car._id}
                className="relative rounded  hover:shadow-2xl transition-shadow  overflow-hidden"
              >
                <SmallCarCard data={car} cardSize="large" />
                <button
                  onClick={() => handleReturnRentedCar(car)}
                  className="absolute top-3 right-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition"
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
