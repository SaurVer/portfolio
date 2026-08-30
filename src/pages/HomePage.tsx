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
      <div className="w-full max-w-sm mx-auto rounded-3xl bg-white border border-stone-200 p-4 shadow-lg space-y-3">
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

        {/* About Me Details Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
                Background & Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading text-stone-900">
                About Me
              </h2>
            </div>
            {isLiveEditMode && (
              <button
                onClick={() => openEditorTab('profile')}
                className="text-xs font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit in Form</span>
              </button>
            )}
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <EditableText
              as="p"
              value={profileData.about.intro}
              onSave={(val) => updateAbout({ intro: val })}
              multiline={true}
              className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium block"
              labelHint="About Me Intro"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  The Problems I Enjoy Solving:
                </h3>
                <EditableText
                  as="p"
                  value={profileData.about.problemsEnjoyed}
                  onSave={(val) => updateAbout({ problemsEnjoyed: val })}
                  multiline={true}
                  className="text-xs text-stone-700 leading-relaxed block"
                  labelHint="Problems Enjoyed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Product & Career Aspiration:
                </h3>
                <EditableText
                  as="p"
                  value={profileData.about.aspiration}
                  onSave={(val) => updateAbout({ aspiration: val })}
                  multiline={true}
                  className="text-xs text-stone-700 leading-relaxed block"
                  labelHint="Career Aspiration"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Professional Focus & Interests:
                </h3>
                {isLiveEditMode && (
                  <button
                    onClick={() => {
                      const newTag = window.prompt('Enter new interest/focus tag:');
                      if (newTag) addInterest(newTag);
                    }}
                    className="text-[11px] font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3 h-3 text-amber-500" />
                    <span>Add Tag</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.about.interests.map((item, idx) => (
                  <RemovableWrapper
                    key={idx}
                    label={`tag "${item}"`}
                    onRemove={() => removeInterest(idx)}
                  >
                    <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 font-semibold inline-flex items-center gap-1.5">
                      <span>{item}</span>
                      {isLiveEditMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeInterest(idx);
                          }}
                          className="text-stone-400 hover:text-rose-500 p-0.5 rounded transition-colors"
                          title={`Remove ${item}`}
                          aria-label={`Remove ${item}`}
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </span>
                  </RemovableWrapper>
                ))}
                {isLiveEditMode && (
                  <button
                    onClick={() => openEditorTab('profile')}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-dashed border-stone-300 text-xs text-stone-600 font-mono flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Bulk edit tags</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (variant === 'photo-right') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start pt-16 sm:pt-20">
          <div className="lg:col-span-8 order-2 lg:order-1">{bioDetails}</div>
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end">{photoCard}</div>
        </div>
      );
    }

    if (variant === 'centered') {
      return (
        <div className="max-w-4xl mx-auto space-y-7 pt-16 sm:pt-20 text-center">
          <div className="flex justify-center">{photoCard}</div>
          <div className="text-left">{bioDetails}</div>
        </div>
      );
    }

    // Default: Photo Left
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start pt-16 sm:pt-20">
        <div className="lg:col-span-4 flex justify-center lg:justify-start">{photoCard}</div>
        <div className="lg:col-span-8">{bioDetails}</div>
      </div>
    );
  };

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
          <div className={gridClass}>
            {educationData.map((item, index) => (
              <RemovableWrapper
                key={item.id}
                label={`degree (${item.collegeName || 'Education'})`}
                onRemove={() => removeEducation(item.id)}
                confirmPrompt="Are you sure you want to remove this education card?"
              >
                <div className="relative group">
                  <EducationCard item={item} onRemove={() => removeEducation(item.id)} />
                  
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
          <div className={gridClass}>
            {experienceData.map((item, index) => (
              <RemovableWrapper
                key={item.id}
                label={`role (${item.companyName || 'Experience'})`}
                onRemove={() => removeExperience(item.id)}
                confirmPrompt="Are you sure you want to remove this work experience role?"
              >
                <div className="relative group">
                  <ExperienceCard item={item} onRemove={() => removeExperience(item.id)} />
                  
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
        )}
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

  // Helper for Summary / CTA Section
  const renderSummarySection = () => {
    return (
      <div className="text-center space-y-5">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-main)' }}>
            Synthesis
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading text-stone-900">
            Summary
          </h2>
          
          <div className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            <span className="text-stone-400 select-none">“</span>
            <EditableText
              as="span"
              value={profileData.summaryNarrative}
              onSave={(val) => updateProfile({ summaryNarrative: val })}
              multiline={true}
              className="inline-block"
              labelHint="Summary Narrative"
            />
            <span className="text-stone-400 select-none">”</span>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 pl-6 pr-2 py-2.5 rounded-full text-white font-bold text-sm transition-all shadow-lg hover:opacity-95 group"
              style={{ backgroundColor: 'var(--accent-main)' }}
            >
              <span>Explore My Projects Portfolio</span>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Map of section renderers
  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    hero: renderHeroSection,
    education: renderEducationSection,
    experience: renderExperienceSection,
    principles: renderPrinciplesSection,
    featured: renderFeaturedSection,
    summary: renderSummarySection,
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
            allowColumnChange={secId === 'principles' || secId === 'education' || secId === 'experience' || secId === 'featured'}
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
                : secId === 'education'
                ? 'education'
                : secId === 'experience'
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
