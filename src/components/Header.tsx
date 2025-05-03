import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Paintbrush as PaintBrush, User, Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Create', path: '/create', icon: <PaintBrush size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: null },
    { name: 'My NFTs', path: '/my-nfts', icon: null },
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <PaintBrush size={24} className="text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              ArtifyNFT
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-purple-400 font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.icon && item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Wallet Connection Button (Desktop) */}
          <div className="hidden md:block">
            {wallet.connected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  <span className="text-green-400 font-semibold">{wallet.balance.toFixed(4)} ETH</span>
                </div>
                <button
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 py-2 px-3 rounded-md text-sm transition-colors"
                  onClick={() => disconnectWallet()}
                >
                  <Wallet size={16} />
                  <span className="truncate max-w-[100px]">
                    {wallet.address?.substring(0, 6)}...{wallet.address?.substring(38)}
                  </span>
                </button>
              </div>
            ) : (
              <button
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md text-sm transition-colors"
                onClick={() => connectWallet()}
                disabled={isConnecting}
              >
                <Wallet size={16} />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-3">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-gray-800 text-purple-400 font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.icon && item.icon}
                  <span>{item.name}</span>
                </button>
              ))}

              {/* Wallet Connection (Mobile) */}
              {wallet.connected ? (
                <div className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Wallet size={16} className="text-green-400" />
                    <span className="text-sm truncate max-w-[140px]">
                      {wallet.address?.substring(0, 6)}...{wallet.address?.substring(38)}
                    </span>
                  </div>
                  <div className="text-sm text-green-400 font-semibold">
                    {wallet.balance.toFixed(4)} ETH
                  </div>
                </div>
              ) : (
                <button
                  className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md text-sm transition-colors w-full"
                  onClick={() => {
                    connectWallet();
                    setIsMenuOpen(false);
                  }}
                  disabled={isConnecting}
                >
                  <Wallet size={16} />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;