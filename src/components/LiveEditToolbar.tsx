import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Edit3, 
  CheckCircle2, 
  SlidersHorizontal, 
  Layers,
  Download, 
  RotateCcw, 
  Eye, 
  Copy,
  Check,
  Move
} from 'lucide-react';

export const LiveEditToolbar: React.FC = () => {
  const { 
    isLiveEditMode, 
    toggleLiveEditMode, 
    setIsContentEditorOpen, 
    setIsLayoutManagerOpen,
    resetToDefaults, 
    exportJSON 
  } = useContent();

  const [copied, setCopied] = useState(false);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio_data_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <aside aria-label="Live Content Editor" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      
      {/* Floating Toolbar Container */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-stone-900/95 backdrop-blur-md border border-stone-700 text-white shadow-2xl transition-all">
        
        {/* Toggle Live Edit Button */}
        <button
          onClick={toggleLiveEditMode}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            isLiveEditMode
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'bg-stone-800 text-stone-300 hover:text-white'
          }`}
          title={isLiveEditMode ? 'Live Edit is Active (Click text to edit, drag/resize blocks)' : 'Click to enable live editing'}
        >
          {isLiveEditMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isLiveEditMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
          <span 
            className={`w-2 h-2 rounded-full ${isLiveEditMode ? 'bg-stone-950 animate-pulse' : 'bg-stone-500'}`} 
          />
        </button>

        {/* Layout & Block Manager Button */}
        <button
          onClick={() => setIsLayoutManagerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors"
          title="Reorder, move, and resize page blocks"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Blocks & Layout</span>
        </button>

        {/* Quick Open Form Editor Modal */}
        <button
          onClick={() => setIsContentEditorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors"
          title="Open structured form editor for all content"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span className="hidden sm:inline">Content Form</span>
        </button>

        {/* Export / Copy Data */}
        <button
          onClick={handleCopyJSON}
          className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          title="Copy content & layout as JSON"
          aria-label="Copy content as JSON"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleDownloadJSON}
          className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          title="Download content & layout backup JSON"
          aria-label="Download backup JSON"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Reset to Defaults */}
        <button
          onClick={resetToDefaults}
          className="p-1.5 rounded-full hover:bg-rose-950 hover:text-rose-400 text-stone-400 transition-colors"
          title="Reset to default content and layout"
          aria-label="Reset to default content"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Helper Banner when live edit is active */}
      {isLiveEditMode && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Click text to edit • Drag / use top bar to move & resize sections</span>
        </div>
      )}

    </aside>
  );
};
