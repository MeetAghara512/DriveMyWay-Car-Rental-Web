import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { resetState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetState();
    localStorage.removeItem('Email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('Number');
    navigate('/login'); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-indigo-200">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800">Ready to Log Out?</h1>
        <p className="mb-6 text-gray-700 text-lg">
          We hope you had a great experience. <br />
          <span className="italic text-indigo-600 font-medium">
            "Thank you for visiting!"
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
