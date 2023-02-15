import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ country }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [weatherInfo, setWeatherInfo] = useState({});
  const { capital, latlng } = country;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        const res = response.data;
        setWeatherInfo(res);
      });
  }, [apiKey, latlng]);

  if (Object.keys(weatherInfo).length === 0) {
    return null;
  }

  const icon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;

  return (
    <div>
      <h4 style={{ fontSize: '2rem', margin: '.5rem 0' }}>Weather in capital {capital[0]}</h4>
      <p>
        <b>temperature:</b> {weatherInfo.main.feels_like.toFixed(1)}&#8451;
      </p>
      {/* weather icon as img ? */}
      <img alt="weather icon" src={icon} />

      <p>
        <b>wind</b> {weatherInfo.wind.speed} m/s
      </p>
    </div>
  );
};

export { WeatherInfo };
