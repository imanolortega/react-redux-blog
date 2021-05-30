import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();
  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };
  return (
    <div className="navbar">
      <div className="navbar__header">Blogcito 🐱‍👤</div>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Buscar"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}></input>
          <button className="submit" onClick={handleClick}>
            Buscar
          </button>
        </div>
      )}
      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar src={userData?.imageUrl} alt={userData?.name} />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="742278681212-m3tg8blv5aghrptcfn572lrk4p5pqht8.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button">
                Desconectarse
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
