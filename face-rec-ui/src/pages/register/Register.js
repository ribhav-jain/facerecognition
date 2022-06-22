import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

import Button from "../../components/button/Button";
import "./Register.css";
import configData from "../../Config.json";
import Login from "../login/Login";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Register() {
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const registerUser = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    axios
      .post(configData["SERVER_URL"] + "api/register", {
        username: username,
        name: name,
        password: password,
        image: imageSrc,
      })
      .then((res) => {
        if (res && res.data && res.data.token) {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
          navigate("/home", { state: res.data });
        }
      })
      .catch((error) => {
        console.log(`error = ${error}`);
        navigate("/home", {
          state: {
            error: error,
            message: "Registration failed. Please try again!",
          },
        });
      });
  });

  const login = React.useCallback(() => {
    navigate("/login");
  });

  return (
    <div className="register">
      <div class="registerInner">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height={230}
          width={250}
          videoConstraints={videoConstraints}
          muted={false}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
      <div class="registerInner">
        <form>
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email address or phone number"
          ></input>
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          ></input>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          ></input>
          <div>
            <Button
              className="buttonInner"
              onClick={(e) => {
                e.preventDefault();
                registerUser();
              }}
              text="Register"
            />
          </div>
          <div className="linkContainer">
            Already have an account?{" "}
            <a className="link" onClick={login}>
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
