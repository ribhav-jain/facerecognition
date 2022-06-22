import React, { useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import "./Main.css";
import Login from "../pages/login/Login";
import FaceLogin from "../pages/login/FaceLogin";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Error404 from "../pages/errors/error404/Error";
import particlesOptions from "./particles.json";

export default function Main() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);

  return (
    <div>
      <Particles options={particlesOptions} init={particlesInit} />
      <div className="mainContainer">
        <Router basename="/facerecognition">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faceLogin" element={<FaceLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
