import React from 'react';
import { useTheme, THEME_PALETTES, FONT_PAIRINGS, ThemePalette, FontPairing } from '../context/ThemeContext';
import { X, Check, Palette, Type, Sparkles, Sliders, Brush } from 'lucide-react';

export const ThemeCustomizerModal: React.FC = () => {
  const { palette, font, setPalette, setFont, isCustomizerOpen, setIsCustomizerOpen } = useTheme();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: 'var(--accent-main)' }}
            >
              <Brush className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                Theme & Typography Studio
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Switch between human-crafted design systems and font pairings
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Section 1: Color Palettes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-stone-700" />
                <span>Curated Design Palettes</span>
              </label>
              <span className="text-[11px] text-stone-400 font-medium">Click to apply live</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {THEME_PALETTES.map((p) => {
                const isSelected = palette === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPalette(p.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                      isSelected
                        ? 'border-stone-900 ring-2 ring-stone-900/20 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                    }`}
                  >
                    {/* Swatch */}
                    <div className="w-12 h-12 rounded-xl border border-stone-200 shrink-0 overflow-hidden flex flex-col shadow-xs mt-0.5">
                      <div className="h-2/3 w-full flex items-center justify-center" style={{ backgroundColor: p.previewBg }}>
                        <span className="text-[10px] font-bold" style={{ color: p.previewText }}>Aa</span>
                      </div>
                      <div className="h-1/3 w-full" style={{ backgroundColor: p.previewAccent }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-stone-900 truncate">{p.name}</p>
                        {isSelected ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900 text-white shrink-0">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs font-semibold text-stone-600 mt-0.5">{p.subtitle}</p>
                      <p className="text-[11px] text-stone-500 leading-relaxed mt-1">{p.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Typography Pairings */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-stone-700" />
                <span>Typography Pairings</span>
              </label>
              <span className="text-[11px] text-stone-400 font-medium">Headings & Body Font</span>
            </div>

            <div className="space-y-2.5">
              {FONT_PAIRINGS.map((f) => {
                const isSelected = font === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFont(f.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all ${
                      isSelected
                        ? 'border-stone-900 ring-2 ring-stone-900/20 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-stone-900">{f.name}</p>
                        <span className="text-[11px] font-mono text-stone-400">({f.description})</span>
                      </div>
                      <p
                        className="text-base font-bold text-stone-800 tracking-tight"
                        style={{ fontFamily: f.fontHeading }}
                      >
                        {f.sample}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-stone-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Theme auto-persisted in local settings</span>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
