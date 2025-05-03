import React, { useState } from 'react';
import { NFT, GeneratedArt } from '../../types/types';
import { ExternalLink, Tag, Clock } from 'lucide-react';

interface NFTCardProps {
  nft: NFT;
  artData: GeneratedArt | undefined;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, artData }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!artData) {
    return null; // Or a fallback UI
  }

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-900/20 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={artData.imageUrl}
          alt={artData.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold">{artData.title}</h3>
        </div>
        
        {nft.forSale && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-900/80 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              For Sale
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">
            {artData.title}
          </h3>
          <div className="text-purple-400 font-medium">
            {nft.price} ETH
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-400">
            <Tag size={16} className="mr-2 text-gray-500" />
            <span className="font-mono">
              Token ID: {nft.tokenId.substring(0, 8)}...
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Clock size={16} className="mr-2 text-gray-500" />
            <span>Minted on {nft.created.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <button
              className={`flex-1 px-3 py-2 rounded text-sm ${
                nft.forSale
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white transition-colors`}
            >
              {nft.forSale ? 'Cancel Listing' : 'List For Sale'}
            </button>
            <a
              href="#"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white transition-colors"
              title="View on Etherscan"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;