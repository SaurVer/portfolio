import React from 'react';
import { Target, Hammer, Users, Compass, Trash2, Award, ShieldCheck, BookOpen, Flag } from 'lucide-react';
import { PrincipleItem } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from './EditableText';

interface PrincipleCardProps {
  principle: PrincipleItem;
  displayIndex: number;
  onRemove?: () => void;
}

export const PrincipleCard: React.FC<PrincipleCardProps> = ({ principle, displayIndex, onRemove }) => {
  const { isLiveEditMode, updatePrinciple } = useContent();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-4 h-4" />;
      case 'Hammer': return <Hammer className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Flag': return <Flag className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group hover:-translate-y-1 relative">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold border transition-colors"
            style={{ 
              backgroundColor: 'var(--accent-soft)',
              borderColor: 'var(--accent-soft-border)',
              color: 'var(--accent-soft-text)'
            }}
          >
            {String(displayIndex + 1).padStart(2, '0')}
          </div>
          <div 
            className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-500 group-hover:text-stone-900 transition-colors"
          >
            {getIcon(principle.iconName)}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold font-syne text-stone-900 leading-snug">
            <EditableText
              value={principle.title}
              onSave={(val) => updatePrinciple(principle.id, { title: val })}
              className="text-lg font-bold font-syne text-stone-900 leading-snug"
              labelHint="Principle Title"
            />
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            <EditableText
              value={principle.description}
              onSave={(val) => updatePrinciple(principle.id, { description: val })}
              multiline={true}
              className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal block"
              labelHint="Principle Description"
            />
          </p>
        </div>
      </div>

      {principle.actionableTakeaway && (
        <div className="pt-3.5 border-t border-stone-100">
          <p className="text-xs text-stone-500 leading-normal flex items-start gap-1.5">
            <span className="font-mono uppercase tracking-wider text-[10px] font-bold text-stone-700 mt-0.5">Takeaway:</span> 
            <EditableText
              value={principle.actionableTakeaway}
              onSave={(val) => updatePrinciple(principle.id, { actionableTakeaway: val })}
              onRemove={() => updatePrinciple(principle.id, { actionableTakeaway: '' })}
              className="italic text-xs text-stone-500"
              labelHint="Actionable Takeaway"
            />
          </p>
        </div>
      )}

      {/* Delete button in Live Edit Mode */}
      {isLiveEditMode && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 shadow-xs"
          title="Remove principle"
          aria-label="Remove principle"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
