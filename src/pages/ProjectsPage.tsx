import React, { useState } from 'react';
import { featuredProjects, smallerProjects, allProjects } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'experiments'>('all');

  const handleCardClick = (slug: string) => {
    onNavigate(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-mono font-bold shadow-xs" style={{ color: 'var(--accent-main)' }}>
          <span>Product Case Studies & Builds</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-syne text-stone-900 leading-tight">
          My Projects
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          A showcase of products, operational systems, and practical automations I have designed and built to eliminate friction and solve real-world problems.
        </p>

        {/* Filter Pills without icons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'text-white font-bold shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-xs'
            }`}
            style={activeFilter === 'all' ? { backgroundColor: 'var(--accent-main)' } : {}}
          >
            All Work ({allProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'featured'
                ? 'text-white font-bold shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-xs'
            }`}
            style={activeFilter === 'featured' ? { backgroundColor: 'var(--accent-main)' } : {}}
          >
            Featured Case Studies ({featuredProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('experiments')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'experiments'
                ? 'text-white font-bold shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-xs'
            }`}
            style={activeFilter === 'experiments' ? { backgroundColor: 'var(--accent-main)' } : {}}
          >
            Smaller Builds & Experiments ({smallerProjects.length})
          </button>
        </div>
      </div>

      {/* Group 1: Featured Product Case Studies */}
      {(activeFilter === 'all' || activeFilter === 'featured') && (
        <section className="space-y-6">
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl sm:text-2xl font-bold font-syne text-stone-900">
              Featured Product Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Group 2: Smaller Builds & Experiments */}
      {(activeFilter === 'all' || activeFilter === 'experiments') && (
        <section className="space-y-6">
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl sm:text-2xl font-bold font-syne text-stone-900">
              Smaller Builds and Experiments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallerProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleCardClick(project.slug)}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
