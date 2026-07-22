import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  onCreateModal,
  weatherData,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Extract the first letter of the name for the fallback avatar placeholder
  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {/* Conditionally render header subviews depending on authorization state */}
      {!isLoggedIn ? (
        <div className="header__auth-container">
          <button
            onClick={onRegisterClick}
            type="button"
            className="header__btn"
          >
            Sign Up
          </button>
          <button onClick={onLoginClick} type="button" className="header__btn">
            Log In
          </button>
        </div>
      ) : (
        <div className="header__user-interface">
          <button onClick={onCreateModal} type="button" className="header__btn">
            + Add clothes
          </button>

          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </div>
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
