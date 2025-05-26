import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { resetState } = useContext(AppContext);
   const navigate = useNavigate();

  const handleLogout = () => {
    resetState();
    navigate('/login'); 
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Logout</h1>
        <p className="mb-6 text-gray-600">
          Are you sure you want to logout?
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
