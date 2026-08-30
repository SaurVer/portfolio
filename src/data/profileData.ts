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
  roleTitle: 'Product Manager & AI Builder',
  tagline: 'Problem Solver · Hands-on Builder · Technology Leader',
  
  // Official Positioning Statement
  positioningStatement: 'I bring six years of experience across product and data roles at companies including Swiggy and Cricut, a US-based arts and crafts company. Over the years, I have developed a customer-centric approach to identifying pain points and building solutions that create meaningful impact. I believe strongly in technology-driven transformation, but also in the human ingenuity required to ask the right questions and identify the problems truly worth solving. Welcome to my portfolio!',
  
  // Professional photo (hosted on Cloudinary)
  photoUrl: 'https://res.cloudinary.com/dxhksw41y/image/upload/v1778430442/WhatsApp_Image_2026-04-29_at_3.58.01_PM_zijymq.jpg',
  photoAlt: 'Professional Portrait of Saurabh Verma',
  
  // External profile links
  linkedInUrl: 'https://www.linkedin.com', // Replace with your LinkedIn profile URL
  email: 'saurabhverma561@gmail.com', // User email
  location: 'Hyderabad / India',
  
  // About Me Section Data
  about: {
    intro: '',
    interests: [
      'Product Strategy & Development',
      'Search and Discovery',
      'AI Products',
      'Experimentation',
      'User Research',
      'Data Products',
      'Leadership'
    ],
    problemsEnjoyed: 'I enjoy solving complex, multi-layered problems where value can be unlocked at every level. Customer needs and business objectives may not always align, and I find it rewarding to identify the solution space where both can be addressed. I also enjoy thinking through edge cases and building thoughtful safeguards that make solutions more reliable and resilient.',
    productInterest: 'I am driven by hands-on execution: testing assumptions early, writing code or automations to validate solutions rapidly, and listening closely to user feedback to iterate with conviction.',
    aspiration: 'I am actively seeking opportunities in Product Management and Technical Project Management, where I can contribute to building and improving high-impact products. I am eager to apply and deepen my understanding of the principles behind creating exceptional products—solutions that address genuine customer pain points while driving sustainable business growth. I see Product Management as a field where my curiosity, structured thinking, and desire to build can translate into meaningful impact, long-term growth, and a deeply fulfilling career.'
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
    collegeName: 'BITS Pilani',
    logo: '/logos/bits-pilani-logo.png',
    logoAlt: 'BITS Pilani logo',
    qualification: 'Chemical Engineering & Finance Minor',
    period: '2015–19',
    location: 'Pilani, Rajasthan, India',
    institutionDescription: 'BITS Pilani is a leading Indian institute for technology and science, known for interdisciplinary education and its industry-linked Practice School programme.',
    description: 'Developed a strong foundation in analytical thinking and problem-solving. Completed a six-month Practice School at Deutsche Bank in Mumbai as a Ratings Analyst.'
  },
  {
    id: 'edu-2',
    collegeName: 'Indian School of Business (ISB)',
    logo: '/logos/isb-logo.jpg',
    logoAlt: 'Indian School of Business logo',
    qualification: 'MBA',
    period: '2026–27',
    location: 'Hyderabad, India',
    institutionDescription: 'The Indian School of Business is a globally recognised business school focused on developing leaders through rigorous, practice-oriented management education.',
    description: 'Building a broad understanding of diverse business domains, with a particular focus on technology and finance.'
  }
];

/**
 * PROFESSIONAL EXPERIENCE
 */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    companyName: 'Swiggy',
    logo: '/logos/swiggy-logo.png',
    logoAlt: 'Swiggy logo',
    role: '[ROLE AND DATES]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    companyDescription: 'Swiggy is an Indian consumer technology company operating food delivery, quick commerce, and other convenience-focused local services.',
    description: 'Led cross-functional initiatives, automated operational workflows, and solved operational bottlenecks with technology.',
    bullets: [
      'Identified workflow inefficiencies and designed practical software solutions to streamline user tasks.',
      'Collaborated closely with end users and stakeholders to translate complex requirements into clean deliverables.'
    ]
  },
  {
    id: 'exp-2',
    companyName: 'Cricut',
    logo: '/logos/cricut-logo.png',
    logoAlt: 'Cricut logo',
    role: '[ROLE AND DATES]',
    period: '[YEAR - YEAR]',
    location: '[LOCATION]',
    companyDescription: 'Cricut is a US-based creative technology company that offers connected cutting machines, design software, materials, and tools for makers.',
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
