import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent"> WeatherScope </span>
            &copy; {new Date().getFullYear()}. All rights reserved.
          </h4>
        </div>

        <div className="flex gap-4 justify-center">
          <a href="mailto:redayahyapro@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
          </a>
          <a href="https://www.linkedin.com/in/reda-yahya-920976253/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
          </a>
          <a href="https://github.com/Reda-Yh" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
          </a>
          <a href="https://twitter.com/redayahya" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-primary transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
