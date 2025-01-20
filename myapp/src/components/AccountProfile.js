import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import SmallCarCard from "./SmallCarCard";
import { AppContext } from "../Context/AppContext";

function AccountProfile(probs) {
      const {firstname,lastname,email,number} = useContext(AppContext);
      const alldata = probs.alldata;
      // console.log(alldata);
      return (
            <>
                  <form className='w-3/4 m-auto mt-[5rem]'>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                              <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <div type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meet" >{firstname}</div>
                              </div>
                              <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <div type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aghara" >{lastname}</div>
                              </div>
                              <div>
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <div type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01234-56789" >{number}</div>
                              </div>
                              <div class="mb-6">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                    <div type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="meet.5@company.com">{email}</div>
                              </div>
                        </div>
                        

                        <NavLink to='/Home'><button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-[1rem]">Done</button></NavLink>
                  </form>
                  <div className="">
                              {
                                    alldata.map((ele) => (
                                          <SmallCarCard ele={ele} key={ele.Id}></SmallCarCard>
                                    ))
                              }

                        </div>
            </>
      )
}

export default AccountProfile;