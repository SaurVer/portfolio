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
  bulletList?: boolean;
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
  bulletList = false,
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
    } else if (e.key === 'Tab' && multiline && bulletList) {
      e.preventDefault();
      const input = inputRef.current;
      if (!input) return;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || start;
      const indentation = '  ';
      setDraft(`${draft.slice(0, start)}${indentation}${draft.slice(end)}`);
      requestAnimationFrame(() => {
        input.selectionStart = input.selectionEnd = start + indentation.length;
      });
    } else if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const renderValue = () => {
    if (!bulletList) return value;

    const points = value
      .split(/\r?\n/)
      .map((line) => {
        const indentation = line.match(/^[\t ]*/)?.[0] || '';
        const spaces = indentation.replace(/\t/g, '  ').length;
        return {
          text: line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim(),
          level: Math.min(3, Math.floor(spaces / 2)),
        };
      })
      .filter((point) => Boolean(point.text));

    return (
      <ul className="space-y-1.5 pl-4 list-disc marker:text-stone-400">
        {points.map((point, index) => (
          <li
            key={`${point.text}-${index}`}
            className={point.level > 0 ? 'marker:text-stone-300' : ''}
            style={{ marginLeft: `${point.level * 16}px`, listStyleType: point.level > 0 ? 'circle' : 'disc' }}
          >
            {point.text}
          </li>
        ))}
      </ul>
    );
  };

  // Deleted text stays fully removed from both the public view and live editor.
  // It can still be restored through the form editor or Reset to Defaults.
  if (!value) {
    return null;
  }

  // If not in live edit mode, render regular element
  if (!isLiveEditMode) {
    return (
      <Component className={className} style={style}>
        {renderValue()}
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
            <button
              onClick={handleRemove}
              className="p-1.5 rounded-lg hover:bg-rose-700 transition-colors text-rose-300 hover:text-white border-l border-stone-700 pl-2 ml-0.5"
              title="Delete this text element"
              aria-label="Delete text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
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
      {value ? renderValue() : (
        <span className="text-stone-400 italic">
          {placeholder}
        </span>
      )}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 inline-flex items-center align-middle gap-1 text-[10px] font-mono bg-stone-900 text-white px-1.5 py-0.5 rounded shadow-xs">
        <span className="text-amber-400 flex items-center">
          <Edit3 className="w-2.5 h-2.5 mr-0.5 inline" />
          Edit
        </span>
        <button
          onClick={handleRemove}
          className="hover:text-rose-400 p-0.5 rounded transition-colors"
          title="Remove element"
          aria-label={`Remove ${labelHint || 'text element'}`}
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </span>
    </Component>
  );
};
