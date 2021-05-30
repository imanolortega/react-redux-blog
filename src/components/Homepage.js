import React from "react";
import GoogleLogin from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "../styling/home.css";
import "../styling/app.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn && (
        <div className="login__message">
          <h2>📕</h2>
          <h1>El lugar favorito de los lectores</h1>
          <p>
            Ofrecemos recursos en línea de alta calidad para leer. Regístrese y
            comience a leer algunos blogs de calidad.
          </p>
          <GoogleLogin
            clientId="742278681212-m3tg8blv5aghrptcfn572lrk4p5pqht8.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button">
                Conectarse
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
