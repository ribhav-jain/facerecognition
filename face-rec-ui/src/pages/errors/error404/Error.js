import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/button/Button";
import "./Error.css";

export default function Error() {
  const navigate = useNavigate();
  const login = React.useCallback(() => {
    navigate("/login");
  });

  return (
    <div className="error-main">
      <div className="error-class">
        <h1>Oops!</h1>
        <h1 className="error-404">404</h1>
        <p>The requested page is unavailable at the moment!</p>
        <Button className="homeButton" text="Login" onClick={login} />
      </div>
    </div>
  );
}
