import React from 'react';
import { 
  ArrowLeft, Award, Calendar, CheckCircle2, ShieldCheck, 
  Users, Sparkles, Clock, Target, Lightbulb, Camera 
} from 'lucide-react';
import { btcJourneyData } from '../data/btcJourneyData';
import { PlaceholderTag } from '../components/PlaceholderTag';

interface BTCJourneyPageProps {
  onNavigate: (route: string) => void;
}

export const BTCJourneyPage: React.FC<BTCJourneyPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span 
            className="px-3.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border"
            style={{ 
              backgroundColor: 'var(--accent-soft)', 
              borderColor: 'var(--accent-soft-border)',
              color: 'var(--accent-soft-text)'
            }}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Student Leadership Case Study</span>
          </span>
          <span className="px-3.5 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-600">
            <PlaceholderTag text={btcJourneyData.period} />
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-syne text-stone-900 leading-tight">
          {btcJourneyData.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
          {btcJourneyData.leadershipOverview}
        </p>
      </section>

      {/* Upcoming Deep-Dive Notice */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-xl bg-stone-100 shadow-xs mt-0.5" style={{ color: 'var(--accent-main)' }}>
          <Clock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900">
            Executive Summary Active · Expanded Chapters Coming Soon
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">
            The core leadership milestones, initiatives, and governance takeaways below are fully documented. Full event photo essays and video recordings will be published shortly.
          </p>
        </div>
      </div>

      {/* 1. STARTING CONTEXT & STRATEGIC GOALS */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
              01. The Baseline Context
            </span>
            <h3 className="text-xl font-bold font-syne text-stone-900">
              Starting Context & Opportunity
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {btcJourneyData.startingContext}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
              02. Presidency Objectives
            </span>
            <h3 className="text-xl font-bold font-syne text-stone-900">
              Strategic Goals
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              {btcJourneyData.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                  <span className="font-medium">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 2. MAJOR INITIATIVES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            03. Flagship Programmes
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Major Initiatives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {btcJourneyData.majorInitiatives.map((init, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-base font-bold text-stone-900 font-syne flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />
                <span>{init.title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {init.description}
              </p>
              <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 font-medium">
                <span className="font-bold" style={{ color: 'var(--accent-main)' }}>Impact:</span> <PlaceholderTag text={init.impact} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EVENTS & ACTIVITIES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            04. Execution & Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Events & Activities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {btcJourneyData.eventsAndActivities.map((evt, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-stone-900 font-syne">{evt.name}</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{evt.format}</p>
              </div>
              <div className="pt-3 border-t border-stone-100 space-y-1 text-xs font-mono">
                <p className="font-bold" style={{ color: 'var(--accent-main)' }}>
                  Reach: <PlaceholderTag text={evt.reach} />
                </p>
                <p className="text-[11px] text-stone-500 font-sans leading-relaxed">
                  {evt.takeaway}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TEAM & STAKEHOLDER COORDINATION */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            05. Governance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Team & Stakeholder Coordination
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {btcJourneyData.stakeholderCoordination.map((stakeholder, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 font-syne">
                <Users className="w-4 h-4" style={{ color: 'var(--accent-main)' }} />
                <span>{stakeholder.group}</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-normal">
                {stakeholder.approach}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CHALLENGES & OVERCOMING THEM */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            06. Problem Solving Under Pressure
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Challenges & Adaptations
          </h2>
        </div>

        <div className="space-y-3">
          {btcJourneyData.challenges.map((ch, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-2">
              <p className="text-xs font-bold text-amber-900 font-syne">
                Challenge 0{idx + 1}: {ch.challenge}
              </p>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                <span className="text-emerald-700 font-mono font-bold">How Solved: </span>
                {ch.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PHOTOGRAPHS & EVIDENCE PLACEHOLDERS */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            07. Photo Documentation
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
            Photographs & Evidence
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            'Tech Conclave Keynote & Stage',
            'AI Hackathon Builder Teams',
            'Leadership Team Strategy Offsite',
            'Masterclass Workshop Session',
            'Speaker Panel Fireside Chat',
            'Student Demo Day Presentations'
          ].map((caption, idx) => (
            <div
              key={idx}
              className="min-h-[160px] sm:min-h-[175px] rounded-2xl bg-stone-50 border border-dashed border-stone-300 p-5 flex flex-col items-center justify-center text-center space-y-2.5 shadow-inner"
            >
              <Camera className="w-6 h-6 text-stone-400" />
              <p className="text-xs font-mono text-stone-700 font-medium">{caption}</p>
              <span className="text-[10px] font-mono text-stone-400">[PHOTO ASSET 0{idx + 1}]</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LEADERSHIP LESSONS */}
      <section className="space-y-6">
        <div 
          className="p-8 rounded-3xl border shadow-sm space-y-6"
          style={{ 
            backgroundColor: 'var(--accent-soft)', 
            borderColor: 'var(--accent-soft-border)' 
          }}
        >
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-soft-text)' }}>
              08. Retrospective
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading text-stone-900">
              Core Leadership Lessons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {btcJourneyData.leadershipLessons.map((lesson, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-1.5">
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-main)' }}>
                  Lesson 0{idx + 1}
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-normal">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </button>

        <button
          onClick={() => onNavigate('court-booking')}
          className="px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-md hover:opacity-90"
          style={{ backgroundColor: 'var(--accent-main)' }}
        >
          Explore CourtBooking Case Study →
        </button>
      </div>

    </div>
  );
};
