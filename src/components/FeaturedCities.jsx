import React from 'react';
import { motion } from 'framer-motion';

const featuredCities = ["London", "Paris", "New York", "Tokyo", "Dubai", "Sydney"];

function FeaturedCities({ setCity, fetchWeatherAndImages }) {
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">Featured Cities</h3>
      </motion.div>
      <motion.div
        className="flex flex-wrap justify-center gap-2"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {featuredCities.map((featuredCity) => (
          <motion.button
            key={featuredCity}
            onClick={() => {
              setCity(featuredCity);
              fetchWeatherAndImages();
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-primary hover:text-white"
            variants={buttonVariants}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {featuredCity}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default FeaturedCities;