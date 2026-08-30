import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Workflow, Lightbulb, ShieldAlert, Cpu } from 'lucide-react';
import { SmallerProjectCaseStudy } from '../types';
import { PlaceholderTag } from '../components/PlaceholderTag';

interface SmallerProjectPageProps {
  project: SmallerProjectCaseStudy;
  onNavigate: (route: string) => void;
  nextProjectSlug?: string;
  nextProjectTitle?: string;
}

export const SmallerProjectPage: React.FC<SmallerProjectPageProps> = ({
  project,
  onNavigate,
  nextProjectSlug,
  nextProjectTitle
}) => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back Button */}
      <button
        onClick={() => onNavigate('projects')}
        className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Projects</span>
      </button>

      {/* Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span 
            className="px-3.5 py-1 rounded-full text-xs font-mono font-bold border"
            style={{ 
              backgroundColor: 'var(--accent-soft)', 
              borderColor: 'var(--accent-soft-border)',
              color: 'var(--accent-soft-text)'
            }}
          >
            {project.categoryLabel}
          </span>
          {project.status && (
            <span className="px-3.5 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-600">
              <PlaceholderTag text={project.status} />
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-syne text-stone-900 leading-tight">
          <PlaceholderTag text={project.title} />
        </h1>

        <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
          <PlaceholderTag text={project.oneLiner} />
        </p>

        {project.appUrl && (
          <div className="pt-2 flex items-center gap-3">
            <span 
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold font-mono shadow-md"
              style={{ backgroundColor: 'var(--accent-main)' }}
            >
              <span>{project.appUrl}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </section>

      {/* Structured Narrative */}
      <section className="space-y-10">
        
        {/* 1. The Problem */}
        <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
            <ShieldAlert className="w-4 h-4" />
            <span>01. The Problem</span>
          </div>
          <h2 className="text-xl font-bold font-syne text-stone-900">
            What difficulty existed and why solve it?
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            <PlaceholderTag text={project.problem} />
          </p>
        </div>

        {/* 2. What I Built */}
        <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
            <Cpu className="w-4 h-4" />
            <span>02. What I Built</span>
          </div>
          <h2 className="text-xl font-bold font-syne text-stone-900">
            Practical Solution Overview
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            <PlaceholderTag text={project.whatIBuilt} />
          </p>

          {/* If resource structure exists */}
          {project.resourceStructure && (
            <div className="pt-4 space-y-2">
              <h4 className="text-xs font-mono text-stone-500 uppercase font-semibold">
                Architecture & Structured Taxonomy:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.resourceStructure.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Workflow Steps Diagram (for Alarm Setter / Automations) */}
        {project.workflowSteps && (
          <div className="p-7 rounded-3xl bg-stone-50 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
              <Workflow className="w-4 h-4" />
              <span>Automation Workflow Diagram</span>
            </div>
            <h2 className="text-xl font-bold font-syne text-stone-900">
              How the Automation Pipeline Connects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {project.workflowSteps.map((wf, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
                  <span className="text-[11px] font-mono uppercase font-bold" style={{ color: 'var(--accent-main)' }}>
                    {wf.step}
                  </span>
                  <p className="text-xs font-bold text-stone-900 font-syne">{wf.tool}</p>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">{wf.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. How It Worked */}
        <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
            <span>03. How It Worked</span>
          </div>
          <h2 className="text-xl font-bold font-syne text-stone-900">
            Operational Mechanics & Architecture
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            <PlaceholderTag text={project.howItWorked} />
          </p>
        </div>

        {/* 5. My Contribution */}
        <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
            <span>04. My Contribution</span>
          </div>
          <h2 className="text-xl font-bold font-syne text-stone-900">
            Hands-on Ownership & Execution
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            <PlaceholderTag text={project.myContribution} />
          </p>
        </div>

        {/* 6. Metrics & Outcome */}
        <div className="space-y-4">
          <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>05. Outcome & Impact</span>
            </div>
            <h2 className="text-xl font-bold font-syne text-stone-900">
              Tangible Results Achieved
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              <PlaceholderTag text={project.outcome} />
            </p>
          </div>

          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
                  <span className="text-2xl font-heading text-stone-900">
                    <PlaceholderTag text={m.value} />
                  </span>
                  <p className="text-xs font-bold font-syne" style={{ color: 'var(--accent-main)' }}>{m.label}</p>
                  <p className="text-[11px] text-stone-500">{m.context}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 7. What I Learned */}
        <div 
          className="p-7 rounded-2xl border space-y-2"
          style={{ 
            backgroundColor: 'var(--accent-soft)', 
            borderColor: 'var(--accent-soft-border)' 
          }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-soft-text)' }}>
            <Lightbulb className="w-4 h-4" />
            <span>06. What I Learned</span>
          </div>
          <h2 className="text-xl font-bold font-syne text-stone-900">
            Key Product & Engineering Insight
          </h2>
          <p className="text-sm text-stone-800 leading-relaxed italic font-medium">
            “{project.whatILearned}”
          </p>
        </div>

      </section>

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> All Projects
        </button>

        {nextProjectSlug && (
          <button
            onClick={() => { onNavigate(nextProjectSlug); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-mono hover:underline font-bold"
            style={{ color: 'var(--accent-main)' }}
          >
            <span>Next: {nextProjectTitle || 'Next Project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
