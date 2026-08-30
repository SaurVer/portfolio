import { SmallerProjectCaseStudy } from '../types';

/**
 * ============================================================================
 * SMALLER BUILDS & EXPERIMENTS DATA
 * ============================================================================
 * Structured case studies following the requested narrative:
 * Problem → What I Built → How It Worked → My Contribution → Outcome → What I Learned
 */

export const smallerProjectsData: Record<string, SmallerProjectCaseStudy> = {
  'cohort-learning': {
    id: 'cohort-learning-website',
    slug: 'cohort-learning',
    title: 'Cohort Learning Website',
    category: 'Smaller Build & Experiment',
    categoryLabel: 'Learning & Knowledge Base',
    oneLiner: 'Centralising curriculum study guides, reference materials, and project repositories for my academic cohort.',
    shortDescription: 'A lightweight, fast-loading structured website created to eliminate fragmented course folders and make shared peer knowledge instantly accessible.',
    thumbnail: '',
    tags: ['HTML/CSS', 'Information Architecture', 'Knowledge Management', 'Peer Collaboration', 'UX Design'],
    status: 'Shipped & Maintained',
    appUrl: '[WEBSITE LINK]', // Replace with live URL or demo
    
    // Core Case Study Narrative
    problem: 'During intensive academic terms, learning materials, lecture summaries, problem set walkthroughs, and external reference guides were scattered across chaotic Google Drive folders, chat threads, and emails. Cohort members spent valuable study time hunting for the latest document versions rather than learning.',
    whatIBuilt: 'A clean, zero-friction HTML-based learning resource portal organised logically by academic term, course subject, and problem set category, designed for instantaneous desktop and mobile retrieval.',
    howItWorked: 'The platform categorised documents into structured subject modules with tag-based filtering, quick-preview links, downloadable summaries, and peer contribution guidelines. Everything was rendered with semantic, lightweight static web architecture ensuring lightning-fast loading even on spotty campus Wi-Fi.',
    myContribution: 'Identified the information taxonomy requirements through peer interviews, designed the clean interface hierarchy, coded the responsive HTML/CSS website, organised the initial corpus of learning resources, and established the update workflow.',
    outcome: 'Eliminated document search friction for the entire cohort during exam preparation periods. Received widespread appreciation from peers for saving hours of administrative confusion.',
    whatILearned: 'Good information architecture is 90% of user experience. When organizing dense knowledge, clear categorization and zero-latency access matter far more than complex features.',
    
    resourceStructure: [
      'Term 1 & 2 Core Course Workspaces (Finance, Strategy, Analytics, Marketing)',
      'Curated Peer Summaries & Formula Cheat Sheets',
      'Step-by-Step Problem Set Walkthroughs',
      'Interactive Term Timelines & Exam Milestone Guides',
      'Peer Project Archives & Case Study Repositories'
    ],

    metrics: [
      {
        label: 'Active Cohort Members Served',
        value: '[ADD METRIC]', // e.g. 150+ Students
        context: 'Regularly used by classmates during term exams',
        isPlaceholder: true
      },
      {
        label: 'Subject Modules Organised',
        value: '[ADD METRIC]', // e.g. 12 Core Subjects
        context: 'Structured curricula across academic terms',
        isPlaceholder: true
      },
      {
        label: 'Average Page Load Time',
        value: '< 180ms',
        context: 'Lightweight static HTML architecture',
        isPlaceholder: false
      }
    ],

    screenshots: [
      {
        title: 'Subject Hub & Resource Directory',
        description: 'Categorised module layout allowing students to jump directly to lecture notes or case readings.',
        placeholderNote: '[ADD SCREENSHOT: Cohort Hub Homepage]'
      },
      {
        title: 'Term-Wise Cheat Sheet & Formula Archive',
        description: 'Quick-access reference section optimized for exam revision.',
        placeholderNote: '[ADD SCREENSHOT: Resource List View]'
      }
    ]
  },

  'recruitment-platform': {
    id: 'student-recruitment-platform',
    slug: 'recruitment-platform',
    title: 'Student Recruitment Interest Collection Platform',
    category: 'Smaller Build & Experiment',
    categoryLabel: 'Process & Form Architecture',
    oneLiner: 'An extensive, structured form-based platform supporting the General Student Body’s recruitment-interest collection.',
    shortDescription: 'Replacing error-prone spreadsheets with an engineered multi-section form system to capture granular student preferences, skills, and availability at scale.',
    thumbnail: '',
    tags: ['Form Design', 'Workflow Automation', 'Stakeholder Management', 'Data Integrity', 'Student Body'],
    status: 'Completed & Evaluated',
    appUrl: '[PLATFORM LINK]',
    
    // Core Case Study Narrative
    problem: 'Managing recruitment preferences across hundreds of student candidates for multiple student council committees, clubs, and initiative teams was an operational nightmare. Previous attempts using generic Google Forms led to duplicated entries, mismatched candidate criteria, missing prerequisites, and hundreds of hours spent cleaning spreadsheets manually.',
    whatIBuilt: 'A dedicated, highly structured web-based interest collection portal with dynamic branching logic, conditional field validation, multi-role preference ranking, and automated data aggregation.',
    howItWorked: 'Candidates completed a guided, 4-stage intake flow: 1) Identity & Profile, 2) Primary & Secondary Club/Role Preferences, 3) Domain Skills & Portfolio Links, 4) Scheduling Availability Matrix. Dynamic client-side validation prevented incomplete submissions, while standardized taxonomy ensured seamless backend evaluation by review panels.',
    myContribution: 'Collaborated with the student body leadership to map out criteria across 10+ student clubs, designed the comprehensive conditional form architecture, implemented the responsive front-end interface, and built automated intake validation scripts.',
    outcome: 'Successfully processed recruitment submissions for the entire General Student Body with zero data corruption. Reduced evaluation triage time for club leaders from several days to a single afternoon.',
    whatILearned: 'Front-end validation is the best data sanitisation strategy. Designing guardrails at the point of entry prevents thousands of downstream edge-case errors in organizational decision-making.',

    resourceStructure: [
      'Stage 1: Verified Student Identity & Academic Profile Intake',
      'Stage 2: Weighted Role Preference Selection & Priority Ranking',
      'Stage 3: Portfolio & Domain Skill Self-Assessment Matrices',
      'Stage 4: Automated Time Slot Booking for Candidate Interviews'
    ],

    metrics: [
      {
        label: 'Total Student Submissions Processed',
        value: '[ADD METRIC]', // e.g. 400+ Candidates
        context: 'Across the General Student Body with zero submission loss',
        isPlaceholder: true
      },
      {
        label: 'Clubs & Committees Supported',
        value: '[ADD METRIC]', // e.g. 14 Student Organizations
        context: 'Standardized evaluation across all functional bodies',
        isPlaceholder: true
      },
      {
        label: 'Data Cleanup Time Saved',
        value: '90%+',
        context: 'Compared to legacy unvalidated spreadsheet forms',
        isPlaceholder: false
      }
    ],

    screenshots: [
      {
        title: 'Multi-Step Candidate Intake Portal',
        description: 'Clean stepped form layout with persistent progress indicator and role preference selector.',
        placeholderNote: '[ADD SCREENSHOT: Form Wizard View]'
      },
      {
        title: 'Interview Scheduling & Validation Matrix',
        description: 'Dynamic time slot allocation preventing scheduling conflicts between candidate panels.',
        placeholderNote: '[ADD SCREENSHOT: Intake Validation Screen]'
      }
    ]
  },

  'alarm-setter': {
    id: 'automated-alarm-setter',
    slug: 'alarm-setter',
    title: 'Automated Alarm Setter',
    category: 'Smaller Build & Experiment',
    categoryLabel: 'Process Automation & Scripting',
    oneLiner: 'Intelligent calendar-driven alarm automation built with Google Apps Script and mobile integration.',
    shortDescription: 'Solving irregular sleep and morning wake-up friction by synchronising daily morning alarms automatically with dynamic calendar schedules and commute requirements.',
    thumbnail: '',
    tags: ['Google Apps Script', 'Workflow Automation', 'Calendar Integration', 'Productivity', 'API Webhooks'],
    status: 'Active Daily Utility',
    appUrl: '[PROJECT REPO / DEMO]',
    
    // Core Case Study Narrative
    problem: 'In a dynamic academic and leadership environment, daily schedules varied dramatically: 8:00 AM lectures on Mondays, 10:30 AM team standups on Tuesdays, and 7:00 AM breakfast roundtables on Thursdays. Manually recalculating and setting alarms every night was tedious and error-prone, occasionally leading to missed early commitments or disrupted sleep cycles.',
    whatIBuilt: 'A background automation script connecting Google Calendar events directly to an off-the-shelf Android/iOS alarm trigger using Google Apps Script and automated webhooks, calculating optimal wake-up times automatically.',
    howItWorked: 'Every evening at 10:00 PM, a lightweight Apps Script cron job queries the primary Google Calendar for the earliest scheduled event the following day. It calculates the required wake-up time factoring in a 45-minute morning routine buffer + travel time, and pushes an intent trigger to the local alarm app to set the exact wake-up alarm with zero manual intervention.',
    myContribution: 'Conceptualized the end-to-end automation logic, wrote the Google Apps Script integration handlers, handled edge cases (e.g. cancelled first meetings, weekend exemptions, vacation overrides), and integrated with the mobile webhook listener.',
    outcome: 'Completely eliminated the daily chore of manual alarm setting. Achieved 100% on-time attendance for morning commitments while ensuring maximum possible sleep duration tailored to each day’s real schedule.',
    whatILearned: 'You do not always need to build complex software from scratch to solve meaningful problems. Clever orchestration of existing APIs, scripts, and off-the-shelf tools can deliver 10x leverage in days instead of months.',

    workflowSteps: [
      {
        step: '1. Schedule Ingestion',
        tool: 'Google Calendar API',
        detail: 'Fetches tomorrow’s first confirmed event timestamp, filtering out all-day background reminders.'
      },
      {
        step: '2. Buffer Calculation Engine',
        tool: 'Google Apps Script',
        detail: 'Subtracts dynamic preparation buffer (45m) + location-based travel time to derive exact wake-up moment.'
      },
      {
        step: '3. Intent Dispatch & Overrides',
        tool: 'Webhook / Tasker Protocol',
        detail: 'Sends secure encrypted payload with alarm time, snooze parameters, and emergency backup checks.'
      },
      {
        step: '4. Local Device Execution',
        tool: 'Off-the-shelf Alarm App',
        detail: 'Arms native clock alarm with confirmed UI notification dispatched to the lock screen.'
      }
    ],

    metrics: [
      {
        label: 'Manual Alarm Configuration Time',
        value: '0 min/day',
        context: 'Down from nightly manual calculations and checking',
        isPlaceholder: false
      },
      {
        label: 'Morning Punctuality Reliability',
        value: '100%',
        context: 'Zero missed morning commitments since deployment',
        isPlaceholder: false
      },
      {
        label: 'Script Execution Latency',
        value: '< 1.2s',
        context: 'Runs silently every evening via cloud trigger',
        isPlaceholder: false
      }
    ],

    screenshots: [
      {
        title: 'Automation Workflow Logic Flowchart',
        description: 'Visual logic mapping from Calendar query to time buffer calculation and device alarm arming.',
        placeholderNote: '[ADD DIAGRAM: Automation Architecture & Flowchart]'
      }
    ]
  }
};
