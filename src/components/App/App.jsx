import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// Utilities and Components
import {
  getItems,
  addCard,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api"; // Added Like Utility Imports
import * as auth from "../../utils/auth";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Modals
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Auth State Management Variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: "",
    _id: "",
  });

  const buttonText = isLoading ? "Saving..." : "Save";

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");
  const handleToggleToRegister = () => setActiveModal("register");
  const handleToggleToLogin = () => setActiveModal("login");

  // Token Check Effect run on initial load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
          localStorage.removeItem("jwt"); // Wipe bad token clean
        });
    }
  }, []);

  // Fetch Public Weather and Public Items List Data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then(({ data: itemsList = [] }) => {
        setClothingItems([...itemsList].reverse());
      })
      .catch(console.error);
  }, []);

  // Handler: Handle Liking/Disliking cards
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item)),
          );
        })
        .catch((err) => console.error(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item)),
          );
        })
        .catch((err) => console.error(err));
    }
  };

  // Handler: Handle User Authentication Registration Form Submission
  const handleRegistration = (formValues) => {
    auth
      .register(formValues)
      .then(() => {
        // Automatically authorize and sign the user in after successful signup
        handleLogin({ email: formValues.email, password: formValues.password });
      })
      .catch(console.error);
  };

  // Handler: Handle User Authorization Signin Form Submission
  const handleLogin = (formValues) => {
    auth
      .authorize(formValues)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return auth.checkToken(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Handler: Handle Changing User Profile Properties Data Form Submission
  const handleUpdateUser = (formValues) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    auth
      .patchUser(formValues, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Update global contexts state mapping immediately
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handler: Create and post a new clothing card
  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    setIsLoading(true);
    addCard(newCardData, token)
      .then((data) => {
        setClothingItems([data.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handler: Delete card
  const deleteItemHandler = (id) => {
    const token = localStorage.getItem("jwt");
    removeItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt"); // 1. Wipe token from local storage clean
    setIsLoggedIn(false); // 2. Set authorization flag to false
    setCurrentUser({
      // 3. Reset user data object to blank state
      name: "",
      avatar: "",
      email: "",
      _id: "",
    });
    navigate("/"); // 4. Redirect the guest safely back home
  };

  // Close with ESC trigger
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              onCreateModal={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike} // Passed Prop
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCreateModal={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike} // Passed Prop
                      onLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            activeModal={activeModal}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
            buttonText={buttonText}
          />
          <ItemModal
            activeModal={activeModal}
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={deleteItemHandler}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegistration}
            buttonText="Sign Up"
            onToggleModal={handleToggleToLogin}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            buttonText="Log In"
            onToggleModal={handleToggleToRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonText}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
