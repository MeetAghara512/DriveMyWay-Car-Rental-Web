import React, { useState } from "react";
import axios from "axios";



function SellCarUserInput() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    brand: "",
    model: "",
    numberPlate: "",
    Fuel: "",
    Gear: "",
    Price: ""
  });
  const [loading, setLoading] = useState(false);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setLoading(true);

    const data = new FormData();

    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
    data.append("file", file);
    data.append("upload_preset", uploadPreset); // your Cloudinary upload preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const uploadData = await res.json();

      if (uploadData.secure_url) {
        setImageUrl(uploadData.secure_url);
      } else {
        alert("Image upload failed. Please try again.");
        setImageUrl("");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Check console for details.");
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", form);
    console.log("Image URL:", imageUrl);
    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const dataToSend = { ...form, img: imageUrl };
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/uploads`, dataToSend);
      console.log("Response status:", res.status);
      console.log("Response data:", res.data);

      if (res.status === 200) {
        alert("Car data submitted successfully!");
        // Reset form and image
        setForm({
          firstname: "",
          lastname: "",
          email: "",
          number: "",
          brand: "",
          model: "",
          numberPlate: "",
          Fuel: "",
          Gear: "",
          Price: ""
        });
        setSelectedImage(null);
        setImageUrl("");
      } else {
        alert("Failed to submit data. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting data", err);
      alert("Error submitting data. See console for details.");
    } finally {
      setLoading(false); // Ensure loading is reset even on error
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen  py-16 px-4 sm:px-6 lg:px-8">
      {/* Outer container for the form, matching Signup's central box */}
      <div className="max-w-lg w-full mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 lg:p-12 bg-opacity-80">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">List Your Car for Sale</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* First Name & Last Name (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstname"
              value={form.firstname}
              placeholder="First Name"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="lastname"
              value={form.lastname}
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            value={form.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone Number */}
          <input
            name="number"
            value={form.number}
            type="tel"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Car Brand & Model (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="brand"
              value={form.brand}
              placeholder="Car Brand (e.g., Toyota)"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="model"
              value={form.model}
              placeholder="Car Model (e.g., Camry)"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number Plate */}
          <input
            name="numberPlate"
            value={form.numberPlate}
            placeholder="Number Plate (e.g., ABC-123)"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Fuel & Gear Type (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="Fuel"
              value={form.Fuel}
              placeholder="Fuel Type (e.g., Petrol, Diesel)"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="Gear"
              value={form.Gear}
              placeholder="Gear Type (e.g., Manual, Automatic)"
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <input
            name="Price"
            value={form.Price}
            type="number"
            placeholder="Asking Price (e.g., 15000)"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Upload Button */}
          <label className="cursor-pointer inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300">
            {loading && selectedImage ? "Uploading..." : "Choose Car Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* Image Upload Status & Preview */}
          {selectedImage && (
            <p className="mt-2 text-gray-600 text-sm text-center">Selected: {selectedImage.name}</p>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Car Preview"
              className="mt-4 w-full max-w-xs h-48 object-cover rounded-xl shadow-lg mx-auto"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !imageUrl}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl ${loading || !imageUrl
                ? "opacity-50 cursor-not-allowed"
                : ""
              }`}
          >
            Submit Car Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellCarUserInput;
