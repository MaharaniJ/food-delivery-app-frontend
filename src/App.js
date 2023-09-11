import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./container/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Navbar />
      <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
