import React, { useState } from 'react';
import { GeneratedArt } from '../../types/types';
import { mintNFT } from '../../utils/mockData';
import { useWallet } from '../../context/WalletContext';
import { Loader2, Wallet, Award, ChevronRight } from 'lucide-react';

interface GeneratedArtDisplayProps {
  art: GeneratedArt | null;
  isGenerating: boolean;
}

const GeneratedArtDisplay: React.FC<GeneratedArtDisplayProps> = ({ 
  art, 
  isGenerating 
}) => {
  const { wallet, connectWallet } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintingSuccess, setMintingSuccess] = useState(false);
  const [mintingError, setMintingError] = useState<string | null>(null);
  const [mintedInfo, setMintedInfo] = useState<any>(null);

  const handleMintNFT = async () => {
    if (!art) return;
    
    setIsMinting(true);
    setMintingError(null);
    
    try {
      const nft = await mintNFT(art);
      setMintedInfo(nft);
      setMintingSuccess(true);
    } catch (error) {
      setMintingError('Failed to mint NFT. Please try again.');
      console.error('Minting error:', error);
    } finally {
      setIsMinting(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="bg-gray-800 rounded-xl h-full flex flex-col items-center justify-center p-10">
        <Loader2 size={60} className="text-purple-500 animate-spin mb-6" />
        <h3 className="text-xl font-medium text-white mb-2">Generating Your Artwork</h3>
        <p className="text-gray-400 text-center max-w-md">
          Our AI model is creating a unique piece based on your parameters. This process typically takes 15-30 seconds.
        </p>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="bg-gray-800 rounded-xl h-full flex flex-col items-center justify-center p-10">
        <div className="w-64 h-64 bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500">Preview</span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No Artwork Generated Yet</h3>
        <p className="text-gray-400 text-center max-w-md">
          Adjust the parameters on the left and click "Generate Artwork" to create your unique AI art piece.
        </p>
      </div>
    );
  }

  if (mintingSuccess) {
    return (
      <div className="bg-gray-800 rounded-xl h-full p-8">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6 border border-green-500/30">
          <div className="flex items-center mb-4">
            <Award size={24} className="text-green-400 mr-2" />
            <h3 className="text-xl font-bold text-white">NFT Minted Successfully!</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={art.imageUrl} 
                alt={art.title} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">{art.title}</h4>
                <p className="text-gray-400 text-sm">
                  Created: {new Date().toLocaleDateString()}
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-gray-400 text-sm">Token ID</p>
                  <p className="text-white font-mono">{mintedInfo.tokenId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Transaction Hash</p>
                  <p className="text-white font-mono text-sm truncate">
                    {mintedInfo.transactionHash}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => window.location.href = '/my-nfts'}
                className="flex items-center justify-center space-x-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <span>View in My Collection</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl h-full p-8">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{art.title}</h3>
      </div>
      
      <div className="relative group">
        <img 
          src={art.imageUrl} 
          alt={art.title} 
          className="w-full h-auto rounded-lg shadow-xl"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-purple-900/70 text-purple-300 px-2 py-1 rounded text-xs">
                {art.params.style}
              </span>
              <span className="inline-block bg-blue-900/70 text-blue-300 px-2 py-1 rounded text-xs">
                {art.params.colorScheme}
              </span>
              <span className="inline-block bg-cyan-900/70 text-cyan-300 px-2 py-1 rounded text-xs">
                {art.params.theme}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="bg-gray-700/40 rounded-lg p-4">
          <h4 className="text-gray-300 font-medium mb-3">Art Parameters</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Style</p>
              <p className="text-white">{art.params.style}</p>
            </div>
            <div>
              <p className="text-gray-400">Color Scheme</p>
              <p className="text-white">{art.params.colorScheme}</p>
            </div>
            <div>
              <p className="text-gray-400">Complexity</p>
              <p className="text-white">{(art.params.complexity * 100).toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Theme</p>
              <p className="text-white">{art.params.theme}</p>
            </div>
          </div>
        </div>
        
        {wallet.connected ? (
          <button
            onClick={handleMintNFT}
            disabled={isMinting}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-70"
          >
            {isMinting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Minting NFT...
              </>
            ) : (
              <>
                <Award size={20} className="mr-2" />
                Mint as NFT
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => connectWallet()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <Wallet size={20} className="mr-2" />
            Connect Wallet to Mint
          </button>
        )}
        
        {mintingError && (
          <p className="text-red-400 text-sm text-center">{mintingError}</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedArtDisplay;