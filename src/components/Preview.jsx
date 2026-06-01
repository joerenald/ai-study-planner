import React, { useState } from 'react';

// Placeholder images (replace with real paths to src/assets/)
const defaultPreviews = [
  {
    image: '/src/assets/dashboard-preview.png', // Replace with actual image
    title: 'Dashboard Overview',
    description: 'View your personalized study plan at a glance with progress bars and upcoming tasks.',
  },
  {
    image: '/src/assets/calendar-preview.png', // Replace with actual image
    title: 'Calendar Integration',
    description: 'Sync your schedule with your favorite calendar app for seamless reminders.',
  },
  {
    image: '/src/assets/progress-preview.png', // Replace with actual image
    title: 'Progress Analytics',
    description: 'Track your study habits with detailed charts and insights to stay motivated.',
  },
];

const Preview = ({
  previews = defaultPreviews,
  title = 'App Preview',
  subtitle = 'See the AI Study Planner in action with these key screens.',
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (preview) => setSelectedImage(preview);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => openModal(preview)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(preview)}
              aria-label={`View ${preview.title}`}
            >
              <img
                src={preview.image}
                alt={preview.title}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = '/src/assets/placeholder.png')} // Fallback image
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {preview.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {preview.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Full-View */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedImage.title}</h3>
            <p className="text-gray-600">{selectedImage.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Preview;