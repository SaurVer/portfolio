import React from 'react';
import { ArrowUpRight, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react';
import { profileData } from '../data/profileData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-white text-slate-700 pt-12 pb-8 overflow-hidden border-t border-slate-200">
      
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="relative max-w-6xl lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Explore */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('courtbooking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 text-slate-700"
                >
                  <span>CourtBooking App</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
              Connect Directly
            </p>
            <p className="text-sm text-slate-600">Connect to chat</p>
            <div className="flex flex-col items-start gap-2">
              <a
                href="https://wa.me/918947021709"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-indigo-600" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a href="tel:+918947021709" className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-700 transition-colors">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>+91 89470 21709</span>
              </a>
              <a href="mailto:saurabhverma561@gmail.com" className="flex items-center gap-2 text-sm text-slate-700 hover:text-indigo-700 transition-colors">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>saurabhverma561@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
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
            </div>
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
