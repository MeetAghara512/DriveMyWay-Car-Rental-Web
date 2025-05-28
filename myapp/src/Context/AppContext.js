import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
      const [firstname, setFirstName] = useState("");
      const [lastname, setLastName] = useState("");
      const [number, setNumber] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [flagSignUp, setFlagSignUp] = useState(true);
      const [token, setToken] = useState("");

      const [flagLogin, setFlagLogin] = useState(true);

      const resetState = () => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setNumber("");
            setPassword("");
            setFlagSignUp(true);
            setFlagLogin(true);
            setToken("");
      };


      const value = {
            firstname,
            setFirstName,
            lastname,
            setLastName,
            number,
            setNumber,
            email,
            setEmail,
            password,
            setPassword,
            flagSignUp,
            setFlagSignUp,
            flagLogin,
            setFlagLogin,
            token,         
            setToken, 
            resetState
      };

      return (
            <AppContext.Provider value={value}>
                  {children}
            </AppContext.Provider>
      );
}

export default AppContextProvider;