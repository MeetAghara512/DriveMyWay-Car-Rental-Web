import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-6 py-20">
      <h1 className="text-gray-800 text-5xl font-extrabold mb-12 select-none">
        Your Trusted Car Marketplace
      </h1>

      <div className="flex flex-wrap justify-center gap-12 max-w-6xl">
        <NavLink to="/Getcar" className="group perspective">
          <div className="relative w-72 h-80 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-700 shadow-lg
                          transform transition-transform duration-500 ease-in-out
                          hover:rotate-y-12 hover:scale-105 cursor-pointer flex flex-col items-center justify-center text-center p-8">
            <p className="text-4xl font-extrabold text-white italic tracking-wide drop-shadow-md select-none">
              Purchase
            </p>
            <p className="text-4xl font-extrabold text-white italic tracking-wide drop-shadow-md select-none mb-6">
              Your Dream Car
            </p>
            <p className="text-lg text-indigo-200 max-w-xs leading-relaxed select-none">
              Explore over <span className="font-semibold text-white">10,000+</span> cars from trusted sellers nationwide.
            </p>
          </div>
        </NavLink>

        <NavLink to="/SellCar" className="group perspective">
          <div className="relative w-72 h-80 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-700 shadow-lg
                          transform transition-transform duration-500 ease-in-out
                          hover:-rotate-y-12 hover:scale-105 cursor-pointer flex flex-col items-center justify-center text-center p-8">
            <p className="text-4xl font-extrabold text-white italic tracking-wide drop-shadow-md select-none">
              Sell
            </p>
            <p className="text-4xl font-extrabold text-white italic tracking-wide drop-shadow-md select-none mb-6">
              Your Car Fast
            </p>
            <p className="text-lg text-pink-200 max-w-xs leading-relaxed select-none">
              Join over <span className="font-semibold text-white">5,000+</span> happy sellers who sold their cars in under 7 days.
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
