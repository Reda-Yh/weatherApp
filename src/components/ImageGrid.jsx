import React from 'react';
import { motion } from 'framer-motion';

function ImageGrid({ images, onMoreDetails }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {images.map((image, index) => {
        const tags = image.tags?.split(',').map(tag => tag.trim()).slice(0, 5) || [];
        return (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover flex flex-col justify-between"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            <motion.div
              className="relative h-48"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="p-6 flex flex-col flex-grow justify-between">
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    className="bg-primary/10 text-primary dark:text-blue-300 dark:bg-blue-800/20 px-3 py-1 text-xs font-medium rounded-full"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.button
                onClick={() => onMoreDetails(index)}
                className="w-full mt-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ImageGrid;