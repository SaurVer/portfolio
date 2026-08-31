import React from 'react';
import { 
  ChevronRight, 
  User, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Edit3,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  ImageIcon,
  ArrowUpRight
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { PrincipleCard } from '../components/PrincipleCard';
import { EducationCard, ExperienceCard } from '../components/EducationExperienceCard';
import { EditableText } from '../components/EditableText';
import { BlockContainer } from '../components/BlockContainer';
import { RemovableWrapper } from '../components/RemovableWrapper';
import { SectionId } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { 
    profileData, 
    updateProfile, 
    updateAbout, 
    removeInterest,
    addInterest,
    educationData, 
    addEducation,
    removeEducation,
    moveEducation,
    experienceData, 
    addExperience,
    removeExperience,
    moveExperience,
    principlesData, 
    addPrinciple,
    removePrinciple,
    movePrinciple,
    courtBookingData,
    updateCourtBooking,
    openEditorTab,
    isLiveEditMode,
    sectionOrder,
    blockLayouts,
  } = useContent();

  // Helper for Hero Section
  const renderHeroSection = () => {
    const config = blockLayouts['hero'];
    const variant = config?.variant || 'photo-left';

    const photoCard = (
      <div className="relative w-full max-w-sm mx-auto">
        <div
          className="absolute -inset-2 translate-x-3 translate-y-3 rotate-2 rounded-3xl opacity-80"
          style={{ backgroundColor: 'var(--accent-main)' }}
        />
        <div className="relative rounded-3xl bg-white border border-stone-200 p-4 shadow-xl space-y-3 -rotate-1 transition-transform duration-300 hover:rotate-0">
          <div className="w-full aspect-[4/5] min-h-[320px] rounded-2xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group">
          {profileData.photoUrl ? (
            <img
              src={profileData.photoUrl}
              alt={profileData.photoAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top rounded-2xl"
            />
          ) : (
            <div className="space-y-4 flex flex-col items-center justify-center py-6">
              <div 
                className="w-20 h-20 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs"
                style={{ color: 'var(--accent-main)' }}
              >
                <User className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-main)' }}>
                  Professional Photograph
                </p>
                <p className="text-xs text-stone-500 font-mono font-medium">
                  [MY PROFESSIONAL PHOTOGRAPH]
                </p>
              </div>
            </div>
          )}

          {/* Edit Photo overlay if in live edit mode */}
          {isLiveEditMode && (
            <button
              onClick={() => openEditorTab('profile')}
              className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-stone-900/85 text-white text-[10px] font-mono flex items-center gap-1 hover:bg-stone-900 shadow-md backdrop-blur-sm transition-all"
            >
              <Edit3 className="w-3 h-3" />
              <span>Change Photo URL</span>
            </button>
          )}

          {/* Bottom Badge inside photo */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 text-left shadow-xs">
            <p className="text-xs font-bold text-stone-900 font-syne">Product Builder & Leader</p>
            <p className="text-[11px] text-stone-500 font-medium">Indian School of Business (ISB)</p>
          </div>
          </div>
        </div>
      </div>
    );

    const bioDetails = (
      <div className="space-y-4">
        <div className="space-y-2">
          <EditableText
            as="p"
            value={profileData.roleTitle}
            onSave={(val) => updateProfile({ roleTitle: val })}
            className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold block"
            style={{ color: 'var(--accent-main)' }}
            labelHint="Role Title"
          />

          <EditableText
            as="h1"
            value={profileData.name}
            onSave={(val) => updateProfile({ name: val })}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-syne tracking-tight leading-[1.15] block"
            style={{ color: 'var(--text-primary)' }}
            labelHint="Full Name"
          />

          <div className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal pt-1 flex items-start gap-1">
            <span className="text-stone-400 select-none">“</span>
            <EditableText
              as="span"
              value={profileData.positioningStatement}
              onSave={(val) => updateProfile({ positioningStatement: val })}
              multiline={true}
              className="inline-block"
              labelHint="Positioning Statement"
            />
            <span className="text-stone-400 select-none">”</span>
          </div>
        </div>

      </div>
    );

    const heroShell = (content: React.ReactNode) => (
      <div className="pt-16 sm:pt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-300 bg-stone-50 p-3 shadow-[0_35px_90px_-40px_rgba(28,25,23,0.65)] sm:p-4">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6d3d1_1px,transparent_1px),linear-gradient(to_bottom,#d6d3d1_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.18]" />
          <div className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-br from-stone-200/80 via-stone-100/50 to-transparent" />
          <div
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-[0.12] blur-2xl"
            style={{ backgroundColor: 'var(--accent-main)' }}
          />
          <div
            className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full opacity-[0.08] blur-3xl"
            style={{ backgroundColor: 'var(--accent-main)' }}
          />
          <div className="absolute bottom-8 right-8 hidden h-20 w-20 rounded-full border border-stone-300/70 lg:block" />
          <div className="absolute bottom-[4.45rem] right-[4.45rem] hidden h-2 w-2 rounded-full lg:block" style={{ backgroundColor: 'var(--accent-main)' }} />
          <div
            className="relative z-10 overflow-hidden rounded-[1.45rem] bg-stone-950 px-5 py-5 sm:px-7 sm:py-6 lg:px-9"
            style={{ color: '#ffffff' }}
          >
            <div
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundColor: 'var(--accent-main)' }}
            />
            <div className="absolute -right-10 -top-16 select-none font-syne text-[8rem] font-black leading-none tracking-tighter text-white/[0.045] sm:text-[11rem]">
              01
            </div>
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: '#d6d3d1' }}>
                  Product Portfolio · 2026
                </p>
                <p className="font-syne text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: '#ffffff' }}>
                  Solve. Build. <span style={{ color: '#fbbf24' }}>Lead.</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                <span
                  className="rounded-full border border-white/30 bg-white/[0.1] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm"
                  style={{ color: '#f5f5f4' }}
                >
                  Product AI
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-2 overflow-hidden border-x border-b border-stone-300 bg-white py-2.5 sm:mx-4">
            <div className="portfolio-marquee flex w-max items-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-stone-700">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-5 px-3" aria-hidden={copy === 1}>
                  <span>Understand the user</span>
                  <span style={{ color: 'var(--accent-main)' }}>→</span>
                  <span>Frame the problem</span>
                  <span style={{ color: 'var(--accent-main)' }}>→</span>
                  <span>Build the product</span>
                  <span style={{ color: 'var(--accent-main)' }}>→</span>
                  <span>Measure the impact</span>
                  <span className="text-stone-300">◆</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 p-3 sm:p-5 lg:p-7">{content}</div>
        </div>
      </div>
    );

    if (variant === 'photo-right') {
      return heroShell(
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
          <div className="lg:col-span-8 order-2 lg:order-1">{bioDetails}</div>
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end">{photoCard}</div>
        </div>
      );
    }

    if (variant === 'centered') {
      return heroShell(
        <div className="max-w-4xl mx-auto space-y-7 text-center">
          <div className="flex justify-center">{photoCard}</div>
          <div className="text-left">{bioDetails}</div>
        </div>
      );
    }

    // Default: Photo Left
    return heroShell(
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
        <div className="lg:col-span-4 flex justify-center lg:justify-start">{photoCard}</div>
        <div className="lg:col-span-8">{bioDetails}</div>
      </div>
    );
  };

  const renderAboutSection = () => (
    <div className="relative overflow-hidden rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8 lg:p-10">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#fbbf24' }}>
            How I Think
          </p>
          <h2 className="mt-3 font-syne text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: '#ffffff' }}>
            Curiosity with an execution bias.
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: '#d6d3d1' }}>
            I move between customer context, business constraints and technology to find solutions that work in the real world.
          </p>
          {isLiveEditMode && (
            <button
              onClick={() => openEditorTab('profile')}
              className="mt-5 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-xs text-white"
            >
              <Edit3 className="h-3 w-3" /> Edit section
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-8">
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#fbbf24' }}>
              01 · Problems I enjoy
            </p>
            <EditableText
              as="p"
              value={profileData.about.problemsEnjoyed}
              onSave={(val) => updateAbout({ problemsEnjoyed: val })}
              multiline={true}
              className="mt-3 block text-sm leading-relaxed"
              style={{ color: '#f5f5f4' }}
              labelHint="Problems Enjoyed"
            />
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#fbbf24' }}>
              02 · Where I am headed
            </p>
            <EditableText
              as="p"
              value={profileData.about.aspiration}
              onSave={(val) => updateAbout({ aspiration: val })}
              multiline={true}
              className="mt-3 block text-sm leading-relaxed"
              style={{ color: '#f5f5f4' }}
              labelHint="Career Aspiration"
            />
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#a8a29e' }}>
                Areas of focus
              </p>
              {isLiveEditMode && (
                <button
                  onClick={() => {
                    const newTag = window.prompt('Enter new interest/focus tag:');
                    if (newTag) addInterest(newTag);
                  }}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider text-white"
                >
                  + Add focus
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileData.about.interests.map((item, idx) => (
                <span key={`${item}-${idx}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs" style={{ color: '#f5f5f4' }}>
                  {item}
                  {isLiveEditMode && (
                    <button onClick={() => removeInterest(idx)} aria-label={`Remove ${item}`} className="text-stone-400 hover:text-white">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper for Education Section
  const renderEducationSection = () => {
    const config = blockLayouts['education'];
    const cols = config?.columns || 2;
    const gridClass = cols === 1 ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6';

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 shadow-xs" style={{ color: 'var(--accent-main)' }}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
                Academic Background
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading text-stone-900">
                Education
              </h3>
            </div>
          </div>

          {isLiveEditMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newId = 'edu_' + Date.now();
                  addEducation({
                    id: newId,
                    collegeName: 'New University / School',
                    qualification: 'Degree / Certificate',
                    period: '2024 - Present',
                    location: 'City, Country',
                    description: 'Key academic projects, honors, and coursework.',
                    logoAlt: 'University Logo'
                  });
                }}
                className="text-xs font-mono text-stone-700 hover:text-stone-950 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                <span>Add Degree</span>
              </button>
              <button
                onClick={() => openEditorTab('education')}
                className="text-xs font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                <span>Modal Editor</span>
              </button>
            </div>
          )}
        </div>

        {educationData.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-stone-200 rounded-2xl space-y-3 bg-stone-50">
            <p className="text-xs font-mono text-stone-500">No education items displayed.</p>
            {isLiveEditMode && (
              <button
                onClick={() => {
                  addEducation({
                    id: 'edu_' + Date.now(),
                    collegeName: 'Indian School of Business (ISB)',
                    qualification: 'Post Graduate Programme in Management (PGP)',
                    period: '2023 - 2024',
                    location: 'Hyderabad, India',
                    description: 'Specialization in Product Strategy, Technology, and Leadership.',
                    logoAlt: 'ISB'
                  });
                }}
                className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-semibold"
              >
                + Add Education Card
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute bottom-3 left-4 top-2 w-2 rounded-full bg-stone-300 md:bottom-auto md:left-[12%] md:right-[12%] md:top-5 md:h-2 md:w-auto">
              <div className="absolute inset-[2px] rounded-full border border-dashed border-white/90" />
            </div>
            <div className={gridClass}>
            {educationData.map((item, index) => (
              <RemovableWrapper
                key={item.id}
                label={`degree (${item.collegeName || 'Education'})`}
                onRemove={() => removeEducation(item.id)}
                confirmPrompt="Are you sure you want to remove this education card?"
              >
                <div className="relative group/milestone pl-10 pt-4 md:pl-0 md:pt-10">
                  <div className="absolute left-4 top-4 z-20 flex -translate-x-1/2 items-center gap-2 md:left-1/2 md:top-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white font-mono text-xs font-black text-white shadow-lg transition-transform duration-300 group-hover/milestone:scale-125" style={{ backgroundColor: 'var(--accent-main)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden rounded-full bg-stone-900 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white opacity-0 shadow-md transition-opacity group-hover/milestone:opacity-100 lg:block">Milestone</span>
                  </div>
                  <div className="transition-all duration-300 group-hover/milestone:-translate-y-2 group-hover/milestone:scale-[1.025] group-hover/milestone:drop-shadow-xl">
                    <EducationCard item={item} onRemove={() => removeEducation(item.id)} />
                  </div>
                  
                  {/* Inline Card Reorder Controls in Live Edit Mode */}
                  {isLiveEditMode && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-stone-200 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => moveEducation(index, 'up')}
                        disabled={index === 0}
                        title="Move degree left/up"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveEducation(index, 'down')}
                        disabled={index === educationData.length - 1}
                        title="Move degree right/down"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </RemovableWrapper>
            ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Helper for Experience Section
  const renderExperienceSection = () => {
    const config = blockLayouts['experience'];
    const cols = config?.columns || 2;
    const gridClass = cols === 1 ? 'grid grid-cols-1 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6';

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 shadow-xs" style={{ color: 'var(--accent-main)' }}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
                Work History
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading text-stone-900">
                Professional Experience
              </h3>
            </div>
          </div>

          {isLiveEditMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newId = 'exp_' + Date.now();
                  addExperience({
                    id: newId,
                    companyName: 'New Company',
                    role: 'Product Lead / Manager',
                    period: '2023 - Present',
                    location: 'City, Country',
                    description: 'Led end-to-end product strategy and execution.',
                    bullets: ['Drove 40% growth in customer retention', 'Spearheaded agile squad workflows'],
                    logoAlt: 'Company Logo'
                  });
                }}
                className="text-xs font-mono text-stone-700 hover:text-stone-950 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                <span>Add Role</span>
              </button>
              <button
                onClick={() => openEditorTab('experience')}
                className="text-xs font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                <span>Modal Editor</span>
              </button>
            </div>
          )}
        </div>

        {experienceData.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-stone-200 rounded-2xl space-y-3 bg-stone-50">
            <p className="text-xs font-mono text-stone-500">No experience roles displayed.</p>
            {isLiveEditMode && (
              <button
                onClick={() => {
                  addExperience({
                    id: 'exp_' + Date.now(),
                    companyName: 'Innovative Tech Corp',
                    role: 'Senior Product Manager',
                    period: '2022 - 2024',
                    location: 'San Francisco, CA',
                    description: 'Led growth and core platform experience for 2M+ monthly active users.',
                    bullets: ['Scaled revenue 2.5x through onboarding revamp'],
                    logoAlt: 'Tech Corp'
                  });
                }}
                className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-semibold"
              >
                + Add Experience Card
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute bottom-3 left-4 top-2 w-2 rounded-full bg-stone-800 md:bottom-auto md:left-[12%] md:right-[12%] md:top-5 md:h-2 md:w-auto">
              <div className="absolute inset-[2px] rounded-full border border-dashed border-white/80" />
            </div>
            <div className={gridClass}>
            {experienceData.map((item, index) => (
              <RemovableWrapper
                key={item.id}
                label={`role (${item.companyName || 'Experience'})`}
                onRemove={() => removeExperience(item.id)}
                confirmPrompt="Are you sure you want to remove this work experience role?"
              >
                <div className="relative group/milestone pl-10 pt-4 md:pl-0 md:pt-10">
                  <div className="absolute left-4 top-4 z-20 flex -translate-x-1/2 items-center gap-2 md:left-1/2 md:top-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-stone-950 font-mono text-xs font-black text-white shadow-lg transition-transform duration-300 group-hover/milestone:scale-125">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white opacity-0 shadow-md transition-opacity group-hover/milestone:opacity-100 lg:block" style={{ backgroundColor: 'var(--accent-main)' }}>Milestone</span>
                  </div>
                  <div className="transition-all duration-300 group-hover/milestone:-translate-y-2 group-hover/milestone:scale-[1.025] group-hover/milestone:drop-shadow-xl">
                    <ExperienceCard item={item} onRemove={() => removeExperience(item.id)} />
                  </div>
                  
                  {/* Inline Card Reorder Controls in Live Edit Mode */}
                  {isLiveEditMode && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-stone-200 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => moveExperience(index, 'up')}
                        disabled={index === 0}
                        title="Move experience left/up"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveExperience(index, 'down')}
                        disabled={index === experienceData.length - 1}
                        title="Move experience right/down"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </RemovableWrapper>
            ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderJourneySection = () => {
    const startYear = (period: string) => Number(period.match(/\d{4}/)?.[0] || 9999);
    const journeyItems = [
      ...educationData.map((item) => ({
        id: item.id,
        type: 'Education' as const,
        title: item.collegeName,
        subtitle: item.qualification,
        period: item.period,
        location: item.location,
        logo: item.logo,
        logoAlt: item.logoAlt,
        context: item.institutionDescription,
        detail: item.description,
      })),
      ...experienceData.map((item) => ({
        id: item.id,
        type: 'Experience' as const,
        title: item.companyName,
        subtitle: item.role,
        period: item.period,
        location: item.location,
        logo: item.logo,
        logoAlt: item.logoAlt,
        context: item.companyDescription,
        detail: item.description,
        bullets: item.bullets,
      })),
      {
        id: 'isb-btc-president',
        type: 'Leadership' as const,
        title: 'President, Business Technology Club',
        subtitle: 'Indian School of Business (ISB)',
        period: '2026–27',
        location: 'ISB, Hyderabad',
        logo: '/logos/isb-logo.jpg',
        logoAlt: 'Indian School of Business logo',
        context: '',
        detail: '',
        bullets: [
          'Elected by 450 students to lead the Business Technology Club at ISB.',
          'Helping the cohort stay up to date in the Technology space, especially Product Management.',
          'Host industry leaders on campus to share their perspective and experiences.',
          'Help the cohort prepare for Product Management roles and the career ahead.',
        ],
      },
    ].sort((a, b) => startYear(a.period) - startYear(b.period));

    const timelineColors = ['#f97316', '#ef4444', '#2563eb', '#22c55e', '#7c3aed'];

    return (
      <div className="space-y-7">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.24em]" style={{ color: 'var(--accent-main)' }}>
            The road so far
          </span>
          <h2 className="mt-2 font-heading text-3xl text-stone-900 sm:text-5xl">Education & Career Journey</h2>
          <p className="mt-3 text-sm text-stone-600">A chronological view of the experiences that shaped how I solve, build and lead.</p>
        </div>

        <div className="relative mx-auto max-w-5xl py-4">
          <div className="journey-mobile-road absolute bottom-8 left-5 top-8 w-3 origin-top rounded-full bg-stone-900 shadow-[6px_0_0_#d6d3d1] md:hidden">
            <div className="absolute inset-x-[4px] inset-y-2 border-l border-dashed border-white/70" />
          </div>

          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 C92 90 90 155 52 205 C12 258 9 337 49 397 C91 459 91 535 51 592 C13 648 12 722 50 800" fill="none" stroke="#d6d3d1" strokeWidth="13" strokeLinecap="round" />
            <path className="journey-road-draw" pathLength="1" d="M50 0 C92 90 90 155 52 205 C12 258 9 337 49 397 C91 459 91 535 51 592 C13 648 12 722 50 800" fill="none" stroke="#172554" strokeWidth="10" strokeLinecap="round" />
            <path className="journey-road-flow" d="M50 0 C92 90 90 155 52 205 C12 258 9 337 49 397 C91 459 91 535 51 592 C13 648 12 722 50 800" fill="none" stroke="rgba(255,255,255,.78)" strokeWidth="0.7" strokeDasharray="3 4" />
          </svg>

          <div className="relative space-y-5 md:space-y-0">
            {journeyItems.map((item, index) => {
              const color = timelineColors[index % timelineColors.length];
              const isLeft = index % 2 === 0;
              return (
                <div key={`${item.type}-${item.id}`} className={`journey-milestone group/timeline relative flex min-h-[185px] items-center ${isLeft ? 'journey-from-left md:justify-start' : 'journey-from-right md:justify-end'}`}>
                  <div className="journey-pin absolute left-5 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-[6px] border-white text-xs font-mono font-black text-white shadow-xl transition-all duration-300 group-hover/timeline:scale-125" style={{ backgroundColor: color }}>
                      {String(index + 1).padStart(2, '0')}
                      <span className="absolute -bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45" style={{ backgroundColor: color }} />
                    </div>
                  </div>

                  <article className="ml-12 w-[calc(100%-3rem)] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md transition-all duration-500 group-hover/timeline:-translate-y-2 group-hover/timeline:shadow-2xl md:ml-0 md:w-[43%]">
                    <div className="h-1.5" style={{ backgroundColor: color }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-2 shadow-sm">
                          {item.logo ? <img src={item.logo} alt={item.logoAlt} className="max-h-full max-w-full object-contain" /> : item.type === 'Education' ? <GraduationCap className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]" style={{ color }}>{item.type}</p>
                          <p className="mt-1 font-mono text-xs font-bold text-stone-700">{item.period}</p>
                          {item.location && <p className="mt-1 text-[10px] text-stone-400">{item.location}</p>}
                        </div>
                      </div>
                      <h3 className="mt-4 font-syne text-xl font-bold text-stone-950">{item.title}</h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide" style={{ color }}>{item.subtitle}</p>

                      <div className="grid max-h-0 grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover/timeline:mt-4 group-hover/timeline:max-h-72 group-hover/timeline:grid-rows-[1fr] group-hover/timeline:opacity-100">
                        <div className="overflow-hidden border-t border-stone-200 pt-3 text-xs leading-relaxed text-stone-600">
                          {item.context && <p>{item.context}</p>}
                          {item.detail && <p className="mt-2 font-medium text-stone-700">{item.detail}</p>}
                          {item.bullets && item.bullets.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {item.bullets.map((bullet, bulletIndex) => <li key={bulletIndex} className="flex gap-2"><span style={{ color }}>•</span><span>{bullet}</span></li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                      <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-wider text-stone-400 group-hover/timeline:hidden">Hover to explore milestone</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Helper for Principles Section
  const renderPrinciplesSection = () => {
    const config = blockLayouts['principles'];
    const cols = config?.columns || 4;
    let gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5';
    if (cols === 1) gridClass = 'grid grid-cols-1 gap-5';
    if (cols === 2) gridClass = 'grid grid-cols-1 sm:grid-cols-2 gap-5';
    if (cols === 3) gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5';

    return (
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
              Product Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
              What I Stand For
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Guiding principles shaping product decisions, process improvements, and execution.
            </p>
          </div>

          {isLiveEditMode && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const nextId = principlesData.length > 0 ? Math.max(...principlesData.map((p) => p.id)) + 1 : 1;
                  addPrinciple({
                    id: nextId,
                    title: 'New Guiding Principle',
                    description: 'Clear articulable rationale for how to build, test, and ship.',
                    iconName: 'Target',
                    actionableTakeaway: 'Focus on high-leverage user outcomes first.'
                  });
                }}
                className="text-xs font-mono text-stone-700 hover:text-stone-950 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                <span>Add Principle</span>
              </button>
              <button
                onClick={() => openEditorTab('principles')}
                className="text-xs font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                <span>Modal Editor</span>
              </button>
            </div>
          )}
        </div>

        {principlesData.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-stone-200 rounded-2xl space-y-3 bg-stone-50">
            <p className="text-xs font-mono text-stone-500">No product principles displayed.</p>
            {isLiveEditMode && (
              <button
                onClick={() => {
                  addPrinciple({
                    id: 1,
                    title: 'Customer-First Prioritization',
                    description: 'Ground all roadmap bets in validated user friction and qualitative feedback.',
                    iconName: 'Target',
                    actionableTakeaway: 'Talk to 5 active users every single week.'
                  });
                }}
                className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 font-semibold"
              >
                + Add Principle Card
              </button>
            )}
          </div>
        ) : (
          <div className={gridClass}>
            {principlesData.map((principle, index) => (
              <RemovableWrapper
                key={principle.id}
                label={`principle "${principle.title}"`}
                onRemove={() => removePrinciple(principle.id)}
                confirmPrompt="Are you sure you want to remove this principle?"
              >
                <div className="relative group">
                  <PrincipleCard principle={principle} displayIndex={index} onRemove={() => removePrinciple(principle.id)} />
                  
                  {/* Card reorder buttons */}
                  {isLiveEditMode && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-stone-200 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => movePrinciple(index, 'up')}
                        disabled={index === 0}
                        title="Move card left/up"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => movePrinciple(index, 'down')}
                        disabled={index === principlesData.length - 1}
                        title="Move card right/down"
                        className="p-1 text-stone-600 hover:text-stone-950 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </RemovableWrapper>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Helper for Featured Work Section
  const renderFeaturedSection = () => {
    const screenshots = courtBookingData.narrative.screenshots.slice(0, 4);
    const featuredAttribution = courtBookingData.featuredAttribution || 'Built by Saurabh Verma for ISB Sports Management';
    const detailsCtaLabel = courtBookingData.detailsCtaLabel || 'Know why and how it was made';
    const liveAppUrl = courtBookingData.appUrl?.startsWith('http')
      ? courtBookingData.appUrl
      : 'https://courtbook-frontend-three.vercel.app/';

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
              Working Product
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading text-stone-900">
              Featured Work
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono hover:underline flex items-center gap-1.5 font-bold"
            style={{ color: 'var(--accent-main)' }}
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          className="p-5 sm:p-7 rounded-3xl bg-white border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all group space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Working App
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-stone-500 bg-stone-50 border border-stone-200">
                  <EditableText
                    as="span"
                    value={featuredAttribution}
                    onSave={(val) => updateCourtBooking({ featuredAttribution: val })}
                    className="text-xs font-mono text-stone-500"
                    labelHint="Featured Work Attribution"
                  />
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-syne text-stone-900 group-hover:text-stone-700 transition-colors">
                <EditableText
                  value={courtBookingData.title}
                  onSave={(val) => updateCourtBooking({ title: val })}
                  className="text-2xl sm:text-4xl font-bold font-syne text-stone-900"
                  labelHint="Featured Work Title"
                />
              </h3>
              <p className="text-sm sm:text-base font-semibold leading-relaxed" style={{ color: 'var(--accent-main)' }}>
                <EditableText
                  value={courtBookingData.oneLiner}
                  onSave={(val) => updateCourtBooking({ oneLiner: val })}
                  multiline={true}
                  className="text-sm sm:text-base font-semibold leading-relaxed block"
                  labelHint="Featured Work Summary"
                />
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                <EditableText
                  value={courtBookingData.shortDescription}
                  onSave={(val) => updateCourtBooking({ shortDescription: val })}
                  multiline={true}
                  className="text-xs sm:text-sm text-stone-600 leading-relaxed block"
                  labelHint="Featured Work Description"
                />
              </p>
            </div>
            <div className="flex flex-wrap lg:flex-col lg:items-stretch gap-2 shrink-0">
              <a
                href={liveAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--accent-main)' }}
              >
                <span>Explore the App</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onNavigate('courtbooking')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-bold shadow-xs hover:bg-stone-50 transition-colors"
              >
                <span>{detailsCtaLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-start">
            {screenshots.map((screen, index) => (
              <div
                key={screen.id}
                className="relative aspect-[9/16] w-full max-w-[230px] mx-auto rounded-[1.75rem] overflow-hidden border-[5px] border-stone-900 bg-stone-100 shadow-lg group/screen"
              >
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-stone-900 z-20" />
                {screen.imageUrl ? (
                  <img
                    src={screen.imageUrl}
                    alt={screen.screenTitle}
                    className="w-full h-full object-contain bg-white group-hover/screen:scale-[1.01] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-5 space-y-2 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:18px_18px]">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs" style={{ color: 'var(--accent-main)' }}>
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-stone-700">Screenshot {String(index + 1).padStart(2, '0')}</p>
                    <p className="text-[11px] text-stone-500">{screen.screenTitle}</p>
                    {isLiveEditMode && (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditorTab('courtbooking');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-[11px] font-mono font-bold text-stone-700 shadow-xs"
                      >
                        Add image URL
                      </button>
                    )}
                  </div>
                )}
                <div className="absolute left-2 bottom-2 right-2 px-2.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/70 shadow-sm">
                  <p className="text-[11px] font-bold text-stone-900 line-clamp-1">{screen.screenTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Map of section renderers
  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    hero: renderHeroSection,
    journey: renderJourneySection,
    principles: renderPrinciplesSection,
    featured: renderFeaturedSection,
    about: renderAboutSection,
  };

  return (
    <div className="space-y-0 pb-10">
      {/* Dynamically Ordered and Resized Blocks */}
      {sectionOrder.map((secId) => {
        const renderer = sectionRenderers[secId];
        if (!renderer) return null;

        return (
          <BlockContainer
            key={secId}
            id={secId}
            allowColumnChange={secId === 'principles' || secId === 'featured'}
            columnOptions={secId === 'principles' ? [1, 2, 3, 4] : [1, 2]}
            variantOptions={
              secId === 'hero'
                ? [
                    { value: 'photo-left', label: 'Photo Left' },
                    { value: 'photo-right', label: 'Photo Right' },
                    { value: 'centered', label: 'Centered' },
                  ]
                : undefined
            }
            editTabTarget={
              secId === 'hero'
                ? 'profile'
                : secId === 'journey'
                ? 'experience'
                : secId === 'principles'
                ? 'principles'
                : secId === 'featured'
                ? 'courtbooking'
                : 'profile'
            }
          >
            {renderer()}
          </BlockContainer>
        );
      })}
    </div>
  );
};
