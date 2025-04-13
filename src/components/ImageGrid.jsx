import React from 'react';

function ImageGrid({ images, onMoreDetails }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => {
        const tags = image.tags?.split(',').map(tag => tag.trim()).slice(0, 5) || [];
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover flex flex-col justify-between"
          >
            <div className="relative h-48">
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 text-primary dark:text-blue-300 dark:bg-blue-800/20 px-3 py-1 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onMoreDetails(index)}
                className="w-full mt-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageGrid;
