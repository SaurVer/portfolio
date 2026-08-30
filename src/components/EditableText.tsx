import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Check, X, Edit3, Trash2 } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  onRemove?: () => void;
  elementId?: string;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  style?: React.CSSProperties;
  labelHint?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  onRemove,
  elementId,
  multiline = false,
  placeholder = 'Click to edit...',
  className = '',
  as: Component = 'span',
  style,
  labelHint,
}) => {
  const { isLiveEditMode, isElementHidden, hideElement } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // If this element has an ID and is hidden
  if (elementId && isElementHidden(elementId)) {
    return null;
  }

  useEffect(() => {
    setDraft(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (draft !== value) {
      onSave(draft);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraft(value || '');
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else if (elementId) {
      hideElement(elementId);
    } else {
      onSave('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  // If not in live edit mode, render regular element
  if (!isLiveEditMode) {
    if (!value && !placeholder) return null;
    return (
      <Component className={className} style={style}>
        {value || placeholder}
      </Component>
    );
  }

  // Active editing state
  if (isEditing) {
    return (
      <span className="inline-flex flex-col gap-1.5 w-full my-1 z-30 relative animate-in fade-in duration-150">
        {labelHint && (
          <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider">
            Editing: {labelHint}
          </span>
        )}
        <div className="flex items-start gap-1.5 w-full">
          {multiline ? (
            <textarea
              ref={inputRef as any}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={Math.min(8, Math.max(3, draft.split('\n').length + 1))}
              className="w-full p-2.5 rounded-xl bg-white border-2 border-stone-800 text-stone-900 text-sm font-sans leading-relaxed shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              placeholder={placeholder}
            />
          ) : (
            <input
              ref={inputRef as any}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 rounded-xl bg-white border-2 border-stone-800 text-stone-900 text-sm font-sans shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              placeholder={placeholder}
            />
          )}

          <div className="flex items-center gap-1 shrink-0 bg-stone-900 text-white p-1 rounded-xl shadow-md">
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg hover:bg-emerald-600 transition-colors text-white"
              title="Save (Enter)"
              aria-label="Save"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg hover:bg-rose-600 transition-colors text-stone-300 hover:text-white"
              title="Cancel (Esc)"
              aria-label="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {(onRemove || elementId) && (
              <button
                onClick={handleRemove}
                className="p-1.5 rounded-lg hover:bg-rose-700 transition-colors text-rose-300 hover:text-white border-l border-stone-700 pl-2 ml-0.5"
                title="Delete this text element"
                aria-label="Delete text"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        <span className="text-[9px] font-mono text-stone-500">
          Press {multiline ? 'Shift+Enter for newline' : 'Enter'} to save · Esc to cancel
        </span>
      </span>
    );
  }

  // Hoverable inline trigger when Live Edit Mode is ON
  return (
    <Component
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`group relative cursor-pointer transition-all duration-150 rounded-md px-1 -mx-1 hover:bg-amber-500/10 hover:outline-2 hover:outline-dashed hover:outline-amber-500/60 ${className}`}
      style={style}
      title="Click to edit this text"
    >
      {value || (
        <span className="text-stone-400 italic">
          {placeholder}
        </span>
      )}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 inline-flex items-center align-middle gap-1 text-[10px] font-mono bg-stone-900 text-white px-1.5 py-0.5 rounded shadow-xs">
        <span className="text-amber-400 flex items-center">
          <Edit3 className="w-2.5 h-2.5 mr-0.5 inline" />
          Edit
        </span>
        {(onRemove || elementId) && (
          <button
            onClick={handleRemove}
            className="hover:text-rose-400 p-0.5 rounded transition-colors"
            title="Remove element"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        )}
      </span>
    </Component>
  );
};
