import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CourtBookingPage } from './pages/CourtBookingPage';
import { SmallerProjectPage } from './pages/SmallerProjectPage';
import { BTCJourneyPage } from './pages/BTCJourneyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { smallerProjectsData } from './data/smallerProjectsData';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { LayoutManagerModal } from './components/LayoutManagerModal';
import { LiveEditToolbar } from './components/LiveEditToolbar';

function MainAppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const { smallerProjectsData: liveSmallerProjects } = useContent();

  // Handle browser back/forward buttons & URL hash sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current view
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
      case '':
        return <HomePage onNavigate={navigateTo} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case 'courtbooking':
      case 'court-booking':
        return <CourtBookingPage onNavigate={navigateTo} />;
      case 'cohort-learning':
        return (
          <SmallerProjectPage
            project={liveSmallerProjects['cohort-learning'] || smallerProjectsData['cohort-learning']}
            onNavigate={navigateTo}
            nextProjectSlug="recruitment-platform"
            nextProjectTitle="Student Recruitment Interest Platform"
          />
        );
      case 'recruitment-platform':
        return (
          <SmallerProjectPage
            project={liveSmallerProjects['recruitment-platform'] || smallerProjectsData['recruitment-platform']}
            onNavigate={navigateTo}
            nextProjectSlug="alarm-setter"
            nextProjectTitle="Automated Alarm Setter"
          />
        );
      case 'alarm-setter':
        return (
          <SmallerProjectPage
            project={liveSmallerProjects['alarm-setter'] || smallerProjectsData['alarm-setter']}
            onNavigate={navigateTo}
            nextProjectSlug="courtbooking"
            nextProjectTitle="CourtBooking Case Study"
          />
        );
      case 'btc-journey':
      case 'journey':
        return <BTCJourneyPage onNavigate={navigateTo} />;
      default:
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative" style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-primary)' }}>
      {/* Top Floating Navigation */}
      <Navigation currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full animate-in fade-in duration-300">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Live Content Editor Drawer / Modal */}
      <ContentEditorModal />

      {/* Block & Layout Manager Modal */}
      <LayoutManagerModal />

      {/* Floating Bottom Live Edit Toolbar */}
      <LiveEditToolbar />

      {/* Live Theme & Typography Studio Modal */}
      <ThemeCustomizerModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <MainAppContent />
      </ContentProvider>
    </ThemeProvider>
  );
}

