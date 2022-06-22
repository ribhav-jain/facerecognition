import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../../components/button/Button";
import "./Login.css";
import configData from "../../Config.json";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const loginUser = React.useCallback(() => {
    axios
      .post(configData["SERVER_URL"] + "api/login", {
        username: username,
        password: password,
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

  const faceLogin = React.useCallback(() => {
    navigate("/faceLogin");
  });

  const register = React.useCallback(() => {
    navigate("/register");
  });

  return (
    <div className="loginContainer">
      <form>
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Email address or phone number"
        ></input>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        ></input>
        <div className="buttonContainer">
          <Button className="buttonInner" text="Login" onClick={loginUser} />{" "}
          <Button
            className="buttonInner"
            text="Face Recognition"
            onClick={faceLogin}
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
