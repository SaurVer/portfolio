import React, { useState } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  GripVertical, 
  Maximize2, 
  Minimize2, 
  Columns, 
  Sliders, 
  Edit3,
  Check,
  MoreHorizontal
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionId, SectionWidth, SectionPadding } from '../types';

interface BlockContainerProps {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  allowColumnChange?: boolean;
  columnOptions?: number[];
  variantOptions?: { value: string; label: string }[];
  editTabTarget?: string;
}

const WIDTH_CLASSES: Record<SectionWidth, string> = {
  narrow: 'max-w-4xl lg:max-w-6xl',
  standard: 'max-w-6xl lg:max-w-[1600px]',
  wide: 'max-w-7xl lg:max-w-[1760px]',
  full: 'max-w-full px-4 sm:px-8 lg:px-12',
};

const PADDING_CLASSES: Record<SectionPadding, string> = {
  compact: 'py-4 sm:py-6',
  standard: 'py-8 sm:py-10 lg:py-6',
  spacious: 'py-14 sm:py-16 lg:py-12',
};

export const BlockContainer: React.FC<BlockContainerProps> = ({
  id,
  children,
  className = '',
  allowColumnChange = false,
  columnOptions = [1, 2, 4],
  variantOptions,
  editTabTarget,
}) => {
  const {
    blockLayouts,
    sectionOrder,
    updateSectionLayout,
    reorderSection,
    moveSectionToPosition,
    toggleSectionVisibility,
    isLiveEditMode,
    openEditorTab,
  } = useContent();

  const [showControlsMenu, setShowControlsMenu] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const config = blockLayouts[id];
  if (!config) return <>{children}</>;

  const currentIndex = sectionOrder.indexOf(id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sectionOrder.length - 1;

  // Handle Drag and Drop
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const sourceId = e.dataTransfer.getData('text/plain') as SectionId;
    if (sourceId && sourceId !== id) {
      const targetIndex = sectionOrder.indexOf(id);
      moveSectionToPosition(sourceId, targetIndex);
    }
  };

  // If section is hidden
  if (!config.visible) {
    if (!isLiveEditMode) return null;
    return (
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="max-w-6xl mx-auto px-4 py-4"
      >
        <div className="border border-dashed border-stone-300 bg-stone-100/70 rounded-2xl p-4 flex items-center justify-between text-stone-500">
          <div className="flex items-center gap-2 text-xs font-mono">
            <EyeOff className="w-4 h-4 text-stone-400" />
            <span className="font-semibold text-stone-700">{config.title}</span>
            <span className="text-stone-400">(Hidden Section)</span>
          </div>
          <button
            onClick={() => toggleSectionVisibility(id)}
            className="px-3 py-1 bg-white hover:bg-stone-50 text-stone-800 text-xs font-mono font-medium rounded-lg border border-stone-200 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Section</span>
          </button>
        </div>
      </div>
    );
  }

  const widthClass = WIDTH_CLASSES[config.width] || WIDTH_CLASSES.standard;
  const paddingClass = PADDING_CLASSES[config.padding] || PADDING_CLASSES.standard;

  return (
    <section
      id={`section-${id}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative transition-all duration-300 ${
        isDragOver ? 'ring-2 ring-blue-500 ring-offset-4 rounded-3xl bg-blue-50/20' : ''
      } ${
        isLiveEditMode ? 'group/block my-2' : ''
      } ${className}`}
    >
      {/* Visual Live Edit Frame & Controls */}
      {isLiveEditMode && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 z-30 pointer-events-auto select-none">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm transition-all hover:border-amber-400/80">
            
            {/* Left: Drag Handle & Title Badge */}
            <div className="flex items-center gap-2">
              <div
                draggable
                onDragStart={handleDragStart}
                className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors flex items-center gap-1"
                title="Drag to reorder section"
              >
                <GripVertical className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-800">
                  {config.title}
                </span>
              </div>

              {/* Quick Reorder Arrows */}
              <div className="flex items-center bg-stone-100/80 rounded-lg p-0.5 border border-stone-200/60">
                <button
                  onClick={() => reorderSection(id, 'up')}
                  disabled={isFirst}
                  title="Move section up"
                  className={`p-1 rounded text-stone-700 hover:text-stone-950 transition-colors ${
                    isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white shadow-xs'
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => reorderSection(id, 'down')}
                  disabled={isLast}
                  title="Move section down"
                  className={`p-1 rounded text-stone-700 hover:text-stone-950 transition-colors ${
                    isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white shadow-xs'
                  }`}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Width, Spacing, Columns & Visibility Controls */}
            <div className="flex items-center gap-1.5 flex-wrap">
              
              {/* Width Selector */}
              <div className="flex items-center gap-1 bg-stone-100/80 rounded-lg p-0.5 border border-stone-200/60 text-[10px] font-mono">
                <span className="text-stone-400 px-1 font-semibold">Width:</span>
                {(['narrow', 'standard', 'wide', 'full'] as SectionWidth[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => updateSectionLayout(id, { width: w })}
                    className={`px-2 py-0.5 rounded capitalize font-medium transition-all ${
                      config.width === w
                        ? 'bg-stone-900 text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-white'
                    }`}
                  >
                    {w === 'narrow' ? 'Sm' : w === 'standard' ? 'Md' : w === 'wide' ? 'Lg' : 'Full'}
                  </button>
                ))}
              </div>

              {/* Spacing / Padding Selector */}
              <div className="flex items-center gap-1 bg-stone-100/80 rounded-lg p-0.5 border border-stone-200/60 text-[10px] font-mono">
                <span className="text-stone-400 px-1 font-semibold">Padding:</span>
                {(['compact', 'standard', 'spacious'] as SectionPadding[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateSectionLayout(id, { padding: p })}
                    className={`px-1.5 py-0.5 rounded capitalize font-medium transition-all ${
                      config.padding === p
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-white'
                    }`}
                  >
                    {p === 'compact' ? 'Tight' : p === 'standard' ? 'Norm' : 'Spacious'}
                  </button>
                ))}
              </div>

              {/* Column count if applicable */}
              {allowColumnChange && columnOptions && (
                <div className="flex items-center gap-1 bg-stone-100/80 rounded-lg p-0.5 border border-stone-200/60 text-[10px] font-mono">
                  <Columns className="w-3 h-3 text-stone-400 ml-1" />
                  {columnOptions.map((cols) => (
                    <button
                      key={cols}
                      onClick={() => updateSectionLayout(id, { columns: cols })}
                      className={`px-1.5 py-0.5 rounded font-medium transition-all ${
                        config.columns === cols
                          ? 'bg-stone-900 text-white font-bold shadow-xs'
                          : 'text-stone-600 hover:text-stone-950 hover:bg-white'
                      }`}
                    >
                      {cols} Col
                    </button>
                  ))}
                </div>
              )}

              {/* Variant selector if applicable (e.g. Hero photo position) */}
              {variantOptions && variantOptions.length > 0 && (
                <div className="flex items-center gap-1 bg-stone-100/80 rounded-lg p-0.5 border border-stone-200/60 text-[10px] font-mono">
                  {variantOptions.map((vo) => (
                    <button
                      key={vo.value}
                      onClick={() => updateSectionLayout(id, { variant: vo.value })}
                      className={`px-1.5 py-0.5 rounded font-medium transition-all ${
                        config.variant === vo.value
                          ? 'bg-stone-900 text-white font-bold shadow-xs'
                          : 'text-stone-600 hover:text-stone-950 hover:bg-white'
                      }`}
                    >
                      {vo.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Form Editor Shortcut */}
              {editTabTarget && (
                <button
                  onClick={() => openEditorTab(editTabTarget)}
                  className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 transition-colors"
                  title="Edit content in form"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Hide button */}
              <button
                onClick={() => toggleSectionVisibility(id)}
                className="p-1 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600 transition-colors"
                title="Hide this section"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Render Content within dynamically resized container and padding */}
      <div className={`mx-auto ${widthClass} ${paddingClass} px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        {children}
      </div>
    </section>
  );
};
