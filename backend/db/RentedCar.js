import mongoose from "mongoose";

const RentedCarSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  number: String,
  brand: String,
  model: String,
  numberPlate: String,
  Fuel: String,
  Gear: String,
  Price: String,
  img: String,
  buyerEmail: String, // <-- Extra field
}, { collection: "Rented_car" });

const RentedCar = mongoose.model("Rented_car", RentedCarSchema);

export default RentedCar;
