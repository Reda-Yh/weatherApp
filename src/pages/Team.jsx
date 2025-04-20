import { Mail, Linkedin, Github, Twitter, ExternalLink, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const teamMembers = [
  {
    name: "Reda Yahya",
    job: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
    description: {
      en: "Passionate Software Engineer skilled in building innovative solutions with expertise in web development and problem-solving.",
      fr: "Ingénieur logiciel passionné, expert dans la création de solutions innovantes, spécialisé en développement web et en résolution de problèmes."
    },
    image: "https://i.ibb.co/mV9NYQR3/Reda-Yahya-img.jpg   ",
    portfolio: "https://portfolio-2025-sigma.vercel.app/",
    email: "mailto:redayahyapro@gmail.com",
    linkedin: "https://www.linkedin.com/in/reda-yahya-920976253/",
    github: "https://github.com/Reda-Yh",
    twitter: "https://twitter.com/redayahya"
  },
  {
    name: "Oussama Hmitti",
    job: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
    description: {
      en: "Dedicated Software Engineer with a knack for creating efficient, scalable applications and a strong focus on modern technologies.",
      fr: "Ingénieur logiciel dévoué, spécialisé dans la création d’applications efficaces et évolutives avec une forte orientation vers les technologies modernes."
    },
    image: "https://i.ibb.co/ymQQYHbg/Oussama-Hmitti.jpg",
    portfolio: "https://www.linkedin.com/in/oussama-hmitti-496429262/",
    email: "mailto:oussama.hmitti@e-polytechnique.ma",
    linkedin: "https://www.linkedin.com/in/oussama-hmitti-496429262/",
    github: "https://github.com/OussamaHmitti",
    twitter: "https://twitter.com/OussamaHmitti"
  }
];

function Team() {
  const { language } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
      >
        {language === 'en' ? 'Our Team' : 'Notre Équipe'}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col"
            whileHover={{ scale: 1.03 }}
          >
            {/* IMAGE + HOVER ICON */}
            <div className="relative group w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <motion.div 
                className="w-full" 
                style={{ paddingBottom: '80%' }}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute top-0 left-0 w-full h-[125%] object-cover object-top"
                />
              </motion.div>

              {/* HOVER ICON */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white rounded-full text-black hover:text-blue-600"
                  style={{ position: 'absolute', bottom: '10%', transform: 'translateY(20%)' }}
                >
                  <Eye size={18} />
                </motion.a>
              </div>
            </div>

            {/* TEXT & SOCIALS */}
            <div className="p-6 text-center flex flex-col flex-grow">
              <motion.h3 
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {member.name}
              </motion.h3>

              <motion.p 
                className="text-base text-primary dark:text-blue-300 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {member.job[language]}
              </motion.p>

              <motion.p 
                className="text-gray-700 dark:text-gray-300 text-base mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {member.description[language]}
              </motion.p>

              <motion.div 
                className="flex justify-center gap-4 mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href={member.email} target="_blank" rel="noopener noreferrer">
                  <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Team;
