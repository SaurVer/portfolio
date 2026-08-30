import React from 'react';
import { ArrowLeft, Home, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <div className="space-y-2">
        <h1 className="text-5xl sm:text-7xl font-bold font-syne text-slate-900">404</h1>
        <h2 className="text-xl font-bold font-syne text-slate-700">Page Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm">
          The project or page you are looking for might have been moved or renamed.
        </p>
      </div>
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all"
      >
        <Home className="w-4 h-4" /> Return to Home
      </button>
    </div>
  );
};
