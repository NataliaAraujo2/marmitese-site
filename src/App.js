//react
import { useEffect, useState } from "react";
//css
import "./App.css";
//routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//pages
import Home from "./pages/HOME/Home.js";
import Register from "./pages/REGISTER/Register";
import Login from "./pages/LOGIN/Login";
//components
import Navbar from "./components/Navbar/Navbar";
//Firebase Authentication
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";
import CustomerRegister from "./pages/CUSTOMER_REGISTER/CustomerRegister";
require("dotenv").config();

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={ <Register />} />
              <Route path="/login" element={!user ? <Login /> : <CustomerRegister />} />
              <Route path="/customerRegister" element={!user ? <Register /> : <CustomerRegister />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
