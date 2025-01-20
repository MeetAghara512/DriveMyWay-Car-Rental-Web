import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  number: Number,
  password: String,
});
const User = mongoose.model("users", userSchema);

export default User;
