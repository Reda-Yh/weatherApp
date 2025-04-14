import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
          WeatherScope
        </h2>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">Home</Link></li>
            <li><Link to="/team" className="text-gray-600 dark:text-gray-300 hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary">Contact</Link></li>
            <li><ThemeToggle /></li>
          </ul>
        </nav>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur px-4 pb-4">
          <ul className="space-y-3">
            <li><Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-primary">Home</Link></li>
            <li><Link to="/team" className="block text-gray-600 dark:text-gray-300 hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-primary">Contact</Link></li>
            <li><ThemeToggle /></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
