import React, { useState } from 'react';
import { GeneratedArt, WalletState } from '../../types/types';
import { Award, Info, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mintNFT } from '../../utils/mockData';

interface ArtCardProps {
  art: GeneratedArt;
  userWallet: WalletState;
}

const ArtCard: React.FC<ArtCardProps> = ({ art, userWallet }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  
  const handleMint = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!userWallet.connected) {
      navigate('/create');
      return;
    }
    
    setIsMinting(true);
    
    try {
      await mintNFT(art);
      setMintSuccess(true);
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-900/20 hover:shadow-xl"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
            <div className="flex flex-wrap gap-1 mb-2">
              <span className="inline-block bg-purple-900/70 text-purple-300 px-2 py-0.5 rounded text-xs">
                {art.params.style}
              </span>
              <span className="inline-block bg-blue-900/70 text-blue-300 px-2 py-0.5 rounded text-xs">
                {art.params.colorScheme}
              </span>
            </div>
            <h3 className="text-white font-bold">{art.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {art.minted ? (
              <div className="flex items-center text-green-400 text-sm">
                <Award size={16} className="mr-1" />
                <span>Minted</span>
              </div>
            ) : mintSuccess ? (
              <div className="flex items-center text-green-400 text-sm">
                <Award size={16} className="mr-1" />
                <span>Minted</span>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">Not Minted</div>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Info size={18} />
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
              <div>
                <p className="text-gray-400">Style</p>
                <p className="text-white">{art.params.style}</p>
              </div>
              <div>
                <p className="text-gray-400">Colors</p>
                <p className="text-white">{art.params.colorScheme}</p>
              </div>
              <div>
                <p className="text-gray-400">Theme</p>
                <p className="text-white">{art.params.theme}</p>
              </div>
              <div>
                <p className="text-gray-400">Complexity</p>
                <p className="text-white">{(art.params.complexity * 100).toFixed(0)}%</p>
              </div>
            </div>
            
            {!art.minted && !mintSuccess && (
              <button
                onClick={handleMint}
                disabled={isMinting || !userWallet.connected}
                className={`w-full py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center ${
                  userWallet.connected
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-300'
                } transition-colors`}
              >
                {isMinting ? (
                  'Minting...'
                ) : userWallet.connected ? (
                  <>
                    <Award size={16} className="mr-2" />
                    Mint as NFT
                  </>
                ) : (
                  'Connect Wallet to Mint'
                )}
              </button>
            )}
            
            {(art.minted || mintSuccess) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/my-nfts');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                View in Collection
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtCard;