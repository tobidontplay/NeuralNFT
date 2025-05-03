import React, { useState } from 'react';
import { ArtGenerationParams, GeneratedArt } from '../../types/types';
import ParameterInput from './ParameterInput';
import GeneratedArtDisplay from './GeneratedArtDisplay';
import { generateArt } from '../../utils/mockData';
import { Loader2 } from 'lucide-react';

const ArtGenerator: React.FC = () => {
  const [params, setParams] = useState<ArtGenerationParams>({
    style: 'Abstract',
    colorScheme: 'Vibrant',
    complexity: 0.5,
    theme: 'Nature',
  });
  
  const [generatedArt, setGeneratedArt] = useState<GeneratedArt | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleParamChange = (paramName: keyof ArtGenerationParams, value: any) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      const art = await generateArt(params);
      setGeneratedArt(art);
    } catch (error) {
      setGenerationError('Failed to generate artwork. Please try again.');
      console.error('Art generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Parameters Panel */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">Art Parameters</h2>
          
          <ParameterInput
            params={params}
            onChange={handleParamChange}
            disabled={isGenerating}
          />
          
          <div className="mt-8">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Generating Artwork...
                </>
              ) : (
                'Generate Artwork'
              )}
            </button>
            
            {generationError && (
              <p className="mt-4 text-red-400 text-sm">{generationError}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <GeneratedArtDisplay 
          art={generatedArt} 
          isGenerating={isGenerating} 
        />
      </div>
    </div>
  );
};

export default ArtGenerator;