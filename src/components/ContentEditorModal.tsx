import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { SmallerProjectCaseStudy } from '../types';
import { 
  X, 
  User, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  Sparkles, 
  Layers, 
  Award, 
  Download, 
  Copy, 
  Plus, 
  Trash2, 
  Check, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';

export const ContentEditorModal: React.FC = () => {
  const {
    isContentEditorOpen,
    setIsContentEditorOpen,
    activeEditorTab,
    setActiveEditorTab,
    profileData,
    updateProfile,
    updateAbout,
    educationData,
    updateEducation,
    addEducation,
    removeEducation,
    experienceData,
    updateExperience,
    addExperience,
    removeExperience,
    principlesData,
    updatePrinciple,
    addPrinciple,
    removePrinciple,
    courtBookingData,
    updateCourtBooking,
    smallerProjectsData,
    updateSmallerProject,
    btcJourneyData,
    updateBtcJourney,
    resetToDefaults,
    exportJSON,
    importJSON
  } = useContent();

  const [copied, setCopied] = useState(false);
  const [importStr, setImportStr] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isContentEditorOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile & About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'principles', label: 'Product Principles', icon: Compass },
    { id: 'courtbooking', label: 'CourtBooking App', icon: Sparkles },
    { id: 'smaller-projects', label: 'Smaller Builds', icon: Layers },
    { id: 'btc-journey', label: 'BTC Journey', icon: Award },
    { id: 'export-import', label: 'Export & Backup', icon: Download },
  ];

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyImport = () => {
    const success = importJSON(importStr);
    if (success) {
      setImportStatus('success');
      setTimeout(() => setImportStatus('idle'), 2500);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold font-syne text-stone-900 flex items-center gap-2">
              <span>Portfolio Content Editor</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                Auto-saved in browser
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Edit all texts, bullet points, metrics, and case studies instantly.
            </p>
          </div>

          <button
            onClick={() => setIsContentEditorOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-stone-200 px-4 bg-stone-50/40 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeEditorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveEditorTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-stone-900 text-stone-900 font-bold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PROFILE & ABOUT */}
          {activeEditorTab === 'profile' && (
            <div className="space-y-6 max-w-3xl">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">Role Title / Aspiring PM</label>
                  <input
                    type="text"
                    value={profileData.roleTitle}
                    onChange={(e) => updateProfile({ roleTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-stone-700">Positioning Statement (Quotes)</label>
                <textarea
                  value={profileData.positioningStatement}
                  onChange={(e) => updateProfile({ positioningStatement: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm leading-relaxed focus:bg-white focus:outline-none focus:border-stone-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">Photo URL (Cloudinary / Image Link)</label>
                  <input
                    type="text"
                    value={profileData.photoUrl}
                    onChange={(e) => updateProfile({ photoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-stone-800"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={profileData.linkedInUrl}
                    onChange={(e) => updateProfile({ linkedInUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-stone-800"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-4">
                <h3 className="text-sm font-bold font-syne text-stone-900">About Me Details</h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">Intro Narrative</label>
                  <textarea
                    value={profileData.about.intro}
                    onChange={(e) => updateAbout({ intro: e.target.value })}
                    rows={3}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm leading-relaxed focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-stone-700">The Problems I Enjoy Solving</label>
                    <textarea
                      value={profileData.about.problemsEnjoyed}
                      onChange={(e) => updateAbout({ problemsEnjoyed: e.target.value })}
                      rows={3}
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs leading-relaxed focus:bg-white focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-stone-700">Product & Career Aspiration</label>
                    <textarea
                      value={profileData.about.aspiration}
                      onChange={(e) => updateAbout({ aspiration: e.target.value })}
                      rows={3}
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs leading-relaxed focus:bg-white focus:outline-none focus:border-stone-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-stone-700">Interest Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={profileData.about.interests.join(', ')}
                    onChange={(e) => updateAbout({ interests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeEditorTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500 font-medium">Manage degrees, colleges, dates, and locations.</p>
                <button
                  onClick={() => addEducation({
                    id: `edu-${Date.now()}`,
                    collegeName: 'New College / University',
                    qualification: 'Degree & Specialization',
                    period: '2024 - 2025',
                    location: 'City, Country',
                    logo: '',
                    logoAlt: 'College Logo',
                    description: 'Brief overview of academic focus and key achievements.'
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="space-y-4">
                {educationData.map((edu, idx) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-stone-500">Degree #{idx + 1}</span>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete Degree"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">College / Institution</label>
                        <input
                          type="text"
                          value={edu.collegeName}
                          onChange={(e) => updateEducation(edu.id, { collegeName: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs font-bold text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Degree / Qualification</label>
                        <input
                          type="text"
                          value={edu.qualification}
                          onChange={(e) => updateEducation(edu.id, { qualification: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs font-semibold text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Duration / Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => updateEducation(edu.id, { period: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Location</label>
                        <input
                          type="text"
                          value={edu.location || ''}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">About the Institution</label>
                      <textarea
                        value={edu.institutionDescription || ''}
                        onChange={(e) => updateEducation(edu.id, { institutionDescription: e.target.value })}
                        rows={2}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">Description & Highlights</label>
                      <textarea
                        value={edu.description || ''}
                        onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                        rows={2}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WORK EXPERIENCE */}
          {activeEditorTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500 font-medium">Manage companies, roles, dates, and bullet achievements.</p>
                <button
                  onClick={() => addExperience({
                    id: `exp-${Date.now()}`,
                    companyName: 'Company Name',
                    role: 'Product / Project Role',
                    period: '2022 - 2024',
                    location: 'City, Country',
                    logo: '',
                    logoAlt: 'Company Logo',
                    description: 'Role overview',
                    bullets: ['Led cross-functional feature delivery', 'Improved conversion and operational metrics']
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {experienceData.map((exp, idx) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-stone-500">Experience #{idx + 1}</span>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Company Name</label>
                        <input
                          type="text"
                          value={exp.companyName}
                          onChange={(e) => updateExperience(exp.id, { companyName: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs font-bold text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Job Title / Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs font-semibold text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Duration / Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-stone-600">Location</label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">About the Company</label>
                      <textarea
                        value={exp.companyDescription || ''}
                        onChange={(e) => updateExperience(exp.id, { companyDescription: e.target.value })}
                        rows={2}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">Bullet Achievements (One per line)</label>
                      <textarea
                        value={(exp.bullets || []).join('\n')}
                        onChange={(e) => updateExperience(exp.id, { bullets: e.target.value.split('\n').filter(Boolean) })}
                        rows={3}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCT PRINCIPLES */}
          {activeEditorTab === 'principles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500 font-medium">Edit, add, or remove your core guiding product principles.</p>
                <button
                  onClick={() => {
                    const nextId = principlesData.length > 0 ? Math.max(...principlesData.map((p) => p.id)) + 1 : 1;
                    addPrinciple({
                      id: nextId,
                      title: 'Guiding Principle',
                      description: 'Clear statement on product rationale and methodology.',
                      iconName: 'Target',
                      actionableTakeaway: 'Focus on high-impact user outcomes.'
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Principle</span>
                </button>
              </div>

              {principlesData.map((principle, index) => (
                <div key={principle.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 h-6 rounded-md bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-mono font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <input
                        type="text"
                        value={principle.title}
                        onChange={(e) => updatePrinciple(principle.id, { title: e.target.value })}
                        className="flex-1 p-1.5 rounded-lg bg-white border border-stone-300 text-xs font-bold text-stone-900"
                      />
                    </div>
                    <button
                      onClick={() => removePrinciple(principle.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Delete Principle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">Icon</label>
                    <select
                      value={principle.iconName}
                      onChange={(e) => updatePrinciple(principle.id, { iconName: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                    >
                      <option value="Target">Target — Start with the problem</option>
                      <option value="Hammer">Hammer — Build to learn</option>
                      <option value="Users">People — User centred</option>
                      <option value="Compass">Compass — Ownership and direction</option>
                      <option value="Award">Award — Excellence</option>
                      <option value="ShieldCheck">Shield — Ownership</option>
                      <option value="BookOpen">Book — Learning</option>
                      <option value="Flag">Flag — Leadership</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">Description</label>
                    <textarea
                      value={principle.description}
                      onChange={(e) => updatePrinciple(principle.id, { description: e.target.value })}
                      rows={2}
                      className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">Takeaway (Italicized)</label>
                    <input
                      type="text"
                      value={principle.actionableTakeaway || ''}
                      onChange={(e) => updatePrinciple(principle.id, { actionableTakeaway: e.target.value })}
                      className="w-full p-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 italic"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: COURTBOOKING CASE STUDY */}
          {activeEditorTab === 'courtbooking' && (
            <div className="space-y-5 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-stone-700">Project Title</label>
                  <input
                    type="text"
                    value={courtBookingData.title}
                    onChange={(e) => updateCourtBooking({ title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-stone-700">My Role</label>
                  <input
                    type="text"
                    value={courtBookingData.myRole}
                    onChange={(e) => updateCourtBooking({ myRole: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">One Liner Summary</label>
                <textarea
                  value={courtBookingData.oneLiner}
                  onChange={(e) => updateCourtBooking({ oneLiner: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-stone-700">Featured Attribution</label>
                  <input
                    type="text"
                    value={courtBookingData.featuredAttribution || ''}
                    onChange={(e) => updateCourtBooking({ featuredAttribution: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-stone-700">Story Link Label</label>
                  <input
                    type="text"
                    value={courtBookingData.detailsCtaLabel || ''}
                    onChange={(e) => updateCourtBooking({ detailsCtaLabel: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">Featured Description</label>
                <textarea
                  value={courtBookingData.shortDescription}
                  onChange={(e) => updateCourtBooking({ shortDescription: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">The Problem Overview</label>
                <textarea
                  value={courtBookingData.narrative.theProblem.overview}
                  onChange={(e) => updateCourtBooking({
                    narrative: {
                      ...courtBookingData.narrative,
                      theProblem: {
                        ...courtBookingData.narrative.theProblem,
                        overview: e.target.value
                      }
                    }
                  })}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">Why Worth Solving</label>
                <textarea
                  value={courtBookingData.narrative.theProblem.whyWorthSolving}
                  onChange={(e) => updateCourtBooking({
                    narrative: {
                      ...courtBookingData.narrative,
                      theProblem: {
                        ...courtBookingData.narrative.theProblem,
                        whyWorthSolving: e.target.value
                      }
                    }
                  })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div>
                  <p className="text-xs font-mono font-bold text-stone-800">Featured App Screenshots</p>
                  <p className="text-[11px] text-stone-500">Add four direct image URLs for the large homepage showcase.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courtBookingData.narrative.screenshots.slice(0, 4).map((screen, index) => (
                    <div key={screen.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <label className="text-[11px] font-mono font-bold text-stone-700">Screenshot {index + 1}</label>
                      <input
                        type="url"
                        value={screen.imageUrl}
                        placeholder="https://.../screenshot.png"
                        onChange={(e) => {
                          const screenshots = [...courtBookingData.narrative.screenshots];
                          screenshots[index] = { ...screenshots[index], imageUrl: e.target.value };
                          updateCourtBooking({
                            narrative: {
                              ...courtBookingData.narrative,
                              screenshots,
                            }
                          });
                        }}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                      />
                      <p className="text-[10px] text-stone-500 line-clamp-1">{screen.screenTitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SMALLER BUILDS */}
          {activeEditorTab === 'smaller-projects' && (
            <div className="space-y-6">
              {(Object.entries(smallerProjectsData) as [string, SmallerProjectCaseStudy][]).map(([slug, project]) => (
                <div key={slug} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold font-syne text-stone-900">{project.title}</h3>
                    <span className="text-xs font-mono text-stone-400">/{slug}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">The Problem</label>
                    <textarea
                      value={project.problem}
                      onChange={(e) => updateSmallerProject(slug, { problem: e.target.value })}
                      rows={2}
                      className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-stone-600">What I Built & How It Worked</label>
                    <textarea
                      value={project.whatIBuilt}
                      onChange={(e) => updateSmallerProject(slug, { whatIBuilt: e.target.value })}
                      rows={2}
                      className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">My Contribution</label>
                      <textarea
                        value={project.myContribution}
                        onChange={(e) => updateSmallerProject(slug, { myContribution: e.target.value })}
                        rows={2}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-stone-600">What I Learned</label>
                      <textarea
                        value={project.whatILearned}
                        onChange={(e) => updateSmallerProject(slug, { whatILearned: e.target.value })}
                        rows={2}
                        className="w-full p-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: BTC JOURNEY */}
          {activeEditorTab === 'btc-journey' && (
            <div className="space-y-5 max-w-3xl">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">Leadership Overview</label>
                <textarea
                  value={btcJourneyData.leadershipOverview}
                  onChange={(e) => updateBtcJourney({ leadershipOverview: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">Starting Context</label>
                <textarea
                  value={btcJourneyData.startingContext}
                  onChange={(e) => updateBtcJourney({ startingContext: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-stone-700">Key Leadership Lessons (One per line)</label>
                <textarea
                  value={btcJourneyData.leadershipLessons.join('\n')}
                  onChange={(e) => updateBtcJourney({ leadershipLessons: e.target.value.split('\n').filter(Boolean) })}
                  rows={4}
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 8: EXPORT & IMPORT BACKUP */}
          {activeEditorTab === 'export-import' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <h3 className="text-sm font-bold font-syne text-stone-900">Export / Copy JSON Backup</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  All your changes are automatically preserved in your browser. You can also copy or download this JSON data file for permanent backup.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCopyJSON}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy All Data JSON'}</span>
                  </button>

                  <button
                    onClick={resetToDefaults}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <h3 className="text-sm font-bold font-syne text-stone-900">Import / Restore from JSON</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Paste a previously exported JSON backup to load your changes instantly.
                </p>
                <textarea
                  value={importStr}
                  onChange={(e) => setImportStr(e.target.value)}
                  placeholder="Paste JSON here..."
                  rows={4}
                  className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs font-mono"
                />
                <button
                  onClick={handleApplyImport}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  <span>Apply Imported JSON</span>
                </button>
                {importStatus === 'success' && (
                  <p className="text-xs text-emerald-600 font-bold">✓ Data restored successfully!</p>
                )}
                {importStatus === 'error' && (
                  <p className="text-xs text-rose-600 font-bold">✕ Invalid JSON format. Please check and try again.</p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-stone-500">
            Tip: You can also click directly on any text on the page to edit inline.
          </span>

          <button
            onClick={() => setIsContentEditorOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 shadow-sm"
          >
            Done Editing
          </button>
        </div>

      </div>

    </div>
  );
};
