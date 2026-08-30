export interface ProfileData {
  name: string;
  roleTitle: string;
  tagline: string;
  positioningStatement: string;
  photoUrl: string;
  photoAlt: string;
  linkedInUrl: string;
  email: string;
  location: string;
  about: {
    intro: string;
    interests: string[];
    problemsEnjoyed: string;
    productInterest: string;
    aspiration: string;
  };
  summaryNarrative: string;
}

export interface EducationItem {
  id: string;
  collegeName: string;
  logo: string;
  logoAlt: string;
  qualification: string;
  period: string;
  description?: string;
  location?: string;
}

export interface ExperienceItem {
  id: string;
  companyName: string;
  logo: string;
  logoAlt: string;
  role: string;
  period: string;
  description?: string;
  location?: string;
  bullets?: string[];
}

export interface PrincipleItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  actionableTakeaway?: string;
}

export interface BaseProject {
  id: string;
  slug: string;
  title: string;
  category: 'Featured Product Case Study' | 'Smaller Build & Experiment';
  categoryLabel: string;
  oneLiner: string;
  shortDescription: string;
  thumbnail: string;
  tags: string[];
  status?: string;
  appUrl?: string;
  isFeatured?: boolean;
}

export interface ScreenshotItem {
  id: string;
  imageUrl: string;
  screenTitle: string;
  shortDescription: string;
  productDecision: string;
  userProblemSolved: string;
  annotation?: string;
  aspectRatio?: 'mobile' | 'desktop' | 'tablet';
}

export interface UserFlowStep {
  stepNumber: number;
  title: string;
  description: string;
  action: string;
  userOutcome: string;
  iconName: string;
}

export interface FeatureBreakdown {
  feature: string;
  userProblem: string;
  designDecision: string;
  expectedBenefit: string;
}

export interface DesignDecision {
  decision: string;
  tradeOffConsidered: string;
  chosenSolution: string;
  rationale: string;
}

export interface IterationComparison {
  versionTitle: string;
  phase: 'v1.0 (Early)' | 'v2.0 (Current)';
  keyChanges: string[];
  learningsTriggered: string;
  visualNote: string;
}

export interface ArchitectureNode {
  layer: 'Client Layer' | 'Logic & Booking Engine' | 'Data & Integrations' | 'Notifications & Operations';
  title: string;
  components: string[];
  description: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  context: string;
  isPlaceholder?: boolean;
}

export interface CourtBookingCaseStudy extends BaseProject {
  myRole: string;
  institution: string;
  projectPeriod: string;
  toolsUsed: string[];
  heroScreenshot: string;
  narrative: {
    theProblem: {
      overview: string;
      painPoints: string[];
      whyWorthSolving: string;
    };
    usersAndContext: {
      targetAudience: string;
      contextOfUse: string;
      keyNeedsAndConstraints: string[];
    };
    productJourney: {
      milestones: {
        stage: string;
        title: string;
        description: string;
      }[];
    };
    userJourney: UserFlowStep[];
    screenshots: ScreenshotItem[];
    keyFeatures: FeatureBreakdown[];
    designDecisions: DesignDecision[];
    iterations: IterationComparison[];
    architecture: ArchitectureNode[];
    adoptionAndImpact: {
      metrics: ImpactMetric[];
      qualitativeImpact: string[];
      feedbackReceived: string[];
    };
    learningsAndNextSteps: {
      keyLearnings: string[];
      nextSteps: string[];
    };
  };
}

export interface SmallerProjectCaseStudy extends BaseProject {
  problem: string;
  whatIBuilt: string;
  howItWorked: string;
  myContribution: string;
  outcome: string;
  whatILearned: string;
  resourceStructure?: string[];
  workflowSteps?: {
    step: string;
    tool: string;
    detail: string;
  }[];
  metrics?: ImpactMetric[];
  screenshots?: {
    title: string;
    description: string;
    placeholderNote: string;
  }[];
}

export interface BTCJourneyData {
  title: string;
  role: string;
  organization: string;
  period: string;
  leadershipOverview: string;
  startingContext: string;
  goals: string[];
  majorInitiatives: {
    title: string;
    description: string;
    impact: string;
  }[];
  eventsAndActivities: {
    name: string;
    format: string;
    reach: string;
    takeaway: string;
  }[];
  stakeholderCoordination: {
    group: string;
    approach: string;
  }[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  outcomesAndImpact: {
    metricOrOutcome: string;
    detail: string;
  }[];
  leadershipLessons: string[];
}

export type SectionId = 'hero' | 'education' | 'experience' | 'principles' | 'featured' | 'summary';
export type SectionWidth = 'narrow' | 'standard' | 'wide' | 'full';
export type SectionPadding = 'compact' | 'standard' | 'spacious';

export interface BlockLayoutConfig {
  id: SectionId;
  title: string;
  order: number;
  visible: boolean;
  width: SectionWidth;
  padding: SectionPadding;
  columns?: number;
  variant?: string;
}
