import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, Linkedin, Mail, MapPin } from 'lucide-react';
import { profileData } from '../data/profileData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <footer className="relative bg-white text-slate-700 pt-12 pb-8 overflow-hidden border-t border-slate-200">
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {profileData.name.charAt(0)}
              </div>
              <span className="font-syne font-bold text-xl tracking-tight text-slate-900">
                {profileData.name.includes('[') ? 'PRODUCT & TECH PORTFOLIO' : profileData.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Turning complex operational problems into practical, human-centred software products through structured thinking and hands-on execution.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>{profileData.location}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for PM / TPM Opportunities</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-700"
                >
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-700"
                >
                  <span>My Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('courtbooking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>CourtBooking Case Study</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('btc-journey'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-700"
                >
                  <span>BTC Leadership Journey</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Get in Touch */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              Connect Directly
            </p>
            <p className="text-xs text-slate-600">
              Have an interesting product challenge, feedback on CourtBooking, or a project management opportunity?
            </p>

            {/* Interactive Message Box */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email to connect..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
                  required
                />
                <button
                  type="submit"
                  aria-label="Send connect request"
                  className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                >
                  {submitted ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {submitted && (
                <p className="text-[11px] text-emerald-600 font-semibold animate-in fade-in">
                  Thank you! I will get back to you shortly.
                </p>
              )}
            </form>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={profileData.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-indigo-700 transition-all group"
              >
                <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-indigo-700 transition-all group"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600" />
              </a>
            </div>
          </div>

        </div>

        {/* Big Editorial Watermark Branding */}
        <div className="pt-8 border-t border-slate-100 select-none overflow-hidden">
          <div className="text-center font-heading text-6xl sm:text-8xl md:text-9xl tracking-wider text-slate-200 uppercase whitespace-nowrap">
            {profileData.name.includes('[') ? 'PRODUCT · BUILDER · LEADER' : profileData.name}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-100 pt-6">
          <p>© {new Date().getFullYear()} All rights reserved. Crafted with structured product thinking.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
