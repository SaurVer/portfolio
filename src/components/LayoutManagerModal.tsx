import React from 'react';
import { 
  X, 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Maximize2, 
  RotateCcw, 
  GripVertical,
  Check,
  Columns,
  Sparkles
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionId, SectionWidth, SectionPadding } from '../types';

export const LayoutManagerModal: React.FC = () => {
  const {
    isLayoutManagerOpen,
    setIsLayoutManagerOpen,
    blockLayouts,
    sectionOrder,
    updateSectionLayout,
    reorderSection,
    moveSectionToPosition,
    toggleSectionVisibility,
    resetBlockLayouts,
  } = useContent();

  if (!isLayoutManagerOpen) return null;

  const handleDragStart = (e: React.DragEvent, id: SectionId) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent, targetId: SectionId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain') as SectionId;
    if (sourceId && sourceId !== targetId) {
      const targetIndex = sectionOrder.indexOf(targetId);
      moveSectionToPosition(sourceId, targetIndex);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-stone-950 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-syne text-stone-900">
                Layout & Block Manager
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                Reorder, resize, and customize page blocks and sections
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLayoutManagerOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: List of Sections */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-xs text-stone-600">
            Drag items or use the arrows to reorder sections. Use the width & padding controls to change how each block fills the screen.
          </p>

          <div className="space-y-3">
            {sectionOrder.map((secId, index) => {
              const config = blockLayouts[secId];
              if (!config) return null;

              const isFirst = index === 0;
              const isLast = index === sectionOrder.length - 1;

              return (
                <div
                  key={secId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, secId)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, secId)}
                  className={`p-4 rounded-2xl border transition-all ${
                    config.visible
                      ? 'bg-stone-50/80 border-stone-200 hover:border-stone-400 hover:shadow-xs'
                      : 'bg-stone-100/60 border-dashed border-stone-300 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Left: Grip + Order + Title */}
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-stone-200 text-stone-400">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 text-xs font-mono font-bold flex items-center justify-center">
                        {index + 1}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-stone-900 font-syne">
                          {config.title}
                        </h4>
                        <span className="text-[11px] font-mono text-stone-500">
                          ID: #{config.id}
                        </span>
                      </div>
                    </div>

                    {/* Right: Controls (Reorder, Width, Visibility) */}
                    <div className="flex items-center gap-2 flex-wrap">
                      
                      {/* Width buttons */}
                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 text-[10px] font-mono">
                        <span className="text-stone-400 px-1 font-semibold">Width:</span>
                        {(['narrow', 'standard', 'wide', 'full'] as SectionWidth[]).map((w) => (
                          <button
                            key={w}
                            onClick={() => updateSectionLayout(secId, { width: w })}
                            className={`px-1.5 py-0.5 rounded capitalize ${
                              config.width === w
                                ? 'bg-stone-900 text-white font-bold'
                                : 'text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            {w === 'narrow' ? 'Sm' : w === 'standard' ? 'Md' : w === 'wide' ? 'Lg' : 'Full'}
                          </button>
                        ))}
                      </div>

                      {/* Up / Down Reorder */}
                      <div className="flex items-center bg-white p-1 rounded-xl border border-stone-200">
                        <button
                          onClick={() => reorderSection(secId, 'up')}
                          disabled={isFirst}
                          className={`p-1 rounded text-stone-700 hover:bg-stone-100 ${
                            isFirst ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => reorderSection(secId, 'down')}
                          disabled={isLast}
                          className={`p-1 rounded text-stone-700 hover:bg-stone-100 ${
                            isLast ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Visibility Toggle */}
                      <button
                        onClick={() => toggleSectionVisibility(secId)}
                        className={`p-2 rounded-xl border transition-all ${
                          config.visible
                            ? 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}
                        title={config.visible ? 'Hide section' : 'Show section'}
                      >
                        {config.visible ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Reset all section layout positions and widths back to default?')) {
                resetBlockLayouts();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Layout</span>
          </button>

          <button
            onClick={() => setIsLayoutManagerOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-bold shadow-sm transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
