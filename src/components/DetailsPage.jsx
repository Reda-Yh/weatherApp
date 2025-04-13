import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { IoArrowBack } from 'react-icons/io5';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, imageUrl, weather } = location.state || {};

  if (!weather) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            {name}
          </h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl flex items-center gap-4">
              <WiThermometer className="text-4xl text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                <p className="text-2xl font-semibold">{weather.list[0].main.temp}°C</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl flex items-center gap-4">
              <WiHumidity className="text-4xl text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-2xl font-semibold">{weather.list[0].main.humidity}%</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl flex items-center gap-4">
              <WiStrongWind className="text-4xl text-primary" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                <p className="text-2xl font-semibold">{weather.list[0].wind.speed} m/s</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
          >
            <IoArrowBack /> Back to Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;