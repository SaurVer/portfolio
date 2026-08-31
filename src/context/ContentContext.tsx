import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ProfileData, 
  EducationItem, 
  ExperienceItem, 
  PrincipleItem, 
  CourtBookingCaseStudy, 
  SmallerProjectCaseStudy, 
  BTCJourneyData,
  SectionId,
  BlockLayoutConfig,
  SectionWidth,
  SectionPadding
} from '../types';

import { 
  profileData as initialProfileData, 
  educationData as initialEducationData, 
  experienceData as initialExperienceData, 
  principlesData as initialPrinciplesData 
} from '../data/profileData';

import { courtBookingData as initialCourtBookingData } from '../data/courtBookingData';
import { smallerProjectsData as initialSmallerProjectsData } from '../data/smallerProjectsData';
import { btcJourneyData as initialBtcJourneyData } from '../data/btcJourneyData';

const STORAGE_KEY = 'portfolio_live_content_v2';
// Profile and education defaults were refreshed in August 2026. Version these
// sections independently so stale browser-saved placeholders do not override
// the new source content, while preserving edits made to all other sections.
const PROFILE_STORAGE_KEY = 'portfolio_live_content_v4_profile';
const EDUCATION_STORAGE_KEY = 'portfolio_live_content_v6_education';
const EXPERIENCE_STORAGE_KEY = 'portfolio_live_content_v3_experience';
const PRINCIPLES_STORAGE_KEY = 'portfolio_live_content_v3_principles';
const COURTBOOKING_STORAGE_KEY = 'portfolio_live_content_v3_courtbooking';
const EDIT_MODE_KEY = 'portfolio_live_edit_mode_v2';
const LAYOUT_KEY = 'portfolio_block_layouts_v3';
const HIDDEN_ELEMENTS_KEY = 'portfolio_hidden_elements_v2';

const localizeCourtBookingImage = (url: string) => {
  if (!url.includes('res.cloudinary.com/dxhksw41y')) return url;
  if (url.includes('find_slot_')) return '/projects/courtbooking-find-slot.png';
  if (url.includes('booking_confirmed_')) return '/projects/courtbooking-confirmed.png';
  if (url.includes('abandon_play_')) return '/projects/courtbooking-abandon.png';
  if (url.includes('see_who_is_playing_')) return '/projects/courtbooking-playing.png';
  return url;
};

export const defaultBlockConfigs: Record<SectionId, BlockLayoutConfig> = {
  hero: {
    id: 'hero',
    title: 'Hero & Background',
    order: 0,
    visible: true,
    width: 'standard',
    padding: 'standard',
    variant: 'photo-left',
  },
  journey: {
    id: 'journey',
    title: 'Education & Career Journey',
    order: 3,
    visible: true,
    width: 'standard',
    padding: 'standard',
  },
  principles: {
    id: 'principles',
    title: 'Product Philosophy',
    order: 2,
    visible: true,
    width: 'standard',
    padding: 'standard',
    columns: 4,
  },
  featured: {
    id: 'featured',
    title: 'Featured Work & Case Studies',
    order: 1,
    visible: true,
    width: 'standard',
    padding: 'standard',
    columns: 2,
  },
  about: {
    id: 'about',
    title: 'How I Think',
    order: 4,
    visible: true,
    width: 'standard',
    padding: 'standard',
  },
};

const normalizeBlockLayouts = (savedLayouts?: Partial<Record<SectionId, BlockLayoutConfig>>) =>
  (Object.keys(defaultBlockConfigs) as SectionId[]).reduce<Record<SectionId, BlockLayoutConfig>>(
    (layouts, id) => {
      layouts[id] = { ...defaultBlockConfigs[id], ...savedLayouts?.[id], id };
      return layouts;
    },
    {} as Record<SectionId, BlockLayoutConfig>
  );

interface ContentContextType {
  // Live state
  profileData: ProfileData;
  educationData: EducationItem[];
  experienceData: ExperienceItem[];
  principlesData: PrincipleItem[];
  courtBookingData: CourtBookingCaseStudy;
  smallerProjectsData: Record<string, SmallerProjectCaseStudy>;
  btcJourneyData: BTCJourneyData;
  
  // Layout and Block Management state
  blockLayouts: Record<SectionId, BlockLayoutConfig>;
  sectionOrder: SectionId[];
  updateSectionLayout: (id: SectionId, updates: Partial<BlockLayoutConfig>) => void;
  reorderSection: (id: SectionId, direction: 'up' | 'down') => void;
  moveSectionToPosition: (sourceId: SectionId, targetIndex: number) => void;
  toggleSectionVisibility: (id: SectionId) => void;
  resetBlockLayouts: () => void;

  // Granular Hidden Elements (Micro-removals)
  hiddenElements: string[];
  hideElement: (id: string) => void;
  restoreElement: (id: string) => void;
  isElementHidden: (id: string) => boolean;
  clearHiddenElements: () => void;
  
  // Edit mode controls
  isLiveEditMode: boolean;
  setIsLiveEditMode: (val: boolean) => void;
  toggleLiveEditMode: () => void;
  
  // Drawer/Modal Form Editor state
  isContentEditorOpen: boolean;
  setIsContentEditorOpen: (val: boolean) => void;
  activeEditorTab: string;
  setActiveEditorTab: (tab: string) => void;
  openEditorTab: (tab: string) => void;

  // Layout Manager Modal
  isLayoutManagerOpen: boolean;
  setIsLayoutManagerOpen: (val: boolean) => void;
  
  // Updaters & Granular Removers
  updateProfile: (updates: Partial<ProfileData>) => void;
  updateAbout: (updates: Partial<ProfileData['about']>) => void;
  removeInterest: (index: number) => void;
  addInterest: (interest: string) => void;

  updateEducation: (id: string, updates: Partial<EducationItem>) => void;
  addEducation: (item: EducationItem) => void;
  removeEducation: (id: string) => void;
  moveEducation: (index: number, direction: 'up' | 'down') => void;
  
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  addExperience: (item: ExperienceItem) => void;
  removeExperience: (id: string) => void;
  moveExperience: (index: number, direction: 'up' | 'down') => void;
  removeExperienceBullet: (expId: string, bulletIdx: number) => void;
  addExperienceBullet: (expId: string, bullet: string) => void;
  
  updatePrinciple: (id: number, updates: Partial<PrincipleItem>) => void;
  addPrinciple: (item: PrincipleItem) => void;
  removePrinciple: (id: number) => void;
  movePrinciple: (index: number, direction: 'up' | 'down') => void;
  updateCourtBooking: (updates: any) => void;
  updateSmallerProject: (slug: string, updates: Partial<SmallerProjectCaseStudy>) => void;
  updateBtcJourney: (updates: any) => void;
  
  // Global actions
  hasUnsavedEdits: boolean;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved content from localStorage or fallback
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProfileData;
    } catch {
      return initialProfileData;
    }
  });

  const [educationData, setEducationData] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(EDUCATION_STORAGE_KEY);
      if (!saved) return initialEducationData;

      return (JSON.parse(saved) as EducationItem[]).map((item) => {
        const source = initialEducationData.find((entry) =>
          entry.id === item.id || entry.collegeName === item.collegeName
        );
        return {
          ...item,
          institutionDescription: item.institutionDescription || source?.institutionDescription,
        };
      });
    } catch {
      return initialEducationData;
    }
  });

  const [experienceData, setExperienceData] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
      if (!saved) return initialExperienceData;

      // Preserve user-edited role content, but always map branding from the
      // current company name so reordered or renamed cards cannot show the
      // other company's logo.
      return (JSON.parse(saved) as ExperienceItem[]).map((item) => {
        const companyName = item.companyName.trim().toLowerCase();
        const isCricut = companyName.includes('cricut');
        const isSwiggy = companyName.includes('swiggy');

        if (isCricut) {
          return {
            ...item,
            logo: '/logos/cricut-logo.png',
            logoAlt: 'Cricut logo',
            companyDescription: item.companyDescription || initialExperienceData.find((entry) => entry.companyName === 'Cricut')?.companyDescription,
          };
        }
        if (isSwiggy) {
          return {
            ...item,
            logo: '/logos/swiggy-logo.png',
            logoAlt: 'Swiggy logo',
            companyDescription: item.companyDescription || initialExperienceData.find((entry) => entry.companyName === 'Swiggy')?.companyDescription,
          };
        }
        if (item.id === 'exp-1') return { ...item, companyName: 'Swiggy', logo: '/logos/swiggy-logo.png', logoAlt: 'Swiggy logo', companyDescription: initialExperienceData[0].companyDescription };
        if (item.id === 'exp-2') return { ...item, companyName: 'Cricut', logo: '/logos/cricut-logo.png', logoAlt: 'Cricut logo', companyDescription: initialExperienceData[1].companyDescription };
        return item;
      });
    } catch {
      return initialExperienceData;
    }
  });

  const [principlesData, setPrinciplesData] = useState<PrincipleItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRINCIPLES_STORAGE_KEY);
      if (!saved) return initialPrinciplesData;

      const parsed = JSON.parse(saved) as PrincipleItem[];
      if (parsed.length === 0) return initialPrinciplesData;

      // Keep the visible sequence stable even after deleting and re-adding
      // cards, and ensure every principle has a meaningful icon.
      return parsed.map((item, index) => {
        const title = item.title.trim().toLowerCase();
        const iconName = title.includes('excellence')
          ? 'Award'
          : title.includes('ownership')
          ? 'ShieldCheck'
          : title.includes('learning')
          ? 'BookOpen'
          : title.includes('leadership')
          ? 'Flag'
          : item.iconName || initialPrinciplesData[index]?.iconName || 'Target';

        return {
          ...item,
          id: index + 1,
          iconName,
        };
      });
    } catch {
      return initialPrinciplesData;
    }
  });

  const [courtBookingData, setCourtBookingData] = useState<CourtBookingCaseStudy>(() => {
    try {
      const saved = localStorage.getItem(COURTBOOKING_STORAGE_KEY);
      if (!saved) return initialCourtBookingData;

      const parsed = JSON.parse(saved) as CourtBookingCaseStudy;
      const screenshots = (parsed.narrative.screenshots || initialCourtBookingData.narrative.screenshots).map((screen, index) => ({
        ...screen,
        // Older browser-saved content predates the published screenshot URLs.
        // Keep user edits, but fall back to the source image when that saved URL is blank.
        imageUrl: localizeCourtBookingImage(screen.imageUrl || initialCourtBookingData.narrative.screenshots[index]?.imageUrl || ''),
      }));

      const flowDeepDives = (parsed.narrative.flowDeepDives || initialCourtBookingData.narrative.flowDeepDives)
        .filter((flow) => flow.id !== 'authentication')
        .map((flow) => {
          const sourceFlow = initialCourtBookingData.narrative.flowDeepDives.find((item) => item.id === flow.id);
          const savedScreens = (flow.screenshotUrls || []).filter((url) => url.trim());
          const onlyLegacyLocalScreens = savedScreens.every((url) => url.startsWith('/projects/'));
          const screenshotUrls = (!savedScreens.length || onlyLegacyLocalScreens)
            ? (sourceFlow?.screenshotUrls || savedScreens)
            : savedScreens;

          return {
            ...flow,
            screenshotUrls: screenshotUrls.map(localizeCourtBookingImage),
          };
        });

      return {
        ...parsed,
        narrative: {
          ...parsed.narrative,
          screenshots,
          flowDeepDives,
        },
      };
    } catch {
      return initialCourtBookingData;
    }
  });

  const [smallerProjectsData, setSmallerProjectsData] = useState<Record<string, SmallerProjectCaseStudy>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_smaller_projects`);
      return saved ? JSON.parse(saved) : initialSmallerProjectsData;
    } catch {
      return initialSmallerProjectsData;
    }
  });

  const [btcJourneyData, setBtcJourneyData] = useState<BTCJourneyData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_btc_journey`);
      return saved ? JSON.parse(saved) : initialBtcJourneyData;
    } catch {
      return initialBtcJourneyData;
    }
  });

  // Block Layout configs
  const [blockLayouts, setBlockLayouts] = useState<Record<SectionId, BlockLayoutConfig>>(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeBlockLayouts(parsed);
      }
      return defaultBlockConfigs;
    } catch {
      return defaultBlockConfigs;
    }
  });

  // Hidden granular elements
  const [hiddenElements, setHiddenElements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(HIDDEN_ELEMENTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Edit Mode state
  const [isLiveEditMode, setIsLiveEditModeState] = useState<boolean>(() => {
    if (!import.meta.env.DEV) return false;
    const saved = localStorage.getItem(EDIT_MODE_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false);
  const [isLayoutManagerOpen, setIsLayoutManagerOpen] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('profile');

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }, [profileData]);

  useEffect(() => {
    try {
      localStorage.setItem(EDUCATION_STORAGE_KEY, JSON.stringify(educationData));
    } catch (e) {
      console.warn('Failed to save education', e);
    }
  }, [educationData]);

  useEffect(() => {
    try {
      localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(experienceData));
    } catch (e) {
      console.warn('Failed to save experience', e);
    }
  }, [experienceData]);

  useEffect(() => {
    try {
      localStorage.setItem(PRINCIPLES_STORAGE_KEY, JSON.stringify(principlesData));
    } catch (e) {
      console.warn('Failed to save principles', e);
    }
  }, [principlesData]);

  useEffect(() => {
    try {
      localStorage.setItem(COURTBOOKING_STORAGE_KEY, JSON.stringify(courtBookingData));
    } catch (e) {
      console.warn('Failed to save courtbooking', e);
    }
  }, [courtBookingData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_smaller_projects`, JSON.stringify(smallerProjectsData));
    } catch (e) {
      console.warn('Failed to save smaller projects', e);
    }
  }, [smallerProjectsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_btc_journey`, JSON.stringify(btcJourneyData));
    } catch (e) {
      console.warn('Failed to save btc journey', e);
    }
  }, [btcJourneyData]);

  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(blockLayouts));
    } catch (e) {
      console.warn('Failed to save layouts', e);
    }
  }, [blockLayouts]);

  const setIsLiveEditMode = (val: boolean) => {
    if (!import.meta.env.DEV) return;
    setIsLiveEditModeState(val);
    localStorage.setItem(EDIT_MODE_KEY, String(val));
  };

  const toggleLiveEditMode = () => {
    if (!import.meta.env.DEV) return;
    setIsLiveEditModeState((prev) => {
      const next = !prev;
      localStorage.setItem(EDIT_MODE_KEY, String(next));
      return next;
    });
  };

  const openEditorTab = (tab: string) => {
    setActiveEditorTab(tab);
    setIsContentEditorOpen(true);
  };

  // Section Ordering and Resizing
  const sectionOrder: SectionId[] = (Object.values(blockLayouts) as BlockLayoutConfig[])
    .sort((a, b) => a.order - b.order)
    .map((s) => s.id);

  const updateSectionLayout = (id: SectionId, updates: Partial<BlockLayoutConfig>) => {
    setBlockLayouts((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));
  };

  const reorderSection = (id: SectionId, direction: 'up' | 'down') => {
    const currentList = [...sectionOrder];
    const currentIndex = currentList.indexOf(id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    // Swap
    const temp = currentList[currentIndex];
    currentList[currentIndex] = currentList[targetIndex];
    currentList[targetIndex] = temp;

    const updated = { ...blockLayouts };
    currentList.forEach((secId, index) => {
      updated[secId] = { ...updated[secId], order: index };
    });

    setBlockLayouts(updated);
  };

  const moveSectionToPosition = (sourceId: SectionId, targetIndex: number) => {
    const currentList = [...sectionOrder].filter((id) => id !== sourceId);
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex > currentList.length) targetIndex = currentList.length;

    currentList.splice(targetIndex, 0, sourceId);

    const updated = { ...blockLayouts };
    currentList.forEach((secId, index) => {
      updated[secId] = { ...updated[secId], order: index };
    });

    setBlockLayouts(updated);
  };

  const toggleSectionVisibility = (id: SectionId) => {
    setBlockLayouts((prev) => ({
      ...prev,
      [id]: { ...prev[id], visible: !prev[id].visible },
    }));
  };

  const resetBlockLayouts = () => {
    setBlockLayouts(defaultBlockConfigs);
    localStorage.removeItem(LAYOUT_KEY);
  };

  // Granular Element Hiding / Micro-Removals
  const hideElement = (id: string) => {
    setHiddenElements((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(HIDDEN_ELEMENTS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save hidden elements', e);
      }
      return next;
    });
  };

  const restoreElement = (id: string) => {
    setHiddenElements((prev) => {
      const next = prev.filter((item) => item !== id);
      try {
        localStorage.setItem(HIDDEN_ELEMENTS_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save hidden elements', e);
      }
      return next;
    });
  };

  const isElementHidden = (id: string): boolean => {
    return hiddenElements.includes(id);
  };

  const clearHiddenElements = () => {
    setHiddenElements([]);
    localStorage.removeItem(HIDDEN_ELEMENTS_KEY);
  };

  // Updaters & Granular Removers
  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...updates }));
  };

  const updateAbout = (updates: Partial<ProfileData['about']>) => {
    setProfileData((prev) => ({
      ...prev,
      about: { ...prev.about, ...updates },
    }));
  };

  const removeInterest = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        interests: prev.about.interests.filter((_, i) => i !== index),
      },
    }));
  };

  const addInterest = (interest: string) => {
    if (!interest.trim()) return;
    setProfileData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        interests: [...prev.about.interests, interest.trim()],
      },
    }));
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    setEducationData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addEducation = (item: EducationItem) => {
    setEducationData((prev) => [...prev, item]);
  };

  const removeEducation = (id: string) => {
    setEducationData((prev) => prev.filter((item) => item.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    setEducationData((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setExperienceData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addExperience = (item: ExperienceItem) => {
    setExperienceData((prev) => [...prev, item]);
  };

  const removeExperience = (id: string) => {
    setExperienceData((prev) => prev.filter((item) => item.id !== id));
  };

  const removeExperienceBullet = (expId: string, bulletIdx: number) => {
    setExperienceData((prev) =>
      prev.map((item) => {
        if (item.id !== expId) return item;
        return {
          ...item,
          bullets: (item.bullets || []).filter((_, idx) => idx !== bulletIdx),
        };
      })
    );
  };

  const addExperienceBullet = (expId: string, bullet: string) => {
    if (!bullet.trim()) return;
    setExperienceData((prev) =>
      prev.map((item) => {
        if (item.id !== expId) return item;
        return {
          ...item,
          bullets: [...(item.bullets || []), bullet.trim()],
        };
      })
    );
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    setExperienceData((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const updatePrinciple = (id: number, updates: Partial<PrincipleItem>) => {
    setPrinciplesData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addPrinciple = (item: PrincipleItem) => {
    setPrinciplesData((prev) => [...prev, item]);
  };

  const removePrinciple = (id: number) => {
    setPrinciplesData((prev) => prev.filter((item) => item.id !== id));
  };

  const movePrinciple = (index: number, direction: 'up' | 'down') => {
    setPrinciplesData((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const updateCourtBooking = (updates: any) => {
    setCourtBookingData((prev) => ({ ...prev, ...updates }));
  };

  const updateSmallerProject = (slug: string, updates: Partial<SmallerProjectCaseStudy>) => {
    setSmallerProjectsData((prev) => {
      const current = prev[slug];
      if (!current) return prev;
      return {
        ...prev,
        [slug]: { ...current, ...updates },
      };
    });
  };

  const updateBtcJourney = (updates: any) => {
    setBtcJourneyData((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all content back to defaults? Any custom edits saved in your browser will be cleared.')) {
      setProfileData(initialProfileData);
      setEducationData(initialEducationData);
      setExperienceData(initialExperienceData);
      setPrinciplesData(initialPrinciplesData);
      setCourtBookingData(initialCourtBookingData);
      setSmallerProjectsData(initialSmallerProjectsData);
      setBtcJourneyData(initialBtcJourneyData);
      setBlockLayouts(defaultBlockConfigs);

      localStorage.removeItem(PROFILE_STORAGE_KEY);
      localStorage.removeItem(EDUCATION_STORAGE_KEY);
      localStorage.removeItem(EXPERIENCE_STORAGE_KEY);
      localStorage.removeItem(PRINCIPLES_STORAGE_KEY);
      localStorage.removeItem(COURTBOOKING_STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_smaller_projects`);
      localStorage.removeItem(`${STORAGE_KEY}_btc_journey`);
      localStorage.removeItem(LAYOUT_KEY);
      localStorage.removeItem(HIDDEN_ELEMENTS_KEY);
      setHiddenElements([]);
    }
  };

  const exportJSON = () => {
    const payload = {
      profileData,
      educationData,
      experienceData,
      principlesData,
      courtBookingData,
      smallerProjectsData,
      btcJourneyData,
      blockLayouts,
      hiddenElements,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profileData) setProfileData(data.profileData);
      if (data.educationData) setEducationData(data.educationData);
      if (data.experienceData) setExperienceData(data.experienceData);
      if (data.principlesData) setPrinciplesData(data.principlesData);
      if (data.courtBookingData) setCourtBookingData(data.courtBookingData);
      if (data.smallerProjectsData) setSmallerProjectsData(data.smallerProjectsData);
      if (data.btcJourneyData) setBtcJourneyData(data.btcJourneyData);
      if (data.blockLayouts) setBlockLayouts(normalizeBlockLayouts(data.blockLayouts));
      if (data.hiddenElements) setHiddenElements(data.hiddenElements);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        profileData,
        educationData,
        experienceData,
        principlesData,
        courtBookingData,
        smallerProjectsData,
        btcJourneyData,
        blockLayouts,
        sectionOrder,
        updateSectionLayout,
        reorderSection,
        moveSectionToPosition,
        toggleSectionVisibility,
        resetBlockLayouts,
        hiddenElements,
        hideElement,
        restoreElement,
        isElementHidden,
        clearHiddenElements,
        isLiveEditMode,
        setIsLiveEditMode,
        toggleLiveEditMode,
        isContentEditorOpen,
        setIsContentEditorOpen,
        isLayoutManagerOpen,
        setIsLayoutManagerOpen,
        activeEditorTab,
        setActiveEditorTab,
        openEditorTab,
        updateProfile,
        updateAbout,
        removeInterest,
        addInterest,
        updateEducation,
        addEducation,
        removeEducation,
        moveEducation,
        updateExperience,
        addExperience,
        removeExperience,
        moveExperience,
        removeExperienceBullet,
        addExperienceBullet,
        updatePrinciple,
        addPrinciple,
        removePrinciple,
        movePrinciple,
        updateCourtBooking,
        updateSmallerProject,
        updateBtcJourney,
        hasUnsavedEdits: true,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
