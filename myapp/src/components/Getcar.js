import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";

function GetCar() {
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  // Load states when country.isoCode changes
  useEffect(() => {
    if (country?.isoCode) {
      const states = State.getStatesOfCountry(country.isoCode);
      setStateData(states);
      setState(states[0]);
    }
  }, [country.isoCode]);

  // Load cities when state.isoCode changes
  useEffect(() => {
    if (country?.isoCode && state?.isoCode) {
      const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      setCityData(cities);
      setCity(cities[0]);
    }
  }, [country.isoCode, state?.isoCode]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 grid place-items-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-teal-900 mb-6 text-center">
          Choose Your Location
        </h2>
        <div className="flex flex-col gap-6">
          {/* Country Selector */}
          <div>
            <label className="block mb-2 font-semibold text-teal-800">Country:</label>
            <Selector data={countryData} selected={country} setSelected={setCountry} />
          </div>

          {/* State Selector */}
          {state && (
            <div>
              <label className="block mb-2 font-semibold text-teal-800">State:</label>
              <Selector data={stateData} selected={state} setSelected={setState} />
            </div>
          )}

          {/* City Selector */}
          {city && (
            <div>
              <label className="block mb-2 font-semibold text-teal-800">City:</label>
              <Selector data={cityData} selected={city} setSelected={setCity} />
            </div>
          )}
        </div>

        <button className="mt-8 w-full py-3 bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-green-500 hover:to-blue-700 transition duration-300">
          <NavLink to="/RentCarCards" className="block text-center">
            Done
          </NavLink>
        </button>
      </div>
    </section>
  );
}

export default GetCar;
