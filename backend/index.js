import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";
import SellCar from "./db/sellcar.js";
import fs from "fs";
import { console } from "inspector/promises";
import { model } from "mongoose";
const app = express();

app.use(express.json());

app.use(cors());

app.get("/signup", async (req, res) => {
  let data = await User.find();
  console.log(data);
  res.send(data);
});

app.post("/Signup", async (req, res) => {
  let user = new User(req.body);
  user = await user.save();
  res.send(user);
});

//login-search api
app.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    // Find the user by email and password
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      // If no user found, respond with an error
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // If user found, respond with success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

// -----------------------------------------------
app.post("/addcar", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      number,
      brand,
      model,
      numberPlate,
      Fuel,
      Gear,
      Price,
      img,
    } = req.body;
    // Validate the image path
    if (!img || !fs.existsSync(img)) {
      return res
        .status(400)
        .json({ message: "Invalid or non-existent image path." });
    }

    // Read the image file
    const imgBuffer = fs.readFileSync(img);

    // Create a new SellCar object
    const car = new SellCar({
      firstname,
      lastname,
      email,
      number,
      brand,
      model,
      numberPlate,
      Fuel,
      Gear,
      Price,
      img: {
        data: imgBuffer, // Binary image data
        contentType: "image/png", // Adjust if the file type is different
      },
    });

    // Save the car object to the database
    await car.save();
    res.status(201).json({ message: "Car added successfully.", car });
  } catch (error) {
    console.error("Error in /addcar endpoint:", error);
    res.status(500).json({
      message: "An error occurred while adding the car.",
      error: error.message,
    });
  }
});

/** GET: http://localhost:8080 */
app.post("/uploads", async (req, res) => {
  const {
    fn,
    ln,
    mail,
    phone,
    carBrand,
    carModel,
    carPlate,
    carFuel,
    carGear,
    carPrice,
    img,
  } = req.body;
  console.log("hello");
  const tempuser = new SellCar({
    firstname: fn,
    lastname: ln,
    email: mail,
    number: phone,
    brand: carBrand,
    model: carModel,
    numberPlate: carPlate,
    Fuel: carFuel,
    Gear: carGear,
    Price: carPrice,
    img: img,
  });
  console.log(tempuser);
  tempuser=await tempuser.save();
  
});
app.listen(5000);
