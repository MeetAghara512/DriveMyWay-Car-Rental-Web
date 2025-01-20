import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import axios from "axios";

const url = "";

function SellCarUserInput(props) {
  const [postData, setPostData] = useState({
    fn: "",
    ln: "",
    mail: "",
    phone: "",
    carBrand: "",
    carModel: "",
    carFuel: "",
    carPlate: "",
    carPrice: "",
    carGear: "",
    img: "",
  });

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("data:", postData);
    let result = await fetch("http://localhost:5000/uploads", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    console.log(result);
  };

  return (
    <>
      <form className="w-[50rem] m-auto" onSubmit={handlesubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Meet"
              onChange={(e) => {
                setPostData({
                  ...postData,
                  fn: e.target.value,
                  img: props.postImage,
                });
              }}
              value={postData.fn}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Aghara"
              onChange={(e) => setPostData({ ...postData, ln: e.target.value })}
              value={postData.ln}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="01234-56789"
              onChange={(e) =>
                setPostData({ ...postData, phone: e.target.value })
              }
              value={postData.phone}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="meet.5@company.com"
            onChange={(e) => setPostData({ ...postData, mail: e.target.value })}
            value={postData.mail}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-3">
          <div>
            <label
              htmlFor="carBrand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Car Brand
            </label>
            <input
              type="text"
              id="carBrand"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Toyota"
              onChange={(e) =>
                setPostData({ ...postData, carBrand: e.target.value })
              }
              value={postData.carBrand}
            />
          </div>
          <div>
            <label
              htmlFor="carModel"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Camry"
              onChange={(e) =>
                setPostData({ ...postData, carModel: e.target.value })
              }
              value={postData.carModel}
            />
          </div>
          <div>
            <label
              htmlFor="carPlate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Car Number Plate
            </label>
            <input
              type="text"
              id="carPlate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="XX-00-X-0000"
              onChange={(e) =>
                setPostData({ ...postData, carPlate: e.target.value })
              }
              value={postData.carPlate}
            />
          </div>
        </div>
        <div className="relative h-10 w-72 min-w-[200px] mt-[35px] mb-[25px]">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) =>
              setPostData({ ...postData, carFuel: e.target.value })
            }
            value={postData.carFuel}
          >
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <label className="peer-placeholder-shown:text-sm peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
            Select Car Fuel
          </label>
        </div>
        <div className="relative h-10 w-72 min-w-[200px] mt-[35px] mb-[25px]">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) =>
              setPostData({ ...postData, carGear: e.target.value })
            }
            value={postData.carGear}
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <label className="peer-placeholder-shown:text-sm peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
            Select Car Gear
          </label>
        </div>
        <div className="relative h-10 w-72 min-w-[200px] mt-[35px] mb-[25px]">
          <input
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setPostData({ ...postData, carPrice: e.target.value })
            }
            value={postData.carPrice}
            className="w-full rounded-md border-2 p-2"
          />
        </div>

        <button
          type="submit"
          className="block rounded-md bg-[#1e40af] py-2 px-4 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default SellCarUserInput;
