import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate  = useNavigate();
  const {
    firstname, setFirstName,
    lastname, setLastName,
    email, setEmail,
    number, setNumber,
    password, setPassword,
  } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname": setFirstName(value); break;
      case "lastname": setLastName(value); break;
      case "email": setEmail(value); break;
      case "number": setNumber(value); break;
      case "password": setPassword(value); break;
      default: break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { firstname, lastname, email, number, password };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate ("/login");
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      alert("Signup failed: Network error");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-20 px-10 py-12  bg-white bg-opacity-80 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstname"
            value={firstname}
            placeholder="First Name"
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lastname"
            value={lastname}
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="number"
          value={number}
          type="tel"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
