import React from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Trash2, Plus } from 'lucide-react';
import { EducationItem, ExperienceItem } from '../types';
import { PlaceholderTag } from './PlaceholderTag';
import { useContent } from '../context/ContentContext';
import { EditableText } from './EditableText';

interface EducationCardProps {
  item: EducationItem;
  onRemove?: () => void;
}

export const EducationCard: React.FC<EducationCardProps> = ({ item, onRemove }) => {
  const { isLiveEditMode, updateEducation } = useContent();

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all duration-300 space-y-4 group relative">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          {/* Neutral Logo / Monogram Container */}
          <div className="w-13 h-13 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center p-2.5 shrink-0 group-hover:border-stone-300 transition-colors">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.logoAlt}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <GraduationCap className="w-6 h-6" style={{ color: 'var(--accent-main)' }} />
            )}
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-500 font-medium">
              <Calendar className="w-3 h-3" style={{ color: 'var(--accent-main)' }} />
              <EditableText
                value={item.period}
                onSave={(val) => updateEducation(item.id, { period: val })}
                className="text-[11px] font-mono text-stone-500 font-medium"
                labelHint="Duration"
              />
            </span>
            {item.location && (
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <EditableText
                  value={item.location}
                  onSave={(val) => updateEducation(item.id, { location: val })}
                  onRemove={() => updateEducation(item.id, { location: '' })}
                  className="text-[10px] font-mono text-stone-400"
                  labelHint="Location"
                />
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-bold text-stone-900 font-syne transition-colors">
            <EditableText
              value={item.collegeName}
              onSave={(val) => updateEducation(item.id, { collegeName: val })}
              className="text-lg font-bold text-stone-900 font-syne"
              labelHint="Institution"
            />
          </h4>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--accent-main)' }}>
            <EditableText
              value={item.qualification}
              onSave={(val) => updateEducation(item.id, { qualification: val })}
              className="text-xs sm:text-sm font-semibold"
              labelHint="Qualification"
            />
          </p>
        </div>

        {item.description && (
          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            <EditableText
              value={item.description}
              onSave={(val) => updateEducation(item.id, { description: val })}
              onRemove={() => updateEducation(item.id, { description: '' })}
              multiline={true}
              className="text-xs text-stone-600 leading-relaxed block"
              labelHint="Description"
            />
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
        <span>Higher Education</span>
        <span>[COLLEGE LOGO]</span>
      </div>

      {/* Delete Degree Button in Live Edit Mode */}
      {isLiveEditMode && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 shadow-xs"
          title="Remove degree"
          aria-label="Remove degree"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

interface ExperienceCardProps {
  item: ExperienceItem;
  onRemove?: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, onRemove }) => {
  const { 
    isLiveEditMode, 
    updateExperience, 
    removeExperienceBullet, 
    addExperienceBullet 
  } = useContent();

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all duration-300 space-y-4 group relative">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          {/* Neutral Logo Container */}
          <div className="w-13 h-13 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center p-2.5 shrink-0 group-hover:border-stone-300 transition-colors">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.logoAlt}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <Briefcase className="w-6 h-6" style={{ color: 'var(--accent-main)' }} />
            )}
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-500 font-medium">
              <Calendar className="w-3 h-3" style={{ color: 'var(--accent-main)' }} />
              <EditableText
                value={item.period}
                onSave={(val) => updateExperience(item.id, { period: val })}
                className="text-[11px] font-mono text-stone-500 font-medium"
                labelHint="Duration"
              />
            </span>
            {item.location && (
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <EditableText
                  value={item.location}
                  onSave={(val) => updateExperience(item.id, { location: val })}
                  onRemove={() => updateExperience(item.id, { location: '' })}
                  className="text-[10px] font-mono text-stone-400"
                  labelHint="Location"
                />
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-bold text-stone-900 font-syne transition-colors">
            <EditableText
              value={item.companyName}
              onSave={(val) => updateExperience(item.id, { companyName: val })}
              className="text-lg font-bold text-stone-900 font-syne"
              labelHint="Company Name"
            />
          </h4>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--accent-main)' }}>
            <EditableText
              value={item.role}
              onSave={(val) => updateExperience(item.id, { role: val })}
              className="text-xs sm:text-sm font-semibold"
              labelHint="Role"
            />
          </p>
        </div>

        {item.description && (
          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            <EditableText
              value={item.description}
              onSave={(val) => updateExperience(item.id, { description: val })}
              onRemove={() => updateExperience(item.id, { description: '' })}
              multiline={true}
              className="text-xs text-stone-600 leading-relaxed block"
              labelHint="Description"
            />
          </p>
        )}

        {item.bullets && item.bullets.length > 0 && (
          <ul className="space-y-2 pt-2">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 group/bullet relative">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-main)' }} />
                <div className="flex-1 flex items-center justify-between gap-2">
                  <EditableText
                    value={bullet}
                    onSave={(val) => {
                      const updated = [...(item.bullets || [])];
                      updated[idx] = val;
                      updateExperience(item.id, { bullets: updated });
                    }}
                    onRemove={() => removeExperienceBullet(item.id, idx)}
                    className="flex-1"
                    labelHint={`Bullet #${idx + 1}`}
                  />
                  {isLiveEditMode && (
                    <button
                      onClick={() => removeExperienceBullet(item.id, idx)}
                      className="opacity-0 group-hover/bullet:opacity-100 p-0.5 text-stone-400 hover:text-rose-500 transition-opacity"
                      title="Remove this bullet"
                      aria-label="Remove bullet"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {isLiveEditMode && (
          <button
            onClick={() => addExperienceBullet(item.id, 'New key achievement')}
            className="text-[11px] font-mono text-stone-500 hover:text-stone-900 flex items-center gap-1 pt-1 font-semibold"
          >
            <Plus className="w-3 h-3 text-amber-500" />
            <span>Add bullet achievement</span>
          </button>
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
        <span>Work Experience</span>
        <span>[COMPANY LOGO]</span>
      </div>

      {/* Delete Experience Role Button in Live Edit Mode */}
      {isLiveEditMode && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 shadow-xs"
          title="Remove experience role"
          aria-label="Remove role"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
