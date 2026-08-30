import { BaseProject } from '../types';
import { courtBookingData } from './courtBookingData';
import { smallerProjectsData } from './smallerProjectsData';

/**
 * ============================================================================
 * MASTER PROJECTS DIRECTORY
 * ============================================================================
 * Add new projects here. Reusable structure allows seamless expansion.
 */

export const featuredProjects: BaseProject[] = [
  {
    id: courtBookingData.id,
    slug: courtBookingData.slug,
    title: courtBookingData.title,
    category: 'Featured Product Case Study',
    categoryLabel: 'Flagship Product',
    oneLiner: courtBookingData.oneLiner,
    shortDescription: courtBookingData.shortDescription,
    thumbnail: '',
    tags: courtBookingData.tags,
    status: courtBookingData.status,
    appUrl: courtBookingData.appUrl,
    isFeatured: true
  },
  {
    id: 'future-product-case-study',
    slug: 'courtbooking', // Links to flagship or can be updated
    title: '[ADD FUTURE PRODUCT NAME]',
    category: 'Featured Product Case Study',
    categoryLabel: 'Upcoming Build',
    oneLiner: '[ONE-LINE PROBLEM STATEMENT: e.g. AI-driven intelligence layer for campus fleet scheduling]',
    shortDescription: '[SHORT DESCRIPTION: An end-to-end product development initiative currently in discovery and prototyping phase.]',
    thumbnail: '',
    tags: ['Product Discovery', 'System Design', 'AI Experimentation', '[ADD TAG]'],
    status: 'In Development',
    appUrl: '',
    isFeatured: true
  }
];

export const smallerProjects: BaseProject[] = [
  {
    id: smallerProjectsData['cohort-learning'].id,
    slug: smallerProjectsData['cohort-learning'].slug,
    title: smallerProjectsData['cohort-learning'].title,
    category: 'Smaller Build & Experiment',
    categoryLabel: smallerProjectsData['cohort-learning'].categoryLabel,
    oneLiner: smallerProjectsData['cohort-learning'].oneLiner,
    shortDescription: smallerProjectsData['cohort-learning'].shortDescription,
    thumbnail: '',
    tags: smallerProjectsData['cohort-learning'].tags,
    status: smallerProjectsData['cohort-learning'].status,
    appUrl: smallerProjectsData['cohort-learning'].appUrl
  },
  {
    id: smallerProjectsData['recruitment-platform'].id,
    slug: smallerProjectsData['recruitment-platform'].slug,
    title: smallerProjectsData['recruitment-platform'].title,
    category: 'Smaller Build & Experiment',
    categoryLabel: smallerProjectsData['recruitment-platform'].categoryLabel,
    oneLiner: smallerProjectsData['recruitment-platform'].oneLiner,
    shortDescription: smallerProjectsData['recruitment-platform'].shortDescription,
    thumbnail: '',
    tags: smallerProjectsData['recruitment-platform'].tags,
    status: smallerProjectsData['recruitment-platform'].status,
    appUrl: smallerProjectsData['recruitment-platform'].appUrl
  },
  {
    id: smallerProjectsData['alarm-setter'].id,
    slug: smallerProjectsData['alarm-setter'].slug,
    title: smallerProjectsData['alarm-setter'].title,
    category: 'Smaller Build & Experiment',
    categoryLabel: smallerProjectsData['alarm-setter'].categoryLabel,
    oneLiner: smallerProjectsData['alarm-setter'].oneLiner,
    shortDescription: smallerProjectsData['alarm-setter'].shortDescription,
    thumbnail: '',
    tags: smallerProjectsData['alarm-setter'].tags,
    status: smallerProjectsData['alarm-setter'].status,
    appUrl: smallerProjectsData['alarm-setter'].appUrl
  }
];

export const allProjects: BaseProject[] = [
  ...featuredProjects,
  ...smallerProjects
];
