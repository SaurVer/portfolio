import React, { useState } from 'react';
import { Search, Calendar, CheckSquare, Lock, CheckCircle, Settings, ChevronRight } from 'lucide-react';
import { UserFlowStep } from '../types';

interface UserJourneyFlowProps {
  steps: UserFlowStep[];
}

export const UserJourneyFlow: React.FC<UserJourneyFlowProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      case 'CheckSquare': return <CheckSquare className="w-4 h-4" />;
      case 'Lock': return <Lock className="w-4 h-4" />;
      case 'CheckCircle': return <CheckCircle className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Horizontal Flow Steps Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? 'border-stone-800 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
              style={
                isSelected
                  ? {
                      backgroundColor: 'var(--accent-soft)',
                      borderColor: 'var(--accent-soft-border)',
                    }
                  : {}
              }
            >
              <div className="flex items-center justify-between">
                <span 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isSelected ? 'text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                  style={isSelected ? { backgroundColor: 'var(--accent-main)' } : {}}
                >
                  {step.stepNumber}
                </span>
                <span style={isSelected ? { color: 'var(--accent-main)' } : { color: 'var(--text-muted)' }}>
                  {getIcon(step.iconName)}
                </span>
              </div>
              <div>
                <p 
                  className="text-xs font-bold font-syne line-clamp-1"
                  style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {step.title}
                </p>
                <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Step {step.stepNumber} of {steps.length}
                </p>
              </div>
              {isSelected && (
                <span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--accent-main)' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step In-Depth Detail Card */}
      {steps[activeStep] && (
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <span 
                className="w-8 h-8 rounded-xl text-white font-bold flex items-center justify-center font-mono text-sm shadow-xs"
                style={{ backgroundColor: 'var(--accent-main)' }}
              >
                {steps[activeStep].stepNumber}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--accent-main)' }}>
                  Active User Interaction
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-syne">
                  {steps[activeStep].title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-stone-100 disabled:opacity-30 text-xs font-mono text-stone-700 hover:bg-stone-200 border border-stone-200"
              >
                ← Prev
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg disabled:opacity-30 text-xs font-mono font-bold text-white shadow-xs hover:opacity-90"
                style={{ backgroundColor: 'var(--accent-main)' }}
              >
                Next →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-mono text-stone-500 font-bold uppercase">User Action:</span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {steps[activeStep].action}
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl border" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent-soft-border)' }}>
              <span className="text-xs font-mono font-bold uppercase" style={{ color: 'var(--accent-soft-text)' }}>System Response & Feedback:</span>
              <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-medium">
                {steps[activeStep].systemResponse}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
