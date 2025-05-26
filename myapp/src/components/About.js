import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-gray-200 px-12 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide select-none">
          About Us
        </h1>

        <section
          className="mb-10 p-8 border border-gray-200 rounded-2xl shadow-md bg-white
                     hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-default"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 select-none">
            Our Fleet
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto text-center">
            Our premium fleet includes luxury and economy cars, ensuring there's something for everyone.
          </p>

        </section>

        <div className="flex flex-col md:flex-row md:space-x-12">
          <section
            className="mb-10 md:mb-0 md:flex-1 p-8 border border-gray-200 rounded-2xl shadow-md bg-white
                       hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-default"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 select-none">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base leading-relaxed max-w-md">
              We are dedicated to providing you with the best vehicles and customer support to make your journey unforgettable.
            </p>
          </section>

          <section
            className="md:flex-1 p-8 border border-gray-200 rounded-2xl shadow-md bg-white
                       hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-default"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 select-none">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 text-base leading-relaxed max-w-md">
              Join us to experience convenience, comfort, and top-notch service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
