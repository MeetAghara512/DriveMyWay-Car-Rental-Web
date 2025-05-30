import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./db/user.js";
import SellCar from "./db/sellcar.js";
import RentedCar from "./db/RentedCar.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();
import  sendMail from "./utils/sendMail.js"; 


const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/car-rental";

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



// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const { password: pwd, ...userWithoutPassword } = user.toObject();

//     res.status(200).json({ user: userWithoutPassword });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

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

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    res.status(200).json({
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        number: user.number,
      },
      message: "Login successful",
    });
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

const getCarPurchaseEmail = ({ accountName, carName, purchaseDate, appUrl }) => `
  <div style="max-width:600px;margin:0 auto;padding:40px;background-color:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div style="background:#ffffff;border-radius:10px;padding:30px 40px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <h1 style="color:#333;font-size:24px;">Hi ${accountName || 'User'},</h1>
      <p style="color:#555;font-size:16px;line-height:1.6;">
        Thank you for purchasing <strong>${carName}</strong> on <strong>${purchaseDate}</strong>!
        We’re excited to be part of your journey.
      </p>
      <p style="color:#555;font-size:16px;">
        You can view your purchase here:
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="https://drivemyway-web.onrender.com/" style="display:inline-block;padding:12px 24px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:5px;font-size:16px;">
          Visit Your App
        </a>
      </div>
      <p style="font-size:14px;color:#999;text-align:center;">
        This is an automated message. Please do not reply.
      </p>
    </div>
  </div>
`;

app.post("/purchase", async (req, res) => {
  const { carId, buyerEmail, firstname, lastname, email, number } = req.body;

  if (!carId || !buyerEmail) {
    return res.status(400).json({ message: "carId and buyerEmail are required" });
  }

  try {
    const carToRent = await SellCar.findById(carId);

    if (!carToRent) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Prepare rented car data
    const rentedCarData = {
      firstname: firstname || carToRent.firstname || '',  // fallback empty string if not provided
      lastname: lastname || carToRent.lastname || '',
      email: email || carToRent.email || '',
      number: number || carToRent.number || '',
      brand: carToRent.brand,
      model: carToRent.model,
      numberPlate: carToRent.numberPlate,
      Fuel: carToRent.Fuel,
      Gear: carToRent.Gear,
      Price: carToRent.Price,
      img: carToRent.img,
      buyerEmail,
    };

    const rentedCar = new RentedCar(rentedCarData);
    await rentedCar.save();

    await SellCar.findByIdAndDelete(carId);

    // Generate email content
    const subject = `Thank you for purchasing ${carToRent.brand} ${carToRent.model}!`;
    const htmlContent = getCarPurchaseEmail({
      accountName: buyerEmail.split('@')[0],
      carName: `${carToRent.brand} ${carToRent.model}`,
      purchaseDate: new Date().toLocaleDateString(),
      appUrl: process.env.APP_URL || 'https://your-app-url.com'
    });

    // Send confirmation email
    await sendMail(buyerEmail, subject, htmlContent);

    res.status(200).json({ message: "Purchase successful, confirmation email sent", rentedCar });
  } catch (error) {
    console.error("Purchase failed:", error);
    res.status(500).json({ message: "Purchase failed", error });
  }
});








// app.post("/purchase", async (req, res) => {
//   const { carId, buyerEmail } = req.body;

//   if (!carId || !buyerEmail) {
//     return res.status(400).json({ message: "carId and buyerEmail are required" });
//   }

//   try {

//     const carToRent = await SellCar.findById(carId);

//     if (!carToRent) {
//       return res.status(404).json({ message: "Car not found" });
//     }


//     const rentedCar = new RentedCar({
//       ...carToRent.toObject(),
//       buyerEmail,
//       _id: undefined // Remove _id to create a new document
//     });


//     await rentedCar.save();

//     await SellCar.findByIdAndDelete(carId);

//     res.status(200).json({ message: "Purchase successful, car rented", rentedCar });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Purchase failed", error });
//   }
// });



// Fetch cars provided by user (owner's cars)
// app.get("/providedCars", async (req, res) => {
//   const { ownerEmail } = req.query;
//   if (!ownerEmail) {
//     return res.status(400).json({ message: "ownerEmail query param is required" });
//   }

//   try {
//     const cars = await SellCar.find({ email: ownerEmail });
//     res.status(200).json(cars);
//   } catch (error) {
//     console.error("Error fetching provided cars:", error);
//     res.status(500).json({ message: "Server error fetching provided cars", error });
//   }
// });
app.get("/providedCars", authenticateToken, async (req, res) => {
  const { email } = req.user;
  console.log("Decoded user from token:", req.user);

  try {
    // const cars = await SellCar.find({ email });
    // console.log("Provided cars for user:", cars);
    const allCars = await SellCar.find({});
    console.log("All cars:", allCars);
    console.log("Looking for cars with email:", email);
    const cars = await SellCar.find({ email });
    console.log("Matched cars:", cars);

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching provided cars", error });
  }
});


// Fetch cars rented by user (buyer cars)
// app.get("/rentedCars", async (req, res) => {
//   const { buyerEmail } = req.query;
//   if (!buyerEmail) {
//     return res.status(400).json({ message: "buyerEmail query param is required" });
//   }

//   try {
//     const rentedCars = await RentedCar.find({ buyerEmail });
//     res.status(200).json(rentedCars);
//   } catch (error) {
//     console.error("Error fetching rented cars:", error);
//     res.status(500).json({ message: "Server error fetching rented cars", error });
//   }
// });
app.get("/rentedCars", authenticateToken, async (req, res) => {
  const { email } = req.user;
  try {
    const rentedCars = await RentedCar.find({ buyerEmail: email });
    res.status(200).json(rentedCars);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching rented cars", error });
  }
});



// // Remove a provided car (from SellCar collection)
// app.delete("/providedCars/:id", async (req, res) => {
//   const carId = req.params.id.trim();
//   try {
//     const deletedCar = await SellCar.findByIdAndDelete(carId);
//     if (!deletedCar) {
//       return res.status(404).json({ message: "Car not found" });
//     }
//     res.status(200).json({ message: "Car removed from SellCar collection", deletedCar });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting provided car", error });
//   }
// });

// // Return a rented car (move from RentedCar to SellCar)
// app.post("/returnCar/:id", async (req, res) => {
//   const carId = req.params.id;
//   try {
//     const rentedCar = await RentedCar.findById(carId);
//     if (!rentedCar) {
//       return res.status(404).json({ message: "Rented car not found" });
//     }

//     const { _id, buyerEmail, ...sellCarData } = rentedCar.toObject();

//     const returnedCar = new SellCar(sellCarData);
//     await returnedCar.save();

//     await RentedCar.findByIdAndDelete(carId);

//     res.status(200).json({ message: "Car returned successfully", returnedCar });
//   } catch (error) {
//     console.error("Error returning car:", error);
//     res.status(500).json({ message: "Failed to return car", error });
//   }
// });


app.delete("/providedCars/:id", authenticateToken, async (req, res) => {
  const carId = req.params.id.trim();
  const userEmail = req.user.email;

  try {
    // Ensure the car belongs to this user (email match)
    const car = await SellCar.findOne({ _id: carId, email: userEmail });
    if (!car) {
      return res.status(404).json({ message: "Car not found or unauthorized" });
    }

    await SellCar.findByIdAndDelete(carId);
    res.status(200).json({ message: "Car removed from SellCar collection" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting provided car", error });
  }
});

// Return a rented car (move from RentedCar to SellCar, only by correct user)
app.post("/returnCar/:id", authenticateToken, async (req, res) => {
  const carId = req.params.id;
  const userEmail = req.user.email;

  try {
    // Find rented car owned by this user
    const rentedCar = await RentedCar.findOne({ _id: carId, buyerEmail: userEmail });
    if (!rentedCar) {
      return res.status(404).json({ message: "Rented car not found or unauthorized" });
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


app.get("/notification", authenticateToken, async (req, res) => {
  try {
    // Fetch all rented cars
    const rentedCars = await RentedCar.find();

    // Pick only needed fields to send back
    const filteredCars = rentedCars.map(car => ({
      _id: car._id,
      brand: car.brand,
      model: car.model,
      Price: car.Price,
      buyerEmail: car.buyerEmail,
      ownerEmail: car.email, 
    }));
    console.log("Filtered rented cars:", filteredCars);
    res.status(200).json(filteredCars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rented cars", error });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
