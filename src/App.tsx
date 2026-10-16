/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PageId, ServiceOption, VisualStudy } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { ShowreelModal } from './components/ShowreelModal';
import { StudioCursor } from './components/StudioCursor';
import { LoadingScreen } from './components/LoadingScreen';

import { HomePage } from './pages/HomePage';
import { FilmPage } from './pages/FilmPage';
import { CreativePage } from './pages/CreativePage';
import { AiPage } from './pages/AiPage';
import { CraftPage } from './pages/CraftPage';
import { ContentPage } from './pages/ContentPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedContactService, setSelectedContactService] = useState<ServiceOption | undefined>();
  const [activeLightboxStudy, setActiveLightboxStudy] = useState<VisualStudy | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  // Sync with URL hash / search params on initial mount
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'film', 'creative', 'ai', 'craft', 'content', 'about', 'contact'];
      
      if (hash === 'work') {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    return () => window.removeEventListener('hashchange', handleUrlChange);
  }, []);

  const handleNavigate = (page: PageId, extraOrHash?: string) => {
    if (page === 'contact' && extraOrHash) {
      setSelectedContactService(extraOrHash as ServiceOption);
    }

    setCurrentPage(page);

    if (page === 'home' && extraOrHash === 'work') {
      window.location.hash = 'work';
      setTimeout(() => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.location.hash = page === 'home' ? '' : page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDiscussStudy = (category: string) => {
    const serviceMap: { [key: string]: ServiceOption } = {
      Film: 'Film',
      Atmosphere: 'Film',
      'Sci-Fi Worldbuilding': 'Film',
      Creative: 'Creative',
      'Material & Print': 'Creative',
      'Brand Systems': 'Creative',
      'Generative Architecture': 'AI',
      'Atmospheric Environments': 'AI',
      Portraiture: 'Content',
      'Urban Environment': 'Content',
      'On Set': 'Film',
      'Product Macro': 'Content',
    };

    const targetService = serviceMap[category] || 'Not sure yet';
    handleNavigate('contact', targetService);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-white selection:bg-[#1FCD6E] selection:text-[#0D0D0D]">
      {/* Cinematic loading screen — wipes upward at 100% */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} minDuration={2400} />
      )}

      {/* Studio Magnetic Cursor for Desktop */}
      <StudioCursor />

      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenLightbox={(study) => setActiveLightboxStudy(study)}
            onOpenShowreel={() => setIsShowreelOpen(true)}
          />
        )}

        {currentPage === 'film' && (
          <FilmPage
            onNavigate={handleNavigate}
            onOpenLightbox={(study) => setActiveLightboxStudy(study)}
            onOpenShowreel={() => setIsShowreelOpen(true)}
          />
        )}

        {currentPage === 'creative' && (
          <CreativePage
            onNavigate={handleNavigate}
            onOpenLightbox={(study) => setActiveLightboxStudy(study)}
          />
        )}

        {currentPage === 'ai' && (
          <AiPage
            onNavigate={handleNavigate}
            onOpenLightbox={(study) => setActiveLightboxStudy(study)}
          />
        )}

        {currentPage === 'craft' && (
          <CraftPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'content' && (
          <ContentPage
            onNavigate={handleNavigate}
            onOpenLightbox={(study) => setActiveLightboxStudy(study)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialService={selectedContactService}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Visual Study Lightbox Modal */}
      <LightboxModal
        study={activeLightboxStudy}
        onClose={() => setActiveLightboxStudy(null)}
        onDiscussStudy={handleDiscussStudy}
      />

      {/* Showreel Cinema Player Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
}
