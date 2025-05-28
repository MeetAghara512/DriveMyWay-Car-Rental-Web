import mongoose from 'mongoose';

const mongoURI = "";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));
