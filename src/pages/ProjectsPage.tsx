import React, { useEffect, useState } from 'react';
import {
  AlarmClock,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  LucideIcon,
} from 'lucide-react';
import { EditableText } from '../components/EditableText';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

interface ProjectOverview {
  id: string;
  title: string;
  type: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  appUrl?: string;
  imageStyle?: string;
  gallery?: string[];
  why: string;
  how: string;
  impact: string;
}

type StoryField = 'why' | 'how' | 'impact';

const PROJECT_STORIES_STORAGE_KEY = 'portfolio_project_stories_v1';

const projects: ProjectOverview[] = [
  {
    id: 'courtbooking',
    title: 'CourtBooking App',
    type: 'Working product',
    icon: CalendarDays,
    image: '/projects/courtbooking.png',
    imageAlt: 'CourtBooking application court selection screen',
    appUrl: 'https://courtbook-frontend-three.vercel.app/',
    imageStyle: 'object-contain',
    gallery: [
      'https://res.cloudinary.com/dxhksw41y/image/upload/v1788095205/find_slot_xjzi3i.png',
      'https://res.cloudinary.com/dxhksw41y/image/upload/v1788095202/booking_confirmed_lmqgub.png',
      'https://res.cloudinary.com/dxhksw41y/image/upload/v1788095200/abandon_play_pi62gr.png',
      'https://res.cloudinary.com/dxhksw41y/image/upload/v1788095203/see_who_is_playing_duiugh.png',
    ],
    why: 'Over 400 PGP students struggled with limited visibility into court availability—whether a court was free or how long it would remain occupied. Walking all the way from the Quad with this uncertainty was a recurring pain point that needed to be solved.',
    how: `Created the initial PRD outlining the core app functionality
Refined the PRD using GPT and converted it into a build prompt for Claude
Deployed the MVP
Added key features including:
    Sign-up and login
    Booking cancellation and modification
    GPS-based attendance verification
    Complaint raising
Identified and fixed bugs through iterative testing
Released the app for users
Drove initial sign-ups and adoption
Pitched the solution to ISB Operations
Conducted live trials and gathered feedback`,
    impact: `Got adoption from more than 150 students and conducted pilot trials.
Presented the app to the Operations head and further negotiations going on to adopt the app for everyone.`,
  },
  {
    id: 'product-management-learning',
    title: 'Product Management Learning Page',
    type: 'Learning resource',
    icon: BookOpenCheck,
    image: '/projects/product-management-learning.png',
    imageAlt: 'Product Management learning workflow page',
    appUrl: 'https://full-product-roadmap-saurabh-isb.netlify.app/',
    imageStyle: 'object-cover object-top',
    why: 'Many students showed interest in knowing more about Product Management and wanted a one stop resource for that. As an active member in the Product Management community, I identified a gap and cerated an extensive resource to help the cohort',
    how: `Drew upon my existing Product Management knowledge and experience to define the core content and curriculum.
Conducted additional research and curated relevant videos and articles for each topic to deepen understanding.
Structured the learning journey into L1, L2 and L3 levels through a clear workflow.
Designed an intuitive UI to make the content easy to navigate and consume.
Used AI to bring design to life and created a website to share with cohort`,
    impact: 'More than 150 students referred the resource to build solid understanding about Product Management',
  },
  {
    id: 'interest-collection',
    title: 'Interest Collection App',
    type: 'Process tool',
    icon: ClipboardList,
    image: '/projects/interest-collection.png',
    imageAlt: 'ISB club recruitment interest collection application',
    appUrl: 'https://interestform-for-clubs-isb.vercel.app/',
    imageStyle: 'object-cover object-top',
    why: `A crisis emerged when the interest-capture exercise for selecting student bodies for the 2026–27 cohort failed unexpectedly. By then, I had built a reputation as a problem-solver and builder, and the GSB President reached out to me to create a reliable platform.
The challenge was particularly complex because the selection logic involved multiple conditional rules—for example, a student could not rank a Professional Club below a General Student Body, along with several other priority-based constraints.
With the process under immediate time pressure, I stepped up to build and deploy a working platform in just 6 hours.`,
    how: `Leveraging my experience with AI-assisted development and deploying products to production, I built a robust platform to showcase 100+ open positions and capture student interest.
I focused on ensuring that the platform:
Looked **professional and trustworthy**
Was **simple to navigate**
Followed **intuitive design principles**
Made it easy for students to discover roles and submit their preferences`,
    impact: 'Facilitated selection for 100+ positions across 40 General Student Body councils, Professional Clubs, and Social Clubs.',
  },
  {
    id: 'automatic-alarm',
    title: 'Automatic Alarm Setup',
    type: 'Personal automation',
    icon: AlarmClock,
    image: '/projects/automatic-alarm.png',
    imageAlt: 'Automatically created alarms displayed in a mobile alarm application',
    imageStyle: 'object-contain',
    why: `At ISB, missing a class can mean losing an entire grade step—from **A to A- or B to B-**. With classes starting as early as 8 AM and late-night study schedules being common, oversleeping is a very real risk.
Students needed a more reliable way to wake up on time without depending on manually setting alarms every night. I built an **automatic alarm system** that reads calendar events and sets alarms accordingly.
The system removes the need to set alarms manually and also accounts for context; for example, ensuring an alarm does not ring while the student is already in class or does not ring on weekends because sleep is precious. You don't want to disrupt sleep without a good reason.`,
    how: `This was a deceptively complex challenge with three key constraints:
ISB academic events lived in Outlook, which could not directly feed the alarm app, so I first synced Outlook with Google Calendar.
The alarm had to trigger only for the first class of the day, not every class, to avoid disruption once the student was already awake and attending sessions.
Only academic classes should trigger alarms, not low-priority calendar events. My principle was simple: disturb sleep only when the stakes are high.
To solve this, I created a separate Google Calendar containing only the first academic class of each day. A Google Apps Script ran daily to identify and update that event automatically.
The alarm app was connected only to this filtered calendar, creating a fully automated flow from Outlook schedule → filtered first-class calendar → alarm.`,
    impact: `This project strengthened my reputation as a true problem solver. What initially looked like a simple automation turned out to involve several technical and logical bottlenecks.
At one point, even the AI tools I was using concluded that filtering the calendar in this way and setting alarms automatically was not feasible. Instead of stopping there, I kept rethinking the architecture, testing alternatives, and working around the constraints.
After a full day of experimentation and iteration, I built a robust, fully automated system that I could genuinely rely on every day.`,
  },
];

const StoryEditor: React.FC<{
  label: string;
  value: string;
  onSave: (value: string) => void;
}> = ({ label, value, onSave }) => (
  <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50/70 p-3.5">
    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">{label}</p>
    <EditableText
      as="p"
      value={value}
      onSave={onSave}
      multiline
      bulletList
      placeholder={`Add ${label.toLowerCase()} details`}
      labelHint={`${label} section`}
      className="mt-2 block text-[11px] leading-relaxed text-stone-500"
    />
  </div>
);

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const [projectCards, setProjectCards] = useState<ProjectOverview[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECT_STORIES_STORAGE_KEY);
      if (!saved) return projects;
      const savedStories = JSON.parse(saved) as Record<string, Partial<Record<StoryField, string>>>;
      return projects.map((project) => ({ ...project, ...savedStories[project.id] }));
    } catch {
      return projects;
    }
  });

  useEffect(() => {
    const storyData = Object.fromEntries(
      projectCards.map(({ id, why, how, impact }) => [id, { why, how, impact }]),
    );
    localStorage.setItem(PROJECT_STORIES_STORAGE_KEY, JSON.stringify(storyData));
  }, [projectCards]);

  const updateStory = (projectId: string, field: StoryField, value: string) => {
    setProjectCards((current) =>
      current.map((project) => (project.id === projectId ? { ...project, [field]: value } : project)),
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] shadow-sm"
          style={{ color: 'var(--accent-main)' }}
        >
          Selected builds
        </div>
        <h1 className="mt-4 font-syne text-4xl font-bold leading-tight text-stone-950 sm:text-6xl">
          Products built around real problems.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          A compact collection of applications, learning tools, and automations I have built to reduce friction and make everyday processes work better.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Project collection">
        {projectCards.map((project, index) => {
          const Icon = project.icon;
          return (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50"
                    style={{ color: 'var(--accent-main)' }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-syne text-base font-bold text-stone-950 sm:text-lg">{project.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                      {project.type}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-stone-300">0{index + 1}</span>
              </div>

              <div className="relative h-56 overflow-hidden bg-stone-100 sm:h-64">
                {project.gallery ? (
                  <div className="grid h-full grid-cols-4 gap-1 bg-stone-200 p-1">
                    {project.gallery.map((image, imageIndex) => (
                      <div key={image} className="overflow-hidden bg-white">
                        <img
                          src={image}
                          alt={`${project.title} screen ${imageIndex + 1}`}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${project.imageStyle || 'object-cover'}`}
                  />
                )}
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-stone-500">Open the working experience</p>
                  {project.appUrl ? (
                    <a
                      href={project.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold hover:underline"
                      style={{ color: 'var(--accent-main)' }}
                    >
                      Visit app
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-stone-400">
                      Link to be added
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 border-t border-stone-100 pt-4">
                  <StoryEditor label="Why" value={project.why} onSave={(value) => updateStory(project.id, 'why', value)} />
                  <StoryEditor label="How" value={project.how} onSave={(value) => updateStory(project.id, 'how', value)} />
                  <StoryEditor label="Impact" value={project.impact} onSave={(value) => updateStory(project.id, 'impact', value)} />
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};
