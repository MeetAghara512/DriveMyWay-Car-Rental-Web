import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    setFlagLogin,
    setFlagSignUp,
    setFirstName,
    setLastName,
    setNumber,
    setEmail,
    setToken,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.token); 
        localStorage.setItem("token", result.token);  
        setFirstName(result.user.firstname);
        setLastName(result.user.lastname);
        setEmail(result.user.email);
        setNumber(result.user.number);
        setFlagLogin(false);
        setFlagSignUp(false);
        navigate("/");
      } else {
        setErrorMsg(result.message || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMsg("Error connecting to server.");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-20 px-10 py-12 bg-white bg-opacity-80 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Login to Your Account</h2>

      {errorMsg && (
        <p className="text-red-500 text-center mb-4 font-semibold">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <NavLink to="/signup" className="text-blue-600 font-semibold hover:underline">
          Sign Up
        </NavLink>
      </p>
    </div>

  );
}

export default Login;
