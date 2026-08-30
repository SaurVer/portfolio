import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Trash2, EyeOff, RotateCcw } from 'lucide-react';

interface RemovableWrapperProps {
  id?: string;
  children: React.ReactNode;
  onRemove?: () => void;
  label?: string;
  className?: string;
  confirmPrompt?: string;
  showDeleteButton?: boolean;
}

export const RemovableWrapper: React.FC<RemovableWrapperProps> = ({
  id,
  children,
  onRemove,
  label = 'element',
  className = '',
  confirmPrompt,
  showDeleteButton = true,
}) => {
  const { isLiveEditMode, isElementHidden, hideElement } = useContent();
  const [isHovered, setIsHovered] = useState(false);

  // If this element has a custom ID and is marked as hidden
  if (id && isElementHidden(id)) {
    return null;
  }

  // When not in live edit mode, render children completely transparently
  if (!isLiveEditMode) {
    return <>{children}</>;
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (confirmPrompt) {
      if (!window.confirm(confirmPrompt)) {
        return;
      }
    }

    if (onRemove) {
      onRemove();
    } else if (id) {
      hideElement(id);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/removable relative ${className}`}
    >
      {children}

      {/* Floating removal trigger for this element */}
      {showDeleteButton && isHovered && (
        <div className="absolute -top-2.5 -right-2.5 z-40 flex items-center gap-1 bg-stone-900 text-white px-2 py-1 rounded-lg shadow-lg border border-stone-700 animate-in fade-in zoom-in-95 duration-150 pointer-events-auto">
          <span className="text-[10px] font-mono text-stone-300 font-semibold max-w-[120px] truncate">
            {label}
          </span>
          <button
            onClick={handleRemove}
            className="p-1 rounded bg-rose-600 hover:bg-rose-500 text-white transition-colors"
            title={`Remove ${label}`}
            aria-label={`Remove ${label}`}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
