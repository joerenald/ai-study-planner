import React from 'react';
import Button from './Button';

const Card = ({
  title,
  description,
  image,
  button,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      {image && (
        <img
          src={image}
          alt={title || 'Card image'}
          className="w-full h-48 object-cover"
          onError={(e) => (e.target.src = '/src/assets/placeholder.png')} // Fallback image
        />
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        {button && (
          <Button
            variant="primary"
            size="sm"
            onClick={button.onClick}
            className="w-full"
          >
            {button.text}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;