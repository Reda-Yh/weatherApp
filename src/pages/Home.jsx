import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FeaturedCities from '../components/FeaturedCities';
import ImageGrid from '../components/ImageGrid';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { language } = useLanguage();
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const translations = {
    title: language === 'en' ? 'Weather & Image Search' : 'Recherche Météo et Images',
    errorNoCity: language === 'en'
      ? 'Please enter a city name'
      : 'Veuillez entrer le nom d’une ville',
    errorFetch: language === 'en'
      ? 'Error fetching data. Please check the city name and try again.'
      : 'Erreur lors de la récupération des données. Veuillez vérifier le nom de la ville et réessayer.',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const fetchWeatherAndImages = async () => {
    if (!city) {
      setError(translations.errorNoCity);
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
      setError(translations.errorFetch);
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
    <motion.div
      className="min-h-screen p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          variants={itemVariants}
        >
          {translations.title}
        </motion.h1>

        <motion.div variants={itemVariants}>
          <SearchBar
            city={city}
            setCity={setCity}
            fetchWeatherAndImages={fetchWeatherAndImages}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FeaturedCities
            setCity={setCity}
            fetchWeatherAndImages={fetchWeatherAndImages}
          />
        </motion.div>

        {error && (
          <motion.div
            className="text-red-500 text-center mb-8"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <motion.div
            className="flex justify-center items-center"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            ></motion.div>
          </motion.div>
        ) : (
          results.images && (
            <motion.div variants={itemVariants}>
              <ImageGrid images={results.images} onMoreDetails={handleMoreDetails} />
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}

export default Home;
