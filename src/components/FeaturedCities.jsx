import React from 'react';

const featuredCities = ["London", "Paris", "New York", "Tokyo", "Dubai", "Sydney"];

function FeaturedCities({ setCity, fetchWeatherAndImages }) {
  return (
    <div className="max-w-xl mx-auto mb-12">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Featured Cities</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {featuredCities.map((featuredCity) => (
          <button
            key={featuredCity}
            onClick={() => {
              setCity(featuredCity);
              fetchWeatherAndImages();
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-primary hover:text-white"
          >
            {featuredCity}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCities;
