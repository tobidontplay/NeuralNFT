import React, { useState } from 'react';
import { NFT } from '../../types/types';
import NFTCard from './NFTCard';
import { useWallet } from '../../context/WalletContext';
import { Wallet, LayoutGrid, List } from 'lucide-react';
import { mockNFTs, mockArtworks } from '../../utils/mockData';

const NFTCollection: React.FC = () => {
  const { wallet, connectWallet } = useWallet();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // For demo purposes, use mock data
  // In a real app, we would fetch these from the blockchain/API
  const nfts = mockNFTs;
  
  if (!wallet.connected) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <div className="mb-6">
          <Wallet size={48} className="text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Connect your wallet to view your NFT collection and manage your digital assets.
          </p>
          <button
            onClick={() => connectWallet()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center transition-colors"
          >
            <Wallet size={20} className="mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">No NFTs Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          You don't have any NFTs in your collection yet. Create and mint your first AI-generated artwork.
        </p>
        <button
          onClick={() => window.location.href = '/create'}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center transition-colors"
        >
          Create Artwork
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My NFT Collection</h2>
          <p className="text-gray-400">
            You own {nfts.length} NFT{nfts.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      
      {/* NFT Collection */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map(nft => {
            // Find the associated artwork
            const artwork = mockArtworks.find(art => art.id === nft.artId);
            return (
              <NFTCard 
                key={nft.id}
                nft={nft}
                artData={artwork}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {nfts.map(nft => {
            const artwork = mockArtworks.find(art => art.id === nft.artId);
            return (
              <div 
                key={nft.id}
                className="bg-gray-800 rounded-lg overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 w-full h-48 sm:h-auto">
                  <img 
                    src={artwork?.imageUrl} 
                    alt={artwork?.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {artwork?.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Token ID</p>
                      <p className="text-white font-mono">{nft.tokenId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Price</p>
                      <p className="text-white">{nft.price} ETH</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status</p>
                      <p className={nft.forSale ? 'text-green-400' : 'text-blue-400'}>
                        {nft.forSale ? 'For Sale' : 'Not For Sale'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Minted On</p>
                      <p className="text-white">
                        {nft.created.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded text-sm ${
                        nft.forSale
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white transition-colors`}
                    >
                      {nft.forSale ? 'Cancel Listing' : 'List For Sale'}
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition-colors"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NFTCollection;