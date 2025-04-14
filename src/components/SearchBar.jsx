import { FiSearch } from 'react-icons/fi';

function SearchBar({ city, setCity, fetchWeatherAndImages }) {
  return (
    <div className="relative max-w-xl mx-auto mb-6">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 pr-12"
        onKeyPress={(e) => e.key === 'Enter' && fetchWeatherAndImages()}
      />
      <button
        onClick={fetchWeatherAndImages}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-secondary"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </div>
  );
}

export default SearchBar;
