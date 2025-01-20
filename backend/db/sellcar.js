import {mongoose} from "mongoose"

const sellCarSchema=new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String,
  number:Number,
  brand:String,
  model:String,
  numberPlate:String,
  Fuel:String,
  Gear:String,
  Price:Number,
  img:String
});

const SellCar = mongoose.model("sellcar",sellCarSchema);

export default SellCar;