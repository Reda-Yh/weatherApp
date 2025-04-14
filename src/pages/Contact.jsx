import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useLanguage } from '../context/LanguageContext';

function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const translations = {
    title: language === 'en' ? 'Get in Touch' : 'Contactez-nous',
    labels: {
      name: language === 'en' ? 'Name' : 'Nom',
      email: 'Email',
      message: language === 'en' ? 'Message' : 'Message',
    },
    placeholders: {
      name: language === 'en' ? 'Your name' : 'Votre nom',
      email: language === 'en' ? 'you@example.com' : 'votre.email@exemple.com',
      message: language === 'en' ? 'Your message...' : 'Votre message...',
    },
    button: language === 'en' ? 'Send Message' : 'Envoyer le message',
    submitted: language === 'en' ? 'Message Sent!' : 'Message envoyé !',
    alerts: {
      success: {
        title: language === 'en' ? 'Message Sent!' : 'Message envoyé !',
        text: language === 'en'
          ? 'Your message has been successfully sent.'
          : 'Votre message a bien été envoyé.',
      },
      error: {
        title: language === 'en' ? 'Oops...' : 'Oups...',
        text: language === 'en'
          ? 'Something went wrong. Please try again later.'
          : 'Quelque chose s’est mal passé. Veuillez réessayer plus tard.',
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdkebrnk';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setError(null);

        Swal.fire({
          icon: 'success',
          title: translations.alerts.success.title,
          text: translations.alerts.success.text,
          background: '#1F2937',
          color: '#F9FAFB',
          confirmButtonColor: '#3B82F6',
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setError(translations.alerts.error.text);
      Swal.fire({
        icon: 'error',
        title: translations.alerts.error.title,
        text: translations.alerts.error.text,
        background: '#1F2937',
        color: '#F9FAFB',
        confirmButtonColor: '#EF4444',
      });
      console.error(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Tableau des informations de contact. Les titres sont traduits.
  const contactInfo = [
    {
      icon: <MapPin className="w-7 h-7 text-blue-500 dark:text-blue-400" />,
      title: language === 'en' ? 'Address' : 'Adresse',
      content: 'UIA, Agadir, Morocco',
    },
    {
      icon: <Phone className="w-7 h-7 text-blue-500 dark:text-blue-400" />,
      title: language === 'en' ? 'Phone' : 'Téléphone',
      content: '+212 6 51 83 40 41',
    },
    {
      icon: <Mail className="w-7 h-7 text-blue-500 dark:text-blue-400" />,
      title: 'Email',
      content: 'redayahyapro@gmail.com',
    },
    {
      icon: <Phone className="w-7 h-7 text-blue-500 dark:text-blue-400" />,
      title: language === 'en' ? 'Phone' : 'Téléphone',
      content: '+212 6 40 84 88 85',
    },
    {
      icon: <Mail className="w-7 h-7 text-blue-500 dark:text-blue-400" />,
      title: 'Email',
      content: 'oussama.hmitti@e-polytechnique.ma',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
      >
        {translations.title}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Contact Info */}
        <motion.div variants={containerVariants} className="space-y-8">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-5 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              {item.icon}
              <div>
                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl pointer-events-none" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {translations.labels.name}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder={translations.placeholders.name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {translations.labels.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder={translations.placeholders.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {translations.labels.message}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
              placeholder={translations.placeholders.message}
            ></textarea>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitted}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ${
              isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitted ? translations.submitted : translations.button}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Contact;
