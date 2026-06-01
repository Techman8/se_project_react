import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";
import night from "../../assets/night.png";
import rainAtNight from "../../assets/rainAtNight.png";
import rainy from "../../assets/rainy.png";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getWeatherImage = () => {
    switch (weatherData.condition) {
      case "clouds":
        return cloudy;
      case "rain":
        return rainy;
      case "clear":
        return sunny;
      case "night":
        return night;
      case "rainAtNight":
        return rainAtNight;
      default:
        return sunny;
    }
  };

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        src={getWeatherImage()}
        alt={weatherData.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
