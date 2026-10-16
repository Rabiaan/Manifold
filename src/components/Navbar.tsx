import React, { useState, useEffect, useRef } from 'react';
import { ManifoldLogo } from './ManifoldLogo';
import { PageId } from '../types';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const servicePages: { id: PageId; label: string; desc: string }[] = [
    { id: 'film', label: 'Film', desc: 'Commercials, music videos & narrative' },
    { id: 'creative', label: 'Creative', desc: 'Brand identities, campaigns & art direction' },
    { id: 'ai', label: 'AI', desc: 'AI commercials, visual content & hybrid' },
    { id: 'craft', label: 'Craft', desc: 'Editing, colour, motion & finishing' },
    { id: 'content', label: 'Content', desc: 'Commercial photography & social content' },
  ];

  const handleNavClick = (page: PageId, hash?: string) => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  const isCurrentService = ['film', 'creative', 'ai', 'craft', 'content'].includes(currentPage);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2B2B2B] transition-colors shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[72px] h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand mark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-sm py-1 cursor-pointer"
            aria-label="Manifold Home"
          >
            <ManifoldLogo size="lg" theme="dark" />
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight text-white">
            <button
              onClick={() => handleNavClick('home', 'work')}
              className="text-white hover:text-[#1FCD6E] transition-colors cursor-pointer py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-sm"
            >
              Work
            </button>

            {/* Services Menu with Accessible Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1.5 py-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-sm font-medium ${
                  isCurrentService || isServicesOpen ? 'text-[#1FCD6E]' : 'text-white hover:text-[#1FCD6E]'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180 text-[#1FCD6E]' : 'text-neutral-400'
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-[#141414] border border-[#2B2B2B] rounded-xl shadow-2xl p-2 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#1FCD6E] font-bold">
                    Specialist Studios
                  </div>
                  {servicePages.map((service) => {
                    const isActive = currentPage === service.id;
                    return (
                      <button
                        key={service.id}
                        role="menuitem"
                        onClick={() => handleNavClick(service.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex flex-col group cursor-pointer ${
                          isActive
                            ? 'bg-[#1FCD6E]/15 text-[#1FCD6E]'
                            : 'hover:bg-white/5 text-neutral-200 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm font-headline group-hover:text-[#1FCD6E] transition-colors">
                            {service.label}
                          </span>
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#1FCD6E]"
                          />
                        </div>
                        <span className="text-xs text-neutral-400 mt-0.5 font-normal group-hover:text-neutral-300">
                          {service.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-sm ${
                currentPage === 'about' ? 'text-[#1FCD6E] font-semibold' : 'text-white hover:text-[#1FCD6E]'
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Start a project ->) & Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1FCD6E] hover:bg-[#1bb863] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wide rounded-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] shadow-sm hover:shadow"
            >
              <span>Start a project</span>
              <span aria-hidden="true">&rarr;</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 text-white hover:text-[#1FCD6E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FCD6E] rounded-md cursor-pointer transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — outside <header> so backdrop-blur cannot trap the fixed positioning */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0D0D0D] border-t border-[#2B2B2B] z-50 flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-6 pt-2">
            <div>
              <p className="font-mono text-xs text-[#1FCD6E] uppercase tracking-wider mb-3 font-bold">
                Navigation
              </p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`text-left text-2xl font-headline font-bold cursor-pointer transition-colors ${
                    currentPage === 'home' ? 'text-[#1FCD6E]' : 'text-white hover:text-[#1FCD6E]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('home', 'work')}
                  className="text-left text-2xl font-headline font-bold text-white hover:text-[#1FCD6E] cursor-pointer transition-colors"
                >
                  Work
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`text-left text-2xl font-headline font-bold cursor-pointer transition-colors ${
                    currentPage === 'about' ? 'text-[#1FCD6E]' : 'text-white hover:text-[#1FCD6E]'
                  }`}
                >
                  About
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2B2B2B]">
              <p className="font-mono text-xs text-[#1FCD6E] uppercase tracking-wider mb-3 font-bold">
                Specialist Services
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {servicePages.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNavClick(s.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left cursor-pointer transition-colors group ${
                      currentPage === s.id
                        ? 'border-[#1FCD6E] bg-[#1FCD6E]/15 text-[#1FCD6E]'
                        : 'border-[#2B2B2B] bg-[#141414] text-white hover:border-[#1FCD6E]/50'
                    }`}
                  >
                    <div>
                      <span className="font-headline font-bold text-base block text-white group-hover:text-[#1FCD6E] transition-colors">
                        {s.label}
                      </span>
                      <span className="text-xs text-neutral-400 font-sans block">
                        {s.desc}
                      </span>
                    </div>
                    <ArrowUpRight size={16} className="text-[#1FCD6E]" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2B2B2B]">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1FCD6E] text-[#0D0D0D] font-headline font-bold text-sm capitalize tracking-wide rounded-md cursor-pointer hover:bg-[#1bb863] transition-colors"
            >
              <span>Start a project</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <p className="text-center font-mono text-xs text-neutral-400 mt-3">
              @manifoldmotionpictures
            </p>
          </div>
        </div>
      )}
    </>
  );
};
