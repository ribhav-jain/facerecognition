import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

import Button from "../../components/button/Button";
import "./Login.css";
import configData from "../../Config.json";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Login() {
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const login = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    axios
      .post(configData["SERVER_URL"] + "api/faceLogin", {
        username: username,
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
            message: "Login failed. Please try again!",
          },
        });
      });
  });

  const passLogin = React.useCallback(() => {
    navigate("/login");
  });

  const register = React.useCallback(() => {
    navigate("/register");
  });

  return (
    <div className="loginContainer">
      <form>
        {image == "" ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={165}
            width={200}
            videoConstraints={videoConstraints}
            muted={false}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img className="loginImg" src={image} />
        )}
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Email address or phone number"
        ></input>
        <div className="buttonContainer">
          <Button
            className={"buttonInner"}
            text="Login"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          />{" "}
          <Button
            className={"buttonInner"}
            text="Password Login"
            onClick={passLogin}
          />
        </div>
        <div className="linkContainer">
          Don't have an account?{" "}
          <a className="link" onClick={register}>
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
