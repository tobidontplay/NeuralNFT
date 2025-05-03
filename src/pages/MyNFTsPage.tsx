import React from 'react';
import NFTCollection from '../components/NFT/NFTCollection';

const MyNFTsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">My NFT Collection</h1>
        <p className="text-gray-400 max-w-3xl">
          View and manage your minted NFTs. List them for sale, transfer ownership, or showcase your collection.
        </p>
      </div>
      
      <NFTCollection />
    </div>
  );
};

export default MyNFTsPage;