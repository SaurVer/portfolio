import { ProfileData, EducationItem, ExperienceItem, PrincipleItem } from '../types';

/**
 * ============================================================================
 * PROFILE DATA CONFIGURATION
 * ============================================================================
 * Edit this file to update your personal details, biography, education,
 * professional experience, core principles, and links.
 */

export const profileData: ProfileData = {
  // Candidate full name
  name: 'Saurabh Verma',
  roleTitle: 'Aspiring Product / Project Manager & Builder',
  tagline: 'Problem Solver · Hands-on Builder · Technology Leader',
  
  // Official Positioning Statement
  positioningStatement: 'I turn real problems into practical products by combining structured thinking, user understanding, and technology.',
  
  // Professional photo (hosted on Cloudinary)
  photoUrl: 'https://res.cloudinary.com/dxhksw41y/image/upload/v1778430442/WhatsApp_Image_2026-04-29_at_3.58.01_PM_zijymq.jpg',
  photoAlt: 'Professional Portrait of Saurabh Verma',
  
  // External profile links
  linkedInUrl: 'https://www.linkedin.com', // Replace with your LinkedIn profile URL
  email: 'saurabhverma561@gmail.com', // User email
  location: 'Hyderabad / India',
  
  // About Me Section Data
  about: {
    intro: 'I am a builder and analytical thinker with a passion for designing practical, human-centred software solutions. My background bridges hands-on software development, stakeholder management, and student community leadership.',
    interests: [
      'Product Strategy & Discovery',
      'Process Automation & Workflows',
      'AI & Technology Experimentation',
      'User Research & Usability Design',
      'Cross-functional Execution'
    ],
    problemsEnjoyed: 'I enjoy taking unstructured, friction-heavy operational bottlenecks—from chaotic campus court reservations to recruitment preference collection—and transforming them into frictionless, delightful digital workflows.',
    productInterest: 'I am driven by hands-on execution: testing assumptions early, writing code or automations to validate solutions rapidly, and listening closely to user feedback to iterate with conviction.',
    aspiration: 'I am actively seeking roles in Product Management and Technical Project Management where I can lead high-impact products from zero to one and scale systems that make people more productive.'
  },

  // Narrative summary connecting education, experience, leadership, and product work
  summaryNarrative: 'By combining rigorous academic foundations, hands-on software development experience, and high-trust leadership as President of the Business Technology Club, I bring a rare synthesis of empathy, technical execution, and strategic product thinking to every challenge I undertake.'
};

/**
 * EDUCATION HISTORY
 * Logo containers are styled to blend seamlessly into the background while preserving aspect ratios.
 */
export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    collegeName: '[COLLEGE 1 NAME]',
    logo: '', // Leave blank to render clean neutral monogram badge, or provide path '/logos/college1.svg'
    logoAlt: 'College 1 Logo',
    qualification: '[QUALIFICATION]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    description: 'Focus on technology, analytical problem solving, and product management foundations.'
  },
  {
    id: 'edu-2',
    collegeName: '[COLLEGE 2 NAME]',
    logo: '', 
    logoAlt: 'College 2 Logo',
    qualification: '[QUALIFICATION]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    description: 'Undergraduate degree building strong technical depth, software engineering, and systems logic.'
  }
];

/**
 * PROFESSIONAL EXPERIENCE
 */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    companyName: '[COMPANY 1 NAME]',
    logo: '', // e.g. '/logos/company1.svg'
    logoAlt: 'Company 1 Logo',
    role: '[ROLE AND DATES]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    description: 'Led cross-functional initiatives, automated operational workflows, and solved operational bottlenecks with technology.',
    bullets: [
      'Identified workflow inefficiencies and designed practical software solutions to streamline user tasks.',
      'Collaborated closely with end users and stakeholders to translate complex requirements into clean deliverables.'
    ]
  },
  {
    id: 'exp-2',
    companyName: '[COMPANY 2 NAME]',
    logo: '',
    logoAlt: 'Company 2 Logo',
    role: '[ROLE AND DATES]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    description: 'Hands-on engineering, product delivery, and collaborating with cross-functional teams to ship robust tools.',
    bullets: [
      'Built and maintained digital interfaces, ensuring performance, responsiveness, and clean user experience.',
      'Conducted iterative user testing and incorporated feedback into rapid release cycles.'
    ]
  }
];

/**
 * WHAT I STAND FOR - 4 CORE PRINCIPLES
 */
export const principlesData: PrincipleItem[] = [
  {
    id: 1,
    title: 'Start with the problem',
    description: 'Understand the real need before deciding on a solution.',
    iconName: 'Target',
    actionableTakeaway: 'Resist jumping to conclusions or tools until the underlying user bottleneck and constraints are verified.'
  },
  {
    id: 2,
    title: 'Build to learn',
    description: 'Create practical versions quickly and improve them through feedback.',
    iconName: 'Hammer',
    actionableTakeaway: 'A functional prototype in the hands of real users beats weeks of speculative theorising.'
  },
  {
    id: 3,
    title: 'Keep the user at the centre',
    description: 'Make product and process decisions based on how people will actually use the solution.',
    iconName: 'Users',
    actionableTakeaway: 'Design for natural human behaviour, low friction, and clear affordances rather than idealised assumptions.'
  },
  {
    id: 4,
    title: 'Take ownership',
    description: 'Move ideas forward, coordinate people, and follow through until the outcome is achieved.',
    iconName: 'Compass',
    actionableTakeaway: 'Product management is about driving momentum, aligning contributors, and taking responsibility for the end result.'
  }
];
