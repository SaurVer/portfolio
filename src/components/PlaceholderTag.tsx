import React from 'react';

interface PlaceholderTagProps {
  text: string;
  className?: string;
  variant?: 'subtle' | 'highlight' | 'pill';
}

export const PlaceholderTag: React.FC<PlaceholderTagProps> = ({ 
  text, 
  className = '',
  variant = 'subtle' 
}) => {
  const isPlaceholder = text.includes('[') && text.includes(']');
  
  if (!isPlaceholder) {
    return <span className={className}>{text}</span>;
  }

  if (variant === 'pill') {
    return (
      <span 
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}
        title="Placeholder item to be replaced with final copy"
      >
        {text}
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-indigo-50 text-indigo-700 border border-dashed border-indigo-300 ${className}`}
      title="Placeholder item to be replaced with final copy"
    >
      {text}
    </span>
  );
};
