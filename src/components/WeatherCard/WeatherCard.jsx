import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import cloudy from "../../assets/cloudy.png";
import night from "../../assets/night.png";
import rain_at_night from "../../assets/rain_at_night.png";
import rainy from "../../assets/rainy.png";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(weatherData.condition);

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
      case "rain_at_night":
        return rain_at_night;
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
