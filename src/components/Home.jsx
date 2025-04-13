import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import FeaturedCities from './FeaturedCities';
import ImageGrid from './ImageGrid';

function Home() {
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchWeatherAndImages = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=0d0403bf7ca0d68c10ddfe7a6d572ce4`
      );
      const imageResponse = await axios.get(
        `https://pixabay.com/api/?q=${city}&key=49718300-187aa05bb868030cd55cb4925`
      );
      setResults({
        weather: weatherResponse.data,
        images: imageResponse.data.hits,
      });
    } catch (error) {
      setError('Error fetching data. Please check the city name and try again.');
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const handleMoreDetails = (index) => {
    const selectedImage = results.images[index];
    const weather = results.weather;

    navigate('/details', {
      state: {
        name: selectedImage.tags,
        imageUrl: selectedImage.largeImageURL,
        weather: weather,
      },
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Weather & Image Search
          </h1>

          <SearchBar
            city={city}
            setCity={setCity}
            fetchWeatherAndImages={fetchWeatherAndImages}
          />

          <FeaturedCities
            setCity={setCity}
            fetchWeatherAndImages={fetchWeatherAndImages}
          />

          {error && (
            <div className="text-red-500 text-center mb-8">{error}</div>
          )}

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            results.images && (
              <ImageGrid images={results.images} onMoreDetails={handleMoreDetails} />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
