import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");
  var userData = localStorage.getItem("userData");
  if (authToken && userData) {
    userData = JSON.parse(userData);
    var name = userData.name;
  }

  const login = React.useCallback(() => {
    navigate("/login");
  });
  const logout = React.useCallback(() => {
    localStorage.clear();
    navigate("/login");
  });

  return (
    <>
      {authToken && userData ? (
        <div className="home">
          <div className="homeInner">
            <h1>{"Hi " + name}</h1>
            <br></br>
            <p>You have successfully logged into the application!</p>
          </div>
          <Button className="homeButton" text="Logout" onClick={logout} />
        </div>
      ) : (
        <div className="home">
          <div className="homeInner">
            <h1>Oops!</h1>
            <br></br>
            <p>Server error. Please try again after some time!</p>
          </div>
          <Button className="homeButton" text="Login" onClick={login} />
        </div>
      )}
    </>
  );
}
