import React from 'react';
import { NavLink } from 'react-router-dom';
const brands = [
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Toyota_Logo.svg" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg" },
  { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
  { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg" },
  { name: "Jaguar", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Jaguar_2024.svg" },
  { name: "Land Rover", logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/LandRover.svg" },
  { name: "Tata Motors", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Mahindra_Rise_New_Logo.svg" },
  { name: "Suzuki", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Suzuki_logo_2025_%28vertical%29.svg" },
  { name: "MG Motor", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/MG_Motor_2021_logo.svg" },
];

function LogoTicker() {
  return (
     <div className="w-full overflow-hidden bg-white bg-opacity-70 backdrop-blur-md py-3 mt-20 ">
      {/* Optional fade effect at edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

      <div className="flex w-max animate-marquee space-x-12">
        {brands.concat(brands).map((brand, idx) => (
          <img
            key={idx}
            src={brand.logo}
            alt={brand.name}
            title={brand.name}
            className="h-16 object-contain select-none"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center mt-10">
     <h1 className="text-white text-5xl font-extrabold mb-12 select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] m-auto text-center">
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
        <LogoTicker />
    </div>
  );
}

export default Home;
