import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paintbrush as PaintBrush, Award, Cpu, CloudCog } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/70 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                AI-Generated
              </span>
              <br />
              <span>NFT Artwork</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create unique digital art with artificial intelligence and mint it as an NFT on the blockchain. 
              Show off your creativity in our gallery marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/create')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <PaintBrush size={20} className="mr-2" />
                Create Artwork
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="bg-gray-800/60 hover:bg-gray-800/80 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Explore Gallery
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform leverages three key technologies to provide a unique art creation and ownership experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Feature */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center mb-4">
                <Cpu size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI-Powered Creation
              </h3>
              <p className="text-gray-400">
                Generate unique artwork using advanced AI models trained on millions of images. Customize parameters to create your perfect piece.
              </p>
            </div>
            
            {/* Blockchain Feature */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-800/50 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Blockchain-Secured NFTs
              </h3>
              <p className="text-gray-400">
                Mint your AI creations as NFTs on the Ethereum blockchain, ensuring permanent proof of ownership and authenticity.
              </p>
            </div>
            
            {/* Cloud Feature */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="w-12 h-12 bg-pink-800/50 rounded-lg flex items-center justify-center mb-4">
                <CloudCog size={24} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Cloud Computing Power
              </h3>
              <p className="text-gray-400">
                Leverage scalable cloud infrastructure for fast, reliable AI processing and image generation without local hardware requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Create and own your AI art in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-xl font-bold text-white mb-3 mt-2">
                  Set Generation Parameters
                </h3>
                <p className="text-gray-400">
                  Choose your art style, color scheme, complexity, and theme to guide the AI creation process.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-xl font-bold text-white mb-3 mt-2">
                  Generate Your Artwork
                </h3>
                <p className="text-gray-400">
                  Our AI model processes your parameters and creates a unique digital artwork just for you.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gray-900 p-6 rounded-xl">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-xl font-bold text-white mb-3 mt-2">
                  Mint as an NFT
                </h3>
                <p className="text-gray-400">
                  Connect your wallet and mint your creation as an NFT, establishing permanent ownership on the blockchain.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/create')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Start Creating
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Artwork */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Artwork
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore some of the amazing pieces created and minted on our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Art 1 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.pexels.com/photos/2693212/pexels-photo-2693212.png" 
                  alt="Digital Dreamscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold">Digital Dreamscape</h3>
                <p className="text-gray-400 text-sm">Abstract • Vibrant</p>
              </div>
            </div>
            
            {/* Featured Art 2 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg" 
                  alt="Neon City Nights" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold">Neon City Nights</h3>
                <p className="text-gray-400 text-sm">Cyberpunk • Neon</p>
              </div>
            </div>
            
            {/* Featured Art 3 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.pexels.com/photos/3222255/pexels-photo-3222255.png" 
                  alt="Cosmic Geometry" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold">Cosmic Geometry</h3>
                <p className="text-gray-400 text-sm">Minimalism • Monochrome</p>
              </div>
            </div>
            
            {/* Featured Art 4 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="aspect-square">
                <img 
                  src="https://images.pexels.com/photos/8107191/pexels-photo-8107191.jpeg" 
                  alt="Digital Flora" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold">Digital Flora</h3>
                <p className="text-gray-400 text-sm">Impressionism • Pastel</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/gallery')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              View All Artwork
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;