import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiCloudy,
  WiDaySunny,
} from 'react-icons/wi';
import { IoArrowBack } from 'react-icons/io5';
import Header from './Header';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, imageUrl, weather } = location.state || {};

  if (!weather) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-4">No data found.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <IoArrowBack /> Go back
            </button>
          </div>
        </div>
      </>
    );
  }

  const weatherInfo = weather.list[0];
  const condition = weatherInfo.weather[0].description;
  const emojiCondition = condition.includes('rain')
    ? '🌧️'
    : condition.includes('cloud')
    ? '☁️'
    : condition.includes('clear')
    ? '☀️'
    : '🌤️';

    const tags = name
    ? [...new Set(name.split(',').map(tag => tag.trim()))].slice(0, 9) : [];

  return (
    <>
      <Header />
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Image + City Name */}
          <div className="relative h-64 md:h-96">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-md">
              {/* Affichage des tags avec des couleurs claires */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-300 text-blue-800 dark:text-blue-300 dark:bg-blue-800/40 px-3 py-1 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </h2>
          </div>

          {/* Weather Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Weather Info Cards */}
              <WeatherCard
                icon={<WiThermometer className="text-4xl text-primary" />}
                label="Temperature"
                value={`${weatherInfo.main.temp}°C`}
              />
              <WeatherCard
                icon={<WiHumidity className="text-4xl text-primary" />}
                label="Humidity"
                value={`${weatherInfo.main.humidity}%`}
              />
              <WeatherCard
                icon={<WiStrongWind className="text-4xl text-primary" />}
                label="Wind Speed"
                value={`${weatherInfo.wind.speed} m/s`}
              />
              <WeatherCard
                icon={<WiBarometer className="text-4xl text-primary" />}
                label="Pressure"
                value={`${weatherInfo.main.pressure} hPa`}
              />
              <WeatherCard
                icon={<WiDaySunny className="text-4xl text-primary" />}
                label="Feels Like"
                value={`${weatherInfo.main.feels_like}°C`}
              />
              <WeatherCard
                icon={<WiCloudy className="text-4xl text-primary" />}
                label="Condition"
                value={
                  <span className="inline-flex items-center gap-1 text-lg font-semibold">
                    {emojiCondition} {condition}
                  </span>
                }
              />
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mt-10 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 mx-auto"
            >
              <IoArrowBack /> Back to Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable weather card
const WeatherCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl flex items-center gap-4 shadow hover:shadow-md transition">
    {icon}
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default DetailsPage;
