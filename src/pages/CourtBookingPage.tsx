import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Calendar, Building, User, Wrench, 
  CheckCircle2, AlertCircle, Sparkles, Layers, ZoomIn 
} from 'lucide-react';
import { courtBookingData } from '../data/courtBookingData';
import { UserJourneyFlow } from '../components/UserJourneyFlow';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { LightboxModal } from '../components/LightboxModal';
import { PlaceholderTag } from '../components/PlaceholderTag';

interface CourtBookingPageProps {
  onNavigate: (route: string) => void;
}

export const CourtBookingPage: React.FC<CourtBookingPageProps> = ({ onNavigate }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const n = courtBookingData.narrative;

  const openLightbox = (index: number) => {
    setActiveScreenIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Back Button */}
      <button
        onClick={() => onNavigate('projects')}
        className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </button>

      {/* 1. OPENING HERO & METADATA SECTION */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="px-3.5 py-1 rounded-full text-xs font-mono font-bold"
              style={{ 
                backgroundColor: 'var(--accent-soft)', 
                color: 'var(--accent-soft-text)', 
                border: '1px solid var(--accent-soft-border)' 
              }}
            >
              Flagship Product Case Study
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-600">
              {courtBookingData.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-syne text-stone-900 tracking-tight leading-tight">
            {courtBookingData.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-stone-700 font-normal leading-relaxed">
            {courtBookingData.oneLiner}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 shadow-sm text-xs">
          <div className="space-y-1.5">
            <span className="text-stone-400 font-mono flex items-center gap-1.5 font-semibold">
              <User className="w-3.5 h-3.5" style={{ color: 'var(--accent-main)' }} /> My Role
            </span>
            <p className="font-bold text-stone-900 text-sm">
              <PlaceholderTag text={courtBookingData.myRole} />
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-stone-400 font-mono flex items-center gap-1.5 font-semibold">
              <Building className="w-3.5 h-3.5" style={{ color: 'var(--accent-main)' }} /> Institution
            </span>
            <p className="font-bold text-stone-900 text-sm">
              {courtBookingData.institution}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-stone-400 font-mono flex items-center gap-1.5 font-semibold">
              <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--accent-main)' }} /> Timeline
            </span>
            <p className="font-bold text-stone-900 text-sm">
              <PlaceholderTag text={courtBookingData.projectPeriod} />
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-stone-400 font-mono flex items-center gap-1.5 font-semibold">
              <Wrench className="w-3.5 h-3.5" style={{ color: 'var(--accent-main)' }} /> Technologies
            </span>
            <p className="font-bold text-stone-900 text-sm truncate">
              {courtBookingData.toolsUsed.join(', ')}
            </p>
          </div>
        </div>

        {/* Action Button & Hero Screenshot Frame */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={courtBookingData.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold transition-all shadow-md hover:opacity-90 group"
              style={{ backgroundColor: 'var(--accent-main)' }}
            >
              <span>Try the App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hero Mockup Frame */}
          <div className="min-h-[260px] sm:min-h-[320px] w-full rounded-3xl bg-stone-100/90 border border-stone-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-3.5 relative overflow-hidden shadow-inner">
            <div 
              className="w-16 h-16 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs"
              style={{ color: 'var(--accent-main)' }}
            >
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold font-syne text-stone-900">
                CourtBooking Application Interface
              </p>
              <p className="text-xs text-stone-500 font-mono font-medium">
                {courtBookingData.heroScreenshot}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            01. Background & Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            The Problem
          </h2>
        </div>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
          {n.theProblem.overview}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {n.theProblem.painPoints.map((pain, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-700 leading-relaxed font-medium">{pain}</p>
            </div>
          ))}
        </div>

        <div 
          className="p-5 rounded-xl border space-y-1"
          style={{ 
            backgroundColor: 'var(--accent-soft)', 
            borderColor: 'var(--accent-soft-border)' 
          }}
        >
          <p className="text-xs font-mono uppercase font-bold" style={{ color: 'var(--accent-soft-text)' }}>
            Why This Was Worth Solving:
          </p>
          <p className="text-xs text-stone-800 leading-relaxed font-medium">
            {n.theProblem.whyWorthSolving}
          </p>
        </div>
      </section>

      {/* 3. USERS AND CONTEXT */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            02. User Persona & Constraints
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Users & Context
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-stone-900 font-syne">
              Target Audience
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              {n.usersAndContext.targetAudience}
            </p>
            <div className="pt-2 border-t border-stone-100">
              <h5 className="text-[11px] font-mono text-stone-500 uppercase font-semibold">Context of Use:</h5>
              <p className="text-xs text-stone-700 mt-1 font-medium">{n.usersAndContext.contextOfUse}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-stone-900 font-syne">
              Key Needs & Constraints
            </h4>
            <ul className="space-y-2.5">
              {n.usersAndContext.keyNeedsAndConstraints.map((item, idx) => (
                <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT JOURNEY */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            03. Evolution
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Product Journey
          </h2>
        </div>

        <div className="space-y-4">
          {n.productJourney.milestones.map((ms, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
              <span 
                className="px-2.5 py-1 rounded font-mono text-xs font-bold shrink-0 border"
                style={{ 
                  backgroundColor: 'var(--accent-soft)', 
                  borderColor: 'var(--accent-soft-border)',
                  color: 'var(--accent-soft-text)'
                }}
              >
                Phase {idx + 1}
              </span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900 font-syne">{ms.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">{ms.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. USER JOURNEY FLOW */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            04. User Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            End-to-End User Experience
          </h2>
          <p className="text-xs text-stone-600">
            Interactive representation of how a student books a court in under 25 seconds.
          </p>
        </div>

        <UserJourneyFlow steps={n.userJourney} />
      </section>

      {/* 6. APP SCREENS & ANNOTATIONS */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
              05. Screen Teardown
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
              App Screens & Annotations
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Click any card to zoom
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {n.screenshots.map((screen, idx) => (
            <div
              key={screen.id}
              onClick={() => openLightbox(idx)}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 shadow-sm hover:shadow-lg transition-all cursor-pointer space-y-4 group"
            >
              <div className="min-h-[160px] sm:min-h-[180px] w-full rounded-xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:border-stone-400 transition-colors">
                <span className="text-xs font-mono text-stone-600 group-hover:text-stone-900 transition-colors font-semibold">
                  [SCREENSHOT: {screen.screenTitle}]
                </span>
                <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span 
                    className="px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                    style={{ backgroundColor: 'var(--accent-main)' }}
                  >
                    <ZoomIn className="w-3.5 h-3.5" /> Lightbox View
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold font-syne text-stone-900 transition-colors">
                  {screen.screenTitle}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {screen.shortDescription}
                </p>
                <div 
                  className="pt-2 text-[11px] font-mono font-semibold border-t border-stone-100"
                  style={{ color: 'var(--accent-main)' }}
                >
                  Problem Solved: {screen.userProblemSolved}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. KEY FEATURES AND PROBLEMS SOLVED */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            06. Feature Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Key Features & Problems Solved
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {n.keyFeatures.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-base font-bold text-stone-900 font-syne flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-main)' }} />
                {feat.feature}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700">
                  <span className="font-mono font-bold" style={{ color: 'var(--accent-main)' }}>User Need:</span> {feat.userProblem}
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-700">
                  <span className="text-emerald-700 font-mono font-bold">Design Decision:</span> {feat.designDecision}
                </div>
                <p className="text-[11px] text-stone-500 font-mono pt-1">
                  Expected Benefit: {feat.expectedBenefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. IMPORTANT DESIGN DECISIONS */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            07. Product Rationale
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Important Design Decisions
          </h2>
        </div>

        <div className="space-y-4">
          {n.designDecisions.map((decision, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-base font-bold text-stone-900 font-syne">
                {decision.decision}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                  <span className="text-amber-900 font-mono font-bold block mb-1">Trade-off Considered:</span>
                  <p className="text-amber-950 leading-relaxed font-medium">{decision.tradeOffConsidered}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <span className="text-emerald-900 font-mono font-bold block mb-1">Chosen Solution & Why:</span>
                  <p className="text-emerald-950 leading-relaxed font-medium">{decision.rationale}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. ITERATIONS */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            08. Continuous Improvement
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Iterations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {n.iterations.map((iter, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded border"
                  style={{ 
                    backgroundColor: 'var(--accent-soft)', 
                    borderColor: 'var(--accent-soft-border)',
                    color: 'var(--accent-soft-text)'
                  }}
                >
                  {iter.phase}
                </span>
                <span className="text-[11px] font-mono text-stone-500">{iter.visualNote}</span>
              </div>
              <h4 className="text-lg font-bold text-stone-900 font-syne">{iter.versionTitle}</h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {iter.keyChanges.map((change, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                    <span className="font-medium">{change}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                <span className="font-mono font-bold" style={{ color: 'var(--accent-main)' }}>Key Learning:</span> {iter.learningsTriggered}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRODUCT AND TECHNICAL ARCHITECTURE */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            09. System Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Product & Technical Architecture
          </h2>
          <p className="text-xs text-stone-600">
            Engineered for high concurrency, zero data corruption, and sub-100ms response times.
          </p>
        </div>

        <ArchitectureDiagram nodes={n.architecture} />
      </section>

      {/* 11. ADOPTION AND IMPACT */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            10. Results & Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Adoption & Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {n.adoptionAndImpact.metrics.map((metric, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <span className="text-2xl sm:text-3xl font-heading text-stone-900">
                <PlaceholderTag text={metric.value} />
              </span>
              <p className="text-xs font-bold font-syne" style={{ color: 'var(--accent-main)' }}>{metric.label}</p>
              <p className="text-[11px] text-stone-500 leading-tight">{metric.context}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-sm font-bold font-syne uppercase tracking-wider text-stone-900">
              Qualitative Impact
            </h4>
            <ul className="space-y-2 text-xs text-stone-700">
              {n.adoptionAndImpact.qualitativeImpact.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-sm font-bold font-syne uppercase tracking-wider text-stone-900">
              User & Stakeholder Feedback
            </h4>
            <div className="space-y-3 text-xs text-stone-700 italic">
              {n.adoptionAndImpact.feedbackReceived.map((fb, idx) => (
                <p key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  {fb}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. LEARNINGS AND NEXT STEPS */}
      <section className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            11. Retrospective & Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Learnings & Next Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold font-syne" style={{ color: 'var(--accent-main)' }}>
              Key Learnings
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {n.learningsAndNextSteps.keyLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                  <span className="font-medium">{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-emerald-800 font-syne">
              Next Steps & Product Roadmap
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-700">
              {n.learningsAndNextSteps.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA & Project Navigation */}
      <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> All Projects
        </button>

        <a
          href={courtBookingData.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-md hover:opacity-90"
          style={{ backgroundColor: 'var(--accent-main)' }}
        >
          Try the Live App →
        </a>

        <button
          onClick={() => onNavigate('cohort-learning')}
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 font-semibold"
        >
          Next: Cohort Learning Website <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        screens={n.screenshots}
        currentIndex={activeScreenIndex}
        onSelectIndex={setActiveScreenIndex}
      />

    </div>
  );
};
