import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePalette = 
  | 'swiss-vermillion' 
  | 'atelier-emerald' 
  | 'bauhaus-mono' 
  | 'kyoto-indigo' 
  | 'tokyo-night';

export type FontPairing = 'syne-modern' | 'editorial-serif' | 'outfit-sans' | 'space-tech';

interface ThemeContextType {
  palette: ThemePalette;
  font: FontPairing;
  setPalette: (palette: ThemePalette) => void;
  setFont: (font: FontPairing) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (isOpen: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_PALETTES: {
  id: ThemePalette;
  name: string;
  subtitle: string;
  description: string;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
  previewText: string;
}[] = [
  {
    id: 'swiss-vermillion',
    name: 'Swiss Atelier (Default)',
    subtitle: 'Warm Linen & Bauhaus Vermillion',
    description: 'Tactile stone alabaster with rich carbon ink and international Swiss crimson accents.',
    previewBg: '#FBF9F4',
    previewCard: '#FFFFFF',
    previewAccent: '#D9381E',
    previewText: '#181614',
  },
  {
    id: 'atelier-emerald',
    name: 'British Racing & Sage',
    subtitle: 'Oyster Canvas & Forest Green',
    description: 'Subtle pale oyster paper with deep racing spruce and warm amber sub-accents.',
    previewBg: '#F4F6F3',
    previewCard: '#FFFFFF',
    previewAccent: '#1B4332',
    previewText: '#141E18',
  },
  {
    id: 'bauhaus-mono',
    name: 'Industrial Studio',
    subtitle: 'Architectural Warm Concrete & Amber',
    description: 'Monochrome precision, stark dark typography, and vibrant electric amber tags.',
    previewBg: '#F3F3F0',
    previewCard: '#FFFFFF',
    previewAccent: '#E65100',
    previewText: '#111111',
  },
  {
    id: 'kyoto-indigo',
    name: 'Kyoto Silken Paper',
    subtitle: 'Porcelain White & Sumi Indigo',
    description: 'Minimalist porcelain canvas paired with deep Japanese sumi-e ink and maritime navy.',
    previewBg: '#F7F8FA',
    previewCard: '#FFFFFF',
    previewAccent: '#1E3A5F',
    previewText: '#0F172A',
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Gallery Dark',
    subtitle: 'Matte Charcoal & Warm Ember',
    description: 'Luxurious velvet matte black canvas with crisp typography and warm ember highlights.',
    previewBg: '#121214',
    previewCard: '#1A1A1E',
    previewAccent: '#FF6B4A',
    previewText: '#F4F4F6',
  },
];

export const FONT_PAIRINGS: {
  id: FontPairing;
  name: string;
  sample: string;
  description: string;
  fontHeading: string;
  fontBody: string;
}[] = [
  {
    id: 'syne-modern',
    name: 'Modernist Craft (Recommended)',
    sample: 'Strategic Product Management',
    description: 'Syne (Headings) + DM Sans (Body)',
    fontHeading: "'Syne', sans-serif",
    fontBody: "'DM Sans', sans-serif",
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Magazine',
    sample: 'Vision, Architecture & Execution',
    description: 'Newsreader / Instrument (Headings) + Plus Jakarta Sans (Body)',
    fontHeading: "'Newsreader', serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
  },
  {
    id: 'outfit-sans',
    name: 'Warm Geometric',
    sample: 'User-Centric Innovation',
    description: 'Outfit (Headings) + DM Sans (Body)',
    fontHeading: "'Outfit', sans-serif",
    fontBody: "'DM Sans', sans-serif",
  },
  {
    id: 'space-tech',
    name: 'Architectural Tech',
    sample: 'Systems, Scalability & Metrics',
    description: 'Space Grotesk (Headings) + Inter (Body)',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPaletteState] = useState<ThemePalette>(() => {
    return (localStorage.getItem('portfolio_palette_v2') as ThemePalette) || 'swiss-vermillion';
  });

  const [font, setFontState] = useState<FontPairing>(() => {
    return (localStorage.getItem('portfolio_font_v2') as FontPairing) || 'syne-modern';
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', palette);
    localStorage.setItem('portfolio_palette_v2', palette);
  }, [palette]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font', font);
    localStorage.setItem('portfolio_font_v2', font);
  }, [font]);

  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette);
  };

  const setFont = (newFont: FontPairing) => {
    setFontState(newFont);
  };

  return (
    <ThemeContext.Provider
      value={{
        palette,
        font,
        setPalette,
        setFont,
        isCustomizerOpen,
        setIsCustomizerOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
