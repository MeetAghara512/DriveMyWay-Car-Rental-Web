import React from 'react'
import { NavLink } from 'react-router-dom';
import { City, Country, State } from "country-state-city";
import Selector from './Selector';
import { useEffect } from 'react';
import { useState } from 'react';

function GetCar() {
      let countryData = Country.getAllCountries();
      const [stateData, setStateData] = useState();
      const [cityData, setCityData] = useState();

      const [country, setCountry] = useState(countryData[0]);
      const [state, setState] = useState();
      const [city, setCity] = useState();

      useEffect(() => {
            setStateData(State.getStatesOfCountry(country?.isoCode));
      }, [country]);

      useEffect(() => {
            setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
      }, [state]);

      useEffect(() => {
            stateData && setState(stateData[0]);
      }, [stateData]);

      useEffect(() => {
            cityData && setCity(cityData[0]);
      }, [cityData]);

      return (
            <>
                  <section className='selector-area'>

                        <section className="min-h-screen bg-gray-100 grid place-items-center">
                              <div>
                                    <h2 className="text-2xl font-bold text-teal-900">
                                          Country, State and City Selectors
                                    </h2>
                                    <br />
                                    <div className="flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8">
                                          <div>
                                                <p className="text-teal-800 font-semibold">Country :</p>
                                                <Selector
                                                      data={countryData}
                                                      selected={country}
                                                      setSelected={setCountry}
                                                />
                                          </div>
                                          {state && (
                                                <div>
                                                      <p className="text-teal-800 font-semibold">State :</p>
                                                      <Selector
                                                            data={stateData}
                                                            selected={state}
                                                            setSelected={setState}
                                                      />
                                                </div>
                                          )}
                                          {city && (
                                                <div>
                                                      <p className="text-teal-800 font-semibold">City :</p>
                                                      <Selector data={cityData} selected={city} setSelected={setCity} />
                                                </div>
                                          )}
                                    </div>
                                    <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 m-[5%]'><NavLink to='/RentCarCards' className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>Done</NavLink></button>
                              </div>
                        </section>
                  </section>
            </>
      );
}

export default GetCar;