import { BTCJourneyData } from '../types';

/**
 * ============================================================================
 * BUSINESS TECHNOLOGY CLUB (BTC) LEADERSHIP JOURNEY
 * ============================================================================
 * Structured leadership narrative capturing presidency, initiatives,
 * stakeholder alignment, and product/operational learnings.
 */

export const btcJourneyData: BTCJourneyData = {
  title: 'My Journey as President of the Business Technology Club',
  role: 'President',
  organization: 'Business Technology Club (BTC)',
  period: '[TENURE DATES]', // e.g. 2024 - 2025
  
  leadershipOverview: 'As President of the Business Technology Club, I spearheaded strategic initiatives at the intersection of product management, emerging technologies, and business strategy. My mission was to transform the club from a passive speaker series into an active builder launchpad—fostering hands-on product prototyping, industry mentorship, and cohort-wide digital literacy.',

  startingContext: 'When I took office, student interest in technology and AI was surging, but opportunities to gain real, practical product and engineering experience on campus remained fragmented. Students often felt intimidated by technical barriers or unsure how to pivot into modern technology roles.',

  goals: [
    'Demystify product and tech careers for students from non-traditional and non-engineering backgrounds.',
    'Shift club activities toward hands-on product builds, hackathons, and real-world case simulations.',
    'Build enduring industry partnerships with leading technology firms and startup founders for mentorship.',
    'Establish a collaborative, high-velocity club leadership team with clear ownership and measurable OKRs.'
  ],

  majorInitiatives: [
    {
      title: 'Builder Incubator & Rapid Prototyping Sprints',
      description: 'Launched structured 48-hour sprint weekends where cross-functional student teams built working web prototypes and AI-assisted tools from scratch.',
      impact: 'Resulted in [ADD METRIC] working software prototypes and empowered non-technical members to ship real products.'
    },
    {
      title: 'Product Management Masterclasses & Teardowns',
      description: 'Designed interactive product breakdown workshops analysing real-world trade-offs in apps like Uber, Spotify, and Stripe.',
      impact: 'Equipped [ADD METRIC] students with practical frameworks for PRD writing, user discovery, and metrics definition.'
    },
    {
      title: 'Industry Speaker & Fireside Series',
      description: 'Curated intimate ask-me-anything sessions with VP/Director-level Product Leaders and tech entrepreneurs.',
      impact: 'Connected cohort directly with hiring managers and provided candid insights into product decision-making.'
    },
    {
      title: 'Campus Digital Operations Modernisation',
      description: 'Leveraged club talent to build internal utility tools for campus student bodies, including recruitment and event systems.',
      impact: 'Directly bridged student club talent with tangible campus operational impact.'
    }
  ],

  eventsAndActivities: [
    {
      name: 'Flagship Tech & Product Conclave',
      format: 'Annual full-day conference with keynote panels, product debate showcases, and networking.',
      reach: '[ADD METRIC: e.g. 350+ Attendees]',
      takeaway: 'Demonstrated high-stakes event coordination, budget governance, and guest executive hospitality.'
    },
    {
      name: 'AI in Action Hackathon',
      format: 'Weekend builder marathon focused on solving campus and enterprise workflow challenges with LLMs.',
      reach: '[ADD METRIC: e.g. 24 Teams, 80+ Builders]',
      takeaway: 'Validated that short iteration cycles and clear problem constraints unlock exceptional student creativity.'
    },
    {
      name: 'Peer-to-Peer Tech Clinics',
      format: 'Weekly drop-in sessions where student mentors taught SQL, APIs, Figma, and prompt engineering.',
      reach: 'Weekly recurring cohort participation',
      takeaway: 'Fostered a psychologically safe, accessible learning environment for all skill levels.'
    }
  ],

  stakeholderCoordination: [
    {
      group: 'Core Leadership Team (6 Vice Presidents)',
      approach: 'Weekly agile syncs, async Notion dashboards, and distributed ownership across verticals (Events, Marketing, Corporate Relations, Content).'
    },
    {
      group: 'Academic Administration & Deans',
      approach: 'Formal quarterly briefing decks, transparent budget reconciliations, and alignment with campus institutional priorities.'
    },
    {
      group: 'Corporate Partners & Alumni Mentors',
      approach: 'Tailored partnership proposals, dedicated host liaisons, and continuous post-event engagement channels.'
    },
    {
      group: 'General Student Body',
      approach: 'Transparent feedback loops, anonymous AMA surveys, and community-driven event topic voting.'
    }
  ],

  challenges: [
    {
      challenge: 'Balancing diverse skill levels across an interdisciplinary student cohort.',
      solution: 'Segmented workshops into foundational tracks and advanced tracks, pairing technical builders with strategic thinkers for group projects.'
    },
    {
      challenge: 'Managing demanding event timelines amidst high-intensity academic exam schedules.',
      solution: 'Implemented asynchronous documentation, modular delegation protocols, and strict buffer buffers for all milestone deliverables.'
    }
  ],

  outcomesAndImpact: [
    {
      metricOrOutcome: 'Cohort Engagement & Reach',
      detail: '[ADD METRIC: e.g. 500+ active participants across the academic year with 92% positive rating]'
    },
    {
      metricOrOutcome: 'Working Prototypes Shipped',
      detail: '[ADD METRIC: e.g. 15+ student-built products, automations, and case teardowns published]'
    },
    {
      metricOrOutcome: 'Alumni & Sponsor Network',
      detail: '[ADD METRIC: e.g. 20+ senior industry leaders engaged as mentors and panellists]'
    }
  ],

  leadershipLessons: [
    'Leadership is about enabling others: The best leaders do not do all the work—they create high-clarity systems that empower team members to take bold ownership.',
    'Product thinking applies to organizations: Treat the club as a product—listen continuously to student feedback, measure engagement funnel drop-offs, and iterate relentlessly.',
    'Over-communicate context, not tasks: When team members understand the underlying "why" and strategic vision, they execute with creativity and autonomy.',
    'Empathy drives high-performance culture: Acknowledging peer workload and creating a supportive, celebratory team environment produces superior results.'
  ]
};
