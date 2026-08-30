import React from 'react';
import { ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { BaseProject } from '../types';
import { PlaceholderTag } from './PlaceholderTag';

interface ProjectCardProps {
  project: BaseProject;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const isFeatured = project.isFeatured;

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-slate-400 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer overflow-hidden ${
        isFeatured ? 'ring-2 ring-slate-200' : ''
      }`}
    >
      {/* Subtle Background Glow for Featured Card */}
      {isFeatured && (
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--accent-main)' }} />
      )}

      {/* Top Header: Badge & Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-slate-100 border border-slate-200 text-slate-700">
            {isFeatured ? (
              <Sparkles className="w-3 h-3" style={{ color: 'var(--accent-main)' }} />
            ) : (
              <Layers className="w-3 h-3 text-slate-500" />
            )}
            <span>{project.categoryLabel}</span>
          </span>

          {project.status && (
            <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <PlaceholderTag text={project.status} />
            </span>
          )}
        </div>

        {/* Visual Mockup Container */}
        <div className="relative min-h-[160px] sm:min-h-[175px] w-full rounded-xl bg-slate-100/80 border border-slate-200 flex flex-col items-center justify-center p-6 overflow-hidden group-hover:border-slate-300 transition-colors">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" style={{ color: 'var(--accent-main)' }} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono font-bold text-slate-700 tracking-wider">
                  {project.isFeatured ? 'FLAGSHIP PRODUCT MOCKUP' : 'BUILD PROTOTYPE'}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  [IMAGE ASSET]
                </p>
              </div>
            </div>
          )}

          {/* Hover Overlay Badge */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <span className="px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform" style={{ backgroundColor: 'var(--accent-main)' }}>
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Project Title & Problem Statement */}
        <div className="space-y-2.5 pt-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold font-syne text-slate-900 transition-colors leading-snug">
              <PlaceholderTag text={project.title} />
            </h3>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs font-semibold leading-normal" style={{ color: 'var(--accent-main)' }}>
            <PlaceholderTag text={project.oneLiner} />
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            <PlaceholderTag text={project.shortDescription} />
          </p>
        </div>
      </div>

      {/* Tags Footer */}
      <div className="pt-5 border-t border-slate-100 mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-mono border border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
