import React from 'react';
import ArtGenerator from '../components/ArtGenerator/ArtGenerator';

const CreatePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Create AI Artwork</h1>
        <p className="text-gray-400 max-w-3xl">
          Use our AI generation tools to create unique artwork that can be minted as NFTs. 
          Adjust the parameters to customize your creation.
        </p>
      </div>
      
      <ArtGenerator />
    </div>
  );
};

export default CreatePage;