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
import { motion } from 'framer-motion';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, imageUrl, weather } = location.state || {};

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

  if (!weather) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.p
            className="text-xl mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No data found.
          </motion.p>
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoArrowBack /> Go back
          </motion.button>
        </div>
      </motion.div>
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
    ? [...new Set(name.split(',').map(tag => tag.trim()))].slice(0, 9)
    : [];

  return (
    <motion.div
      className="min-h-screen p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <motion.div
          className="relative h-64 md:h-96"
          variants={itemVariants}
        >
          <motion.img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.h2
            className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-md"
            variants={itemVariants}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <motion.span
                  key={i}
                  className="bg-blue-300 text-blue-800 dark:text-blue-300 dark:bg-blue-800/40 px-3 py-1 text-sm font-medium rounded-full"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.h2>
        </motion.div>

        {/* Weather Info */}
        <motion.div
          className="p-8"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weather Info Cards */}
            <WeatherCard
              icon={<WiThermometer className="text-4xl text-primary" />}
              label="Temperature"
              value={`${weatherInfo.main.temp}°C`}
              variants={itemVariants}
            />
            <WeatherCard
              icon={<WiHumidity className="text-4xl text-primary" />}
              label="Humidity"
              value={`${weatherInfo.main.humidity}%`}
              variants={itemVariants}
            />
            <WeatherCard
              icon={<WiStrongWind className="text-4xl text-primary" />}
              label="Wind Speed"
              value={`${weatherInfo.wind.speed} m/s`}
              variants={itemVariants}
            />
            <WeatherCard
              icon={<WiBarometer className="text-4xl text-primary" />}
              label="Pressure"
              value={`${weatherInfo.main.pressure} hPa`}
              variants={itemVariants}
            />
            <WeatherCard
              icon={<WiDaySunny className="text-4xl text-primary" />}
              label="Feels Like"
              value={`${weatherInfo.main.feels_like}°C`}
              variants={itemVariants}
            />
            <WeatherCard
              icon={<WiCloudy className="text-4xl text-primary" />}
              label="Condition"
              value={
                <span className="inline-flex items-center gap-1 text-lg font-semibold">
                  {emojiCondition} {condition}
                </span>
              }
              variants={itemVariants}
            />
          </div>

          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="mt-10 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 mx-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoArrowBack /> Back to Search
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WeatherCard = ({ icon, label, value, variants }) => (
  <motion.div
    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl flex items-center gap-4 shadow hover:shadow-md transition"
    variants={variants}
    whileHover={{ y: -5 }}
  >
    {icon}
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </motion.div>
);

export default DetailsPage;