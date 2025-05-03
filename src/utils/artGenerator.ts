import { ArtGenerationParams } from '../types/types';

interface Point {
  x: number;
  y: number;
}

function generateRandomPoints(count: number, width: number, height: number): Point[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }));
}

function getColorFromScheme(scheme: string): string[] {
  const schemes: { [key: string]: string[] } = {
    Vibrant: ['#FF1744', '#D500F9', '#2979FF', '#00E676', '#FFEA00'],
    Pastel: ['#FFB6C1', '#B0E0E6', '#98FB98', '#DDA0DD', '#F0E68C'],
    Monochrome: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
    Neon: ['#FF00FF', '#00FF00', '#00FFFF', '#FF0000', '#FFA500'],
    'Earth Tones': ['#8B4513', '#DAA520', '#556B2F', '#8B0000', '#696969'],
    Synthwave: ['#FF00FF', '#00FFFF', '#FF0066', '#9933FF', '#FF3366'],
    'Dark Mode': ['#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080'],
    Retro: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
  };
  return schemes[scheme] || schemes.Vibrant;
}

function getShapesByStyle(style: string): string[] {
  const shapes: { [key: string]: string[] } = {
    Abstract: ['circle', 'rect', 'path'],
    Cubism: ['rect', 'polygon'],
    Minimalism: ['circle', 'rect'],
    'Pixel Art': ['rect'],
    Surrealism: ['path', 'circle', 'ellipse'],
    Impressionism: ['circle', 'ellipse'],
    Vaporwave: ['rect', 'polygon', 'circle'],
    Cyberpunk: ['rect', 'line', 'polygon'],
    'Pop Art': ['circle', 'rect'],
    Watercolor: ['circle', 'ellipse', 'path'],
  };
  return shapes[style] || shapes.Abstract;
}

function createSVGElement(
  shape: string,
  point: Point,
  color: string,
  complexity: number
): string {
  const size = Math.random() * 100 * complexity + 20;
  
  switch (shape) {
    case 'circle':
      return `<circle cx="${point.x}" cy="${point.y}" r="${size/2}" fill="${color}" opacity="${0.3 + Math.random() * 0.7}" />`;
    case 'rect':
      return `<rect x="${point.x}" y="${point.y}" width="${size}" height="${size}" fill="${color}" opacity="${0.3 + Math.random() * 0.7}" />`;
    case 'ellipse':
      return `<ellipse cx="${point.x}" cy="${point.y}" rx="${size}" ry="${size/2}" fill="${color}" opacity="${0.3 + Math.random() * 0.7}" />`;
    case 'polygon':
      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 2 * Math.PI) / 6;
        return `${point.x + size * Math.cos(angle)},${point.y + size * Math.sin(angle)}`;
      }).join(' ');
      return `<polygon points="${points}" fill="${color}" opacity="${0.3 + Math.random() * 0.7}" />`;
    case 'line':
      return `<line x1="${point.x}" y1="${point.y}" x2="${point.x + size}" y2="${point.y + size}" stroke="${color}" stroke-width="${2 + Math.random() * 4}" opacity="${0.3 + Math.random() * 0.7}" />`;
    case 'path':
      const d = `M ${point.x} ${point.y} Q ${point.x + size} ${point.y - size} ${point.x + size * 2} ${point.y}`;
      return `<path d="${d}" stroke="${color}" fill="none" stroke-width="${2 + Math.random() * 4}" opacity="${0.3 + Math.random() * 0.7}" />`;
    default:
      return '';
  }
}

export function generateArtSVG(params: ArtGenerationParams): string {
  const width = 800;
  const height = 800;
  const colors = getColorFromScheme(params.colorScheme);
  const shapes = getShapesByStyle(params.style);
  const numElements = Math.floor(50 + params.complexity * 150);
  const points = generateRandomPoints(numElements, width, height);
  
  const elements = points.map((point) => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return createSVGElement(shape, point, color, params.complexity);
  });

  const background = params.colorScheme === 'Dark Mode' ? '#1a1a1a' : '#ffffff';
  
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${background}" />
    ${elements.join('\n    ')}
  </svg>`;
}

export function svgToDataURL(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}