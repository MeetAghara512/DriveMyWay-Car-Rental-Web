import React from "react";

// Brand data with logos
const brands = [
  {
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Toyota_Logo.svg",
  },
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    name: "Mercedes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
  },
  {
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
  },
  {
    name: "Honda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg",
  },
  {
    name: "Hyundai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg",
  },
  {
    name: "Kia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg",
  },
  {
    name: "Jaguar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Jaguar_2024.svg",
  },
  {
    name: "Land Rover",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/LandRover.svg",
  },
  {
    name: "Tata Motors",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg",
  },
  {
    name: "Mahindra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/Mahindra_Rise_New_Logo.svg",
  },
  {
    name: "Suzuki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Suzuki_logo_2025_%28vertical%29.svg",
  },
  {
    name: "MG Motor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/MG_Motor_2021_logo.svg",
  },
];

function About() {
  return (
    <div className="flex items-center justify-center px-3 py-3">
      <div className=" w-full bg-white bg-opacity-10 rounded-3xl shadow-xl border border-indigo-200 px-12 py-6">
        <h1 className="text-5xl font-extrabold text-gray-200 mb-14 text-center tracking-wide select-none">
          About Us
        </h1>

        <section
          className="mb-8 p-8 rounded-2xl shadow-lg bg-white border border-indigo-200 bg-opacity-85
                     hover:shadow-xl transition-shadow duration-500 ease-in-out cursor-default relative overflow-hidden"
        >
          {/* Decorative circle */}
          <svg
            className="absolute -top-16 -right-16 w-40 h-40 text-indigo-100 opacity-30"
            fill="currentColor"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>

          <h2 className="text-3xl font-semibold text-indigo-700  mb-6 select-none tracking-wide flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m4 4h-1v-6h-1m4 6v-2a4 4 0 10-8 0v2"
              />
            </svg>
            <span>Our Fleet</span>
          </h2>
          <p className="text-gray-700  leading-loose max-w-3xl font-light">
            Our premium fleet includes luxury and economy cars, ensuring there's
            something for everyone. Whether you want comfort, style, or
            efficiency, we have the perfect vehicle for your journey.
          </p>
        </section>

        <div className="flex flex-col md:flex-row md:space-x-12">
          <section
            className="mb-12 md:mb-0 md:flex-1 p-8 rounded-2xl shadow-lg bg-white border border-indigo-200 bg-opacity-85
                       hover:shadow-xl transition-shadow duration-500 ease-in-out cursor-default relative overflow-hidden"
          >
            <svg
              className="absolute -top-12 -left-12 w-32 h-32 text-indigo-100 opacity-30"
              fill="currentColor"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 select-none tracking-wide flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21V3m7 18v-6m0-6v-2a4 4 0 00-8 0v2"
                />
              </svg>
              <span>Our Mission</span>
            </h2>
            <p className="text-gray-700 leading-loose max-w-md font-light">
              We are <span className="font-semibold text-indigo-600">dedicated</span> to
              providing you with the best vehicles and customer support to make
              your journey unforgettable.
            </p>
          </section>

          <section
            className="md:flex-1 p-8 rounded-2xl shadow-lg bg-white border border-indigo-200 bg-opacity-85
                       hover:shadow-xl transition-shadow duration-500 ease-in-out cursor-default relative overflow-hidden"
          >
            <svg
              className="absolute -bottom-12 -right-12 w-32 h-32 text-indigo-100 opacity-30"
              fill="currentColor"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 select-none tracking-wide flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Why Choose Us?</span>
            </h2>
            <p className="text-gray-700 leading-loose max-w-md font-light">
              Join us to experience <span className="font-semibold text-indigo-600">convenience, comfort, and
              top-notch service</span>. Your satisfaction is our highest priority.
            </p>
          </section>
        </div>

        {/* Our Brands Section */}
        <section
          className="mt-16 p-8 rounded-2xl shadow-lg bg-white border border-indigo-200 bg-opacity-85
                     hover:shadow-xl transition-shadow duration-500 ease-in-out cursor-default"
        >
          <h2 className="text-3xl font-semibold text-indigo-700 mb-10 text-center select-none tracking-wide">
            Our Trusted Brands
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex flex-col items-center space-y-3 w-28"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-20 h-20 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  loading="lazy"
                />
                <span className="text-gray-800 font-medium select-none text-lg">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <button
            className="px-10 py-3 bg-indigo-600 text-white rounded-full font-semibold
                       hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
          >
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
}

export default About;
