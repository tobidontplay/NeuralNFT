import React from 'react';
import Gallery from '../components/Gallery/Gallery';

const GalleryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Art Gallery</h1>
        <p className="text-gray-400 max-w-3xl">
          Browse through unique AI-generated artwork. Search, filter, and mint your favorites as NFTs.
        </p>
      </div>
      
      <Gallery />
    </div>
  );
};

export default GalleryPage;