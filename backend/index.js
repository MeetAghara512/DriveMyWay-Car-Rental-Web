import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./db/user.js";
import SellCar from "./db/sellcar.js";
import RentedCar from "./db/RentedCar.js"; 

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = "MONGODB_URI";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));


app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, number, password } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.log("Received data:", req.body);
    const newUser = new User({ firstname, lastname, email, number, password });
    const savedUser = await newUser.save();
    res.status(200).json({ message: "Signup successful", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});



app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


app.post("/uploads", async (req, res) => {
  console.log("Request received at /uploads:", req.body);
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
      img, // Cloudinary URL
    });
    console.log("Car object to be saved:", car);
    const savedCar = await car.save();
    res.status(200).json({ message: "Car listed successfully.", car: savedCar });
  } catch (error) {
    res.status(500).json({ message: "Car upload failed", error });
  }
});


app.get("/cars", async (req, res) => {
  try {
    const cars = await SellCar.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
  }
});

app.post("/purchase", async (req, res) => {
  const { carId, buyerEmail } = req.body;

  if (!carId || !buyerEmail) {
    return res.status(400).json({ message: "carId and buyerEmail are required" });
  }

  try {
  
    const carToRent = await SellCar.findById(carId);

    if (!carToRent) {
      return res.status(404).json({ message: "Car not found" });
    }


    const rentedCar = new RentedCar({
      ...carToRent.toObject(),
      buyerEmail,
      _id: undefined // Remove _id to create a new document
    });

    
    await rentedCar.save();

    await SellCar.findByIdAndDelete(carId);

    res.status(200).json({ message: "Purchase successful, car rented", rentedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Purchase failed", error });
  }
});



// Fetch cars provided by user (owner's cars)
app.get("/providedCars", async (req, res) => {
  const { ownerEmail } = req.query;
  if (!ownerEmail) {
    return res.status(400).json({ message: "ownerEmail query param is required" });
  }

  try {
    const cars = await SellCar.find({ email: ownerEmail });
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching provided cars:", error);
    res.status(500).json({ message: "Server error fetching provided cars", error });
  }
});

// Fetch cars rented by user (buyer cars)
app.get("/rentedCars", async (req, res) => {
  const { buyerEmail } = req.query;
  if (!buyerEmail) {
    return res.status(400).json({ message: "buyerEmail query param is required" });
  }

  try {
    const rentedCars = await RentedCar.find({ buyerEmail });
    res.status(200).json(rentedCars);
  } catch (error) {
    console.error("Error fetching rented cars:", error);
    res.status(500).json({ message: "Server error fetching rented cars", error });
  }
});


// Remove a provided car (from SellCar collection)
app.delete("/providedCars/:id", async (req, res) => {
  const carId = req.params.id.trim();
  try {
    const deletedCar = await SellCar.findByIdAndDelete(carId);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car removed from SellCar collection", deletedCar });
  } catch (error) {
    res.status(500).json({ message: "Error deleting provided car", error });
  }
});

// Return a rented car (move from RentedCar to SellCar)
app.post("/returnCar/:id", async (req, res) => {
  const carId = req.params.id;
  try {
    const rentedCar = await RentedCar.findById(carId);
    if (!rentedCar) {
      return res.status(404).json({ message: "Rented car not found" });
    }

    const { _id, buyerEmail, ...sellCarData } = rentedCar.toObject();

    const returnedCar = new SellCar(sellCarData);
    await returnedCar.save();

    await RentedCar.findByIdAndDelete(carId);

    res.status(200).json({ message: "Car returned successfully", returnedCar });
  } catch (error) {
    console.error("Error returning car:", error);
    res.status(500).json({ message: "Failed to return car", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
