import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import GetCar from "./components/GetCar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RentCarCards from "./components/RentCarCards";
import AccountProfile from "./components/AccountProfile";
import SellCarUserInput from "./components/SellCarUserInput";
import Logout from "./components/Logout";
import About from "./components/About";

function App() {
  return (
    <div className="App min-h-screen w-screen bg-gray-200 flex flex-col">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Getcar" element={<GetCar />}></Route>
        <Route path="/sellcar" element={<SellCarUserInput />}></Route>
        <Route path="/Logout" element={<Logout />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route
          path="/RentCarCards"
          element={<RentCarCards/>}
        ></Route>
        <Route
          path="/AccountProfile"
          element={<AccountProfile  />}
        ></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
