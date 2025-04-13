import React from 'react';

function ImageGrid({ images, onMoreDetails }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover"
        >
          <div className="relative h-48">
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 line-clamp-1">{image.tags}</h3>
            <button
              onClick={() => onMoreDetails(index)}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
