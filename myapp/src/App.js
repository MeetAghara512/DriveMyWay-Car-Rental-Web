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
import SuccessPage from "./components/SuccessPage";
import { useEffect, useContext } from "react";
import { AppContext } from "./Context/AppContext";


function App() {
  const {
      setFlagLogin,
      setFlagSignUp,
      setFirstName,
      setLastName,
      setNumber,
      setEmail,
    } = useContext(AppContext);
  useEffect(()=>{
    const FN=sessionStorage.getItem("firstName");
    const LN=sessionStorage.getItem("lastName");
    const EM=sessionStorage.getItem("Email");
    const NU=sessionStorage.getItem("Number");
    if(EM!== null){
      setFlagLogin(false);
      setFlagSignUp(false);
      setFirstName(FN||"");
      setLastName(LN||"");
      setEmail(EM||"");
      setNumber(NU||"");
    }
  },[setFirstName,setLastName,setEmail,setFlagLogin,setNumber,setFlagSignUp]);
  return (
    <div className="App min-h-screen w-screen bg-cover bg-center bg-no-repeat overflow-x-hidden" >
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
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/RentCarCards"
          element={<RentCarCards/>}
        ></Route>
        <Route
          path="/AccountProfile"
          element={<AccountProfile  />}
        ></Route>
      </Routes>
      <ToastContainer   position="top-right"
        style={{ top: "5rem", zIndex: 9999 }}
        className="mt-20" ></ToastContainer>
    </div>
  );
}

export default App;
