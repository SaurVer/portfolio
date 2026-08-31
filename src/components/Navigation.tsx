import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Briefcase, Home, Compass, Sliders, Edit3, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { 
    profileData, 
    isLiveEditMode, 
    toggleLiveEditMode, 
    setIsContentEditorOpen,
    setIsLayoutManagerOpen 
  } = useContent();
  const { setIsCustomizerOpen } = useTheme();
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home', icon: Home },
    { label: 'My Projects', route: 'projects', icon: Briefcase },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Floating Brand Badge */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 hover:border-stone-400 transition-all group shadow-sm"
            aria-label="Go to Homepage"
          >
            <span className="font-bold tracking-tight text-xs sm:text-sm text-stone-900 group-hover:text-stone-700 transition-colors">
              Welcome to my Portfolio
            </span>
            <span className="text-[11px] font-mono text-stone-500 border-l border-stone-200 pl-2 hidden sm:inline">
              {profileData.name || 'Saurabh Verma'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('courtbooking')}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300 bg-cyan-100 px-2.5 py-1.5 text-[10px] font-bold text-cyan-950 shadow-md transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-200 sm:px-3 sm:text-[11px]"
          >
            <span>Access My Flagship Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Floating Desktop Menu Bar */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-md shadow-stone-200/40">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleLinkClick(item.route)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'font-bold shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/70'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--accent-soft)',
                        color: 'var(--accent-soft-text)',
                        borderColor: 'var(--accent-soft-border)',
                      }
                    : {}
                }
              >
                {item.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-main)' }} />
                )}
              </button>
            );
          })}

          {/* LinkedIn in new tab */}
          {profileData.linkedInUrl && (
            <a
              href={profileData.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100/70 transition-all flex items-center gap-1 group"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-950 transition-colors" />
            </a>
          )}
        </nav>

        {/* Right CTA Button & Theme Switcher */}
        <div className="pointer-events-auto flex items-center gap-2">
          {isDevelopment && <>
          {/* Edit Mode Toggle */}
          <button
            onClick={toggleLiveEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all border ${
              isLiveEditMode
                ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-amber-500/20'
                : 'bg-white/95 backdrop-blur-md border-stone-200 text-stone-700 hover:border-stone-400'
            }`}
            title={isLiveEditMode ? 'Live editing is active! Click any text to edit.' : 'Click to enable live editing mode'}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isLiveEditMode ? 'Editing ON' : 'Edit'}</span>
          </button>

          {/* Layout Manager Trigger */}
          <button
            onClick={() => setIsLayoutManagerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-700 hover:text-stone-950 hover:border-stone-400 text-xs font-medium shadow-sm transition-all"
            title="Move and resize page blocks"
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden xl:inline text-[11px] font-semibold">Blocks</span>
          </button>

          {/* Theme & Font Customizer Trigger */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-700 hover:text-stone-950 hover:border-stone-400 text-xs font-medium shadow-sm transition-all"
            title="Customize Theme & Fonts"
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent-main)' }} />
            <span className="hidden lg:inline text-[11px] font-semibold">Theme</span>
          </button>
          </>}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-stone-700 hover:text-stone-950 transition-colors shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 p-4 rounded-2xl bg-white/98 backdrop-blur-xl border border-stone-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                onClick={() => handleLinkClick(item.route)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'font-bold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--accent-soft)',
                        color: 'var(--accent-soft-text)',
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-main)' }} />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            {isDevelopment && <>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContentEditorOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-500 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <Edit3 className="w-4 h-4" />
                <span>Open Content Editor Form</span>
              </div>
              <span className="text-xs">✏️</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLayoutManagerOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-stone-800 hover:bg-stone-100 bg-stone-50 border border-stone-200"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Reorder & Resize Blocks</span>
              </div>
              <span className="text-xs font-mono font-medium">Layout</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 bg-stone-50/50"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />
                <span>Customize Theme & Font</span>
              </div>
              <span className="text-xs font-bold" style={{ color: 'var(--accent-main)' }}>Studio</span>
            </button>
            </>}

            <button
              type="button"
              onClick={() => handleLinkClick('courtbooking')}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold text-cyan-900 bg-cyan-50 hover:bg-cyan-100"
            >
              <span>Access My Flagship Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {profileData.linkedInUrl && (
              <a
                href={profileData.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-stone-500" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
