import React from 'react';
import { ArtGenerationParams } from '../../types/types';
import { artStyles, colorSchemes, themes } from '../../utils/mockData';

interface ParameterInputProps {
  params: ArtGenerationParams;
  onChange: (param: keyof ArtGenerationParams, value: any) => void;
  disabled: boolean;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ 
  params, 
  onChange,
  disabled
}) => {
  return (
    <div className="space-y-6">
      {/* Art Style Select */}
      <div>
        <label 
          htmlFor="style" 
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Art Style
        </label>
        <select
          id="style"
          value={params.style}
          onChange={(e) => onChange('style', e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-70"
        >
          {artStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      
      {/* Color Scheme Select */}
      <div>
        <label 
          htmlFor="colorScheme" 
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Color Scheme
        </label>
        <select
          id="colorScheme"
          value={params.colorScheme}
          onChange={(e) => onChange('colorScheme', e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-70"
        >
          {colorSchemes.map((scheme) => (
            <option key={scheme} value={scheme}>
              {scheme}
            </option>
          ))}
        </select>
      </div>
      
      {/* Complexity Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label 
            htmlFor="complexity" 
            className="block text-sm font-medium text-gray-300"
          >
            Complexity
          </label>
          <span className="text-sm text-gray-400">
            {(params.complexity * 100).toFixed(0)}%
          </span>
        </div>
        <input
          id="complexity"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={params.complexity}
          onChange={(e) => onChange('complexity', parseFloat(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-70"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Simple</span>
          <span>Complex</span>
        </div>
      </div>
      
      {/* Theme Select */}
      <div>
        <label 
          htmlFor="theme" 
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Theme
        </label>
        <select
          id="theme"
          value={params.theme}
          onChange={(e) => onChange('theme', e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-70"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ParameterInput;