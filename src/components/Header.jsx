import React from 'react';
import ThemeToggle from './ThemeToggle';


function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">WeatherScope</h2>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">Home</a></li>
            <li><a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary">About</a></li>
            <li><a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary">Contact</a></li>
            <li><ThemeToggle /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
