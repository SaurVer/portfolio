import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, HelpCircle } from 'lucide-react';
import { ScreenshotItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  screens: ScreenshotItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  screens,
  currentIndex,
  onSelectIndex
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % screens.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + screens.length) % screens.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, screens.length, onClose, onSelectIndex]);

  if (!isOpen || screens.length === 0) return null;

  const currentScreen = screens[currentIndex] || screens[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-lg transition-colors z-10"
        aria-label="Close screenshot preview"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left: Image / Mockup Viewport */}
        <div className="md:w-3/5 bg-slate-100 flex items-center justify-center p-6 relative min-h-[280px] md:min-h-[500px]">
          
          {/* If image URL is present */}
          {currentScreen.imageUrl ? (
            <img
              src={currentScreen.imageUrl}
              alt={currentScreen.screenTitle}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-md"
            />
          ) : (
            /* Visual Interactive Screenshot Placeholder Mockup */
            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl bg-white border-2 border-dashed border-slate-300 p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
                <Lightbulb className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
                  Screenshot & Annotation
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-syne">
                  {currentScreen.screenTitle}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  {currentScreen.shortDescription}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
                [ADD SCREENSHOT ASSET: {currentScreen.screenTitle}]
              </div>
            </div>
          )}

          {/* Nav arrows on image */}
          {screens.length > 1 && (
            <>
              <button
                onClick={() => onSelectIndex((currentIndex - 1 + screens.length) % screens.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 shadow-md transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => onSelectIndex((currentIndex + 1) % screens.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 shadow-md transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Right: Product Annotation & Decisions Panel */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6 bg-white">
          
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>SCREEN {currentIndex + 1} OF {screens.length}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  Product Breakdown
                </span>
              </div>
              <h3 id="lightbox-title" className="text-xl font-bold text-slate-900 font-syne">
                {currentScreen.screenTitle}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {currentScreen.shortDescription}
              </p>
            </div>

            {/* Problem Solved Card */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>User Problem Solved</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {currentScreen.userProblemSolved}
              </p>
            </div>

            {/* Product Decision & Rationale */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Product Decision & Trade-off</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {currentScreen.productDecision}
              </p>
            </div>

            {/* Optional Annotation callout */}
            {currentScreen.annotation && (
              <div className="text-xs text-slate-600 border-l-2 border-indigo-500 pl-3 py-1 italic bg-indigo-50/30">
                “{currentScreen.annotation}”
              </div>
            )}
          </div>

          {/* Bottom Thumbnail Selector */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
            {screens.map((screen, idx) => (
              <button
                key={screen.id}
                onClick={() => onSelectIndex(idx)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  idx === currentIndex
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Screen {idx + 1}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
