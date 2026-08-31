import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  LogIn,
  CalendarCheck,
  RefreshCw,
  MapPinCheck,
  ShieldCheck,
  MessageSquareWarning,
  ChartNoAxesColumnIncreasing,
  UserCheck,
  CalendarX,
  CircleCheckBig,
  Target,
  AlertCircle,
  Lightbulb,
  X,
} from 'lucide-react';
import { EditableText } from '../components/EditableText';
import { useContent } from '../context/ContentContext';
import { ProductFlowDeepDive } from '../types';

interface CourtBookingPageProps {
  onNavigate: (route: string) => void;
}

const flowIcons: Record<string, React.ElementType> = {
  LogIn: UserCheck,
  CalendarCheck,
  RefreshCw: CalendarX,
  MapPinCheck: CircleCheckBig,
  ShieldCheck,
  MessageSquareWarning,
  ChartNoAxesColumnIncreasing,
};

const flowShortLabels: Record<string, string> = {
  'login-signup': 'User sign in / sign up',
  'normal-booking': 'Court bookings',
  'cancellation-modification': 'Booking modification',
  attendance: 'Mark attendance',
  'conflict-prevention': 'Avoid booking conflicts',
  complaints: 'Raising complaints',
  heatmap: 'Finding current bookings',
};

const blueprintPositions = [
  'md:left-[12%] md:top-[10%]',
  'md:left-[40%] md:top-[3%]',
  'md:right-[12%] md:top-[13%]',
  'md:right-[8%] md:top-[46%]',
  'md:right-[19%] md:bottom-[7%]',
  'md:left-[25%] md:bottom-[6%]',
  'md:left-[8%] md:top-[46%]',
];

export const CourtBookingPage: React.FC<CourtBookingPageProps> = ({ onNavigate }) => {
  const { courtBookingData, updateCourtBooking, isLiveEditMode } = useContent();
  const isDevelopment = import.meta.env.DEV;
  const flows = courtBookingData.narrative.flowDeepDives;
  const [activeFlowId, setActiveFlowId] = useState<string>(flows[0]?.id || 'login-signup');
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const activeIndex = activeFlowId ? flows.findIndex((flow) => flow.id === activeFlowId) : -1;
  const activeFlow = activeIndex >= 0 ? flows[activeIndex] : null;
  const activeScreens = activeFlow?.screenshotUrls
    .map((url) => url.trim())
    .filter(Boolean) || [];

  const updateFlow = (id: string, updates: Partial<ProductFlowDeepDive>) => {
    updateCourtBooking({
      narrative: {
        ...courtBookingData.narrative,
        flowDeepDives: flows.map((flow) => (flow.id === id ? { ...flow, ...updates } : flow)),
      },
    });
  };

  const selectRelativeFlow = (direction: -1 | 1) => {
    if (!activeFlow) return;
    const nextIndex = (activeIndex + direction + flows.length) % flows.length;
    setActiveFlowId(flows[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ActiveIcon = activeFlow ? (flowIcons[activeFlow.iconName] || CalendarCheck) : CalendarCheck;

  const toBulletPoints = (value: string) => value
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z])/)
    .map((point) => point.trim())
    .filter(Boolean);

  useEffect(() => setActiveScreenshotIndex(0), [activeFlowId, activeScreens.length]);

  return (
    <div className="relative isolate mx-auto min-h-screen max-w-6xl overflow-hidden px-4 pb-28 pt-28 sm:px-6 sm:pt-32 md:pb-12 lg:max-w-[1600px] lg:px-8 lg:pt-24">
      <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 -z-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />

      <header className="relative mb-8 overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_24px_70px_-35px_rgba(15,23,42,0.85)] sm:p-8 md:rounded-none md:px-10 md:py-12 md:shadow-none">
        <div className="pointer-events-none absolute -right-14 -top-24 h-64 w-64 rounded-full border-[38px] border-blue-400/10" />
        <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full border-[28px] border-emerald-300/10" />
        <div className="pointer-events-none absolute inset-y-0 right-[28%] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-white/55 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
          </button>
          <div>
            <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-blue-200">
              Product flow walkthrough
            </p>
            <h1 className="font-syne text-3xl font-bold tracking-tight text-white sm:text-5xl">
              CourtBooking App
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
            Seven product decisions that make campus court booking simple, fair and transparent.
          </p>
        </div>

        <a
          href={courtBookingData.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          Explore app <ExternalLink className="h-3.5 w-3.5" />
        </a>
        </div>
      </header>

      {activeFlow && (
        <section className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#07111f] via-[#0b2035] to-[#15172b] p-4 text-white shadow-[0_34px_100px_-42px_rgba(2,8,23,.98)] sm:p-6 md:rounded-none md:px-8 md:py-10 md:shadow-none">
          <div className="pointer-events-none absolute -left-28 top-20 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="pointer-events-none absolute right-16 top-12 h-64 w-64 rounded-full border border-white/15" />

          <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-mono font-bold uppercase tracking-[0.24em] !text-cyan-200/85">CourtBooking product blueprint</p>
              <h2 className="mt-2 font-syne text-2xl font-bold tracking-tight !text-white sm:text-3xl">Seven topics around one experience.</h2>
            </div>
            <p className="max-w-md text-xs leading-5 !text-slate-200/75 sm:text-right">Select any station to see its interface and product reasoning at the centre of the system.</p>
          </div>

          <div className="relative overflow-visible rounded-[30px] border border-white/15 bg-white/[.055] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl sm:p-4 md:min-h-[900px] md:overflow-hidden md:rounded-none md:border-x-0 md:bg-transparent md:px-0">
            <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
            <aside className={`relative z-40 w-full rounded-[24px] border border-white/55 bg-white/[.9] p-4 text-slate-900 shadow-[0_30px_90px_-28px_rgba(2,8,23,.9),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-2xl transition-all duration-500 sm:p-5 md:absolute md:bottom-4 md:left-4 md:top-4 md:w-[410px] md:max-w-[calc(100%-2rem)] md:rounded-[28px] md:p-6 ${isDetailOpen ? 'block translate-x-0 opacity-100' : 'hidden -translate-x-[115%] opacity-0 pointer-events-none md:block'}`} aria-hidden={!isDetailOpen}>
              <button type="button" aria-label="Close topic details" onClick={() => setIsDetailOpen(false)} className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:rotate-90 hover:text-slate-950 md:flex"><X className="h-4 w-4" /></button>
              <div className="flex h-full flex-col">
                <div className="border-b border-slate-200 pb-4 pr-9">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-lg"><ActiveIcon className="h-5 w-5" /></span>
                  <p className="mt-4 text-[8px] font-mono font-bold uppercase tracking-[0.18em] text-[#617f78] md:text-[10px]">Selected journey</p>
                  <EditableText value={activeFlow.title} onSave={(value) => updateFlow(activeFlow.id, { title: value })} as="h2" className="mt-1 font-syne text-xl font-bold leading-tight text-slate-950 md:text-2xl" labelHint="Flow title" />
                  <EditableText value={activeFlow.summary} onSave={(value) => updateFlow(activeFlow.id, { summary: value })} as="p" multiline className="mt-2 text-xs leading-5 text-slate-500 md:text-sm md:leading-6" labelHint="Flow summary" />
                </div>
                <div className="mt-4 flex-1 space-y-3 pr-1 md:overflow-y-auto">
                  {[
                    { key: 'why' as const, label: 'Why', Icon: Target, color: 'bg-amber-50 text-amber-700' },
                    { key: 'challenge' as const, label: 'Design challenge', Icon: AlertCircle, color: 'bg-rose-50 text-rose-700' },
                    { key: 'solution' as const, label: 'Product design', Icon: Lightbulb, color: 'bg-emerald-50 text-emerald-700' },
                  ].map(({ key, label, Icon, color }) => (
                    <div key={key} className="rounded-2xl border border-slate-200 bg-white p-3.5 md:p-4">
                      <div className="mb-2 flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-lg md:h-8 md:w-8 ${color}`}><Icon className="h-3.5 w-3.5 md:h-4 md:w-4" /></span><h3 className="font-syne text-xs font-bold text-slate-900 md:text-sm">{label}</h3></div>
                      {isLiveEditMode ? (
                        <EditableText
                          value={toBulletPoints(activeFlow[key]).map((point) => `• ${point.replace(/^[-•]\s*/, '')}`).join('\n')}
                          onSave={(value) => updateFlow(activeFlow.id, { [key]: value.split('\n').map((point) => point.replace(/^[-•]\s*/, '').trim()).filter(Boolean).join('\n') })}
                          as="p"
                          multiline
                          className="whitespace-pre-line text-xs leading-5 text-slate-600 md:text-sm md:leading-6"
                          labelHint={`${activeFlow.title}: ${label}`}
                        />
                      ) : (
                        <ul className="space-y-1.5 text-xs leading-5 text-slate-600 md:text-sm md:leading-6">
                          {toBulletPoints(activeFlow[key]).map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 hidden items-center justify-between border-t border-slate-200 pt-3 md:flex">
                  <button type="button" onClick={() => selectRelativeFlow(-1)} className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 hover:text-slate-900"><ArrowLeft className="h-3.5 w-3.5" /> Previous</button>
                  <button type="button" onClick={() => selectRelativeFlow(1)} className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 hover:text-slate-900">Next <ArrowRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </aside>

            <div className={`relative mt-4 transition-all duration-500 md:absolute md:inset-0 md:mt-0 ${isDetailOpen ? 'md:origin-right md:translate-x-[8%] md:scale-[.84] md:opacity-95' : 'scale-100 opacity-100'}`}>
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 900 900" preserveAspectRatio="none">
              {[[190,150],[450,95],[710,165],[745,450],[650,755],[270,755],[155,450]].map(([x,y], index) => (
                <g key={index}>
                  <line x1="450" y1="450" x2={x} y2={y} stroke="#9bd9e5" strokeOpacity=".7" strokeWidth="2.5" strokeDasharray="7 9" />
                  <circle cx={x} cy={y} r="8" fill="#b9e8f0" />
                </g>
              ))}
              <circle cx="450" cy="450" r="170" fill="none" stroke="#b9e8f0" strokeOpacity=".62" strokeWidth="2.5" />
              {[0,51.43,102.86,154.29,205.71,257.14,308.57].map((angle) => {
                const x = 450 + Math.cos((angle * Math.PI) / 180) * 170;
                const y = 450 + Math.sin((angle * Math.PI) / 180) * 170;
                return <circle key={angle} cx={x} cy={y} r="7" fill="#d7f3f7" />;
              })}
            </svg>

            <div className="relative mx-auto mb-6 flex min-h-[510px] w-full max-w-[340px] items-center justify-center sm:min-h-[590px] sm:max-w-[430px] md:absolute md:left-1/2 md:top-1/2 md:mb-0 md:min-h-[700px] md:max-w-[480px] md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="relative w-full rounded-[42px] border-[4px] border-white bg-gradient-to-br from-white via-cyan-50 to-violet-100 p-1.5 shadow-[0_0_55px_rgba(103,232,249,.30),0_42px_95px_-24px_rgba(2,8,23,.88),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl sm:w-[400px] sm:rounded-[48px] sm:border-[5px] md:w-[470px]">
                <span className="absolute left-1/2 top-2 z-20 h-2 w-16 -translate-x-1/2 rounded-full bg-slate-950/90 shadow-sm" />
                {activeScreens.length ? (
                  <div className="relative h-[470px] overflow-hidden rounded-[35px] bg-white sm:h-[548px] sm:rounded-[41px] md:h-[650px]">
                    <img
                      key={`${activeFlow.id}-${activeScreenshotIndex}-${activeScreens[activeScreenshotIndex]}`}
                      src={activeScreens[activeScreenshotIndex] || activeScreens[0]}
                      alt={`${activeFlow.title} interface ${activeScreenshotIndex + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                    {activeScreens.length > 1 && (
                      <>
                        <button type="button" aria-label="Previous interface image" onClick={() => setActiveScreenshotIndex((current) => (current - 1 + activeScreens.length) % activeScreens.length)} className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-lg backdrop-blur"><ArrowLeft className="h-4 w-4" /></button>
                        <button type="button" aria-label="Next interface image" onClick={() => setActiveScreenshotIndex((current) => (current + 1) % activeScreens.length)} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-lg backdrop-blur"><ArrowRight className="h-4 w-4" /></button>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/75 px-2.5 py-1 text-[8px] font-mono text-white">{activeScreenshotIndex + 1} / {activeScreens.length}</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex h-[470px] w-full flex-col items-center justify-center rounded-[35px] bg-gradient-to-b from-[#163846] to-[#081b24] sm:h-[548px] sm:rounded-[41px] md:h-[650px]">
                    <ActiveIcon className="h-10 w-10 !text-[#bd7359]" />
                    <span className="mt-3 px-4 text-center font-syne text-sm font-bold !text-white">{activeFlow.title}</span>
                    <span className="mt-1 text-[8px] font-mono !text-[#b4ccc5]">Interface coming soon</span>
                  </div>
                )}
                <div className="py-1.5 text-center"><span className="font-syne text-[10px] font-bold !text-slate-800">CourtBooking</span></div>
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest !text-white shadow-lg">{flowShortLabels[activeFlow.id]}</span>
            </div>

            <div className="hidden md:block">
              {flows.map((flow, index) => {
                const FlowIcon = flowIcons[flow.iconName] || CalendarCheck;
                const isActive = flow.id === activeFlowId;
                return (
                  <button
                    key={flow.id}
                    type="button"
                    aria-label={`${String(index + 1).padStart(2, '0')} ${flow.title}`}
                    aria-pressed={isActive}
                    onClick={() => { setActiveFlowId(flow.id); setIsDetailOpen(true); }}
                    className={`group relative flex min-h-[128px] flex-col items-center justify-center text-center transition duration-300 md:absolute md:h-[116px] md:w-[170px] ${blueprintPositions[index]} ${isActive ? 'z-10 scale-110' : 'hover:scale-105'}`}
                  >
                    <span className={`relative flex h-[72px] w-[92px] items-center justify-center rounded-[45%] border shadow-[0_20px_40px_-20px_rgba(2,8,23,.95),inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-xl transition ${isActive ? 'border-white/80 bg-gradient-to-br from-cyan-400/90 to-violet-500/90' : 'border-white/30 bg-white/[.10] group-hover:border-white/50 group-hover:bg-white/[.16]'}`}>
                      <FlowIcon className="h-8 w-8 !text-white" />
                      {flow.screenshotUrls[0] && <span className="absolute -right-5 bottom-0 h-14 w-10 rotate-6 overflow-hidden rounded-md border-2 border-white bg-white"><img src={flow.screenshotUrls[0]} alt="" className="h-full w-full object-cover" /></span>}
                    </span>
                    <span className="mt-2 flex min-h-[28px] w-full max-w-[170px] items-start justify-center text-center font-syne text-[10px] font-bold uppercase leading-[1.25] tracking-[0.08em] !text-slate-100">{flowShortLabels[flow.id] || flow.title}</span>
                  </button>
                );
              })}
            </div>

          </div>
          </div>
        </section>
      )}

      {activeFlow && (
        <nav
          aria-label="CourtBooking flow topics"
          className={`fixed left-3 right-3 z-40 flex gap-1.5 overflow-x-auto rounded-2xl border border-white/50 bg-slate-950/90 p-2 shadow-[0_18px_55px_-18px_rgba(2,8,23,.9)] backdrop-blur-xl md:hidden ${isDevelopment ? 'bottom-20' : 'bottom-3'}`}
        >
          {flows.map((flow) => {
            const FlowIcon = flowIcons[flow.iconName] || CalendarCheck;
            const isActive = flow.id === activeFlowId;
            return (
              <button
                key={flow.id}
                type="button"
                title={flowShortLabels[flow.id] || flow.title}
                aria-label={flowShortLabels[flow.id] || flow.title}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveFlowId(flow.id);
                  setIsDetailOpen(true);
                }}
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${isActive ? 'border-white/80 bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-lg' : 'border-white/10 bg-white/10 text-slate-300 hover:bg-white/15'}`}
              >
                <FlowIcon className="h-[18px] w-[18px]" />
                <span className="sr-only">{flowShortLabels[flow.id] || flow.title}</span>
                {isActive && <span className="absolute -bottom-0.5 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-white" />}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};
