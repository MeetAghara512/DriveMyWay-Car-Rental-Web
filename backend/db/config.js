import mongoose from 'mongoose';

const mongoURI = "MONGODB_URI_HERE"; 

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));
