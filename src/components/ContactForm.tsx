import React, { useState, useEffect } from 'react';
import { ServiceOption, ProjectEnquiry } from '../types';
import { Check, ArrowRight, Instagram, CheckCircle2 } from 'lucide-react';
import { CONTACT_DATA } from '../data/content';

interface ContactFormProps {
  initialService?: ServiceOption;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<ServiceOption[]>(
    initialService ? [initialService] : []
  );
  const [timeline, setTimeline] = useState('');
  const [brief, setBrief] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ProjectEnquiry | null>(null);

  useEffect(() => {
    if (initialService && !selectedServices.includes(initialService)) {
      setSelectedServices([initialService]);
    }
  }, [initialService]);

  const toggleService = (service: ServiceOption) => {
    if (service === 'Not sure yet') {
      setSelectedServices(['Not sure yet']);
      return;
    }

    const withoutNotSure = selectedServices.filter((s) => s !== 'Not sure yet');
    if (withoutNotSure.includes(service)) {
      setSelectedServices(withoutNotSure.filter((s) => s !== service));
    } else {
      setSelectedServices([...withoutNotSure, service]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (selectedServices.length === 0) {
      newErrors.services = 'Please select at least one service category';
    }

    if (!brief.trim()) {
      newErrors.brief = 'Please share a brief description of your project';
    } else if (brief.trim().length < 15) {
      newErrors.brief = 'Please provide a little more detail (at least 15 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const newEnquiry: ProjectEnquiry = {
        id: `MNF-${Date.now().toString().slice(-4)}`,
        name,
        email,
        company: company || undefined,
        services: selectedServices,
        timeline: timeline || undefined,
        brief,
        createdAt: new Date().toISOString(),
      };

      try {
        const stored = localStorage.getItem('manifold_enquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newEnquiry);
        localStorage.setItem('manifold_enquiries', JSON.stringify(list));
      } catch {
        // Fallback
      }

      setSubmittedData(newEnquiry);
    } catch {
      setErrors({ form: 'An unexpected transmission error occurred. Your entered data has been preserved.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setSelectedServices([]);
    setTimeline('');
    setBrief('');
    setErrors({});
    setSubmittedData(null);
  };

  if (submittedData) {
    return (
      <div className="w-full bg-[#141414] border border-[#1FCD6E]/40 rounded-xl p-8 sm:p-12 text-white animate-in fade-in duration-300">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#1FCD6E]/20 text-[#1FCD6E] flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[#1FCD6E] uppercase tracking-widest">
              DELIVERY CONFIRMED &middot; REF #{submittedData.id}
            </span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
              Thank you, {submittedData.name}.
            </h3>
            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              We have received your project details and will review them carefully. You can expect a direct response to <span className="text-[#1FCD6E]">{submittedData.email}</span> within 24 business hours.
            </p>
          </div>

          <div className="p-4 bg-[#0D0D0D] border border-[#2B2B2B] rounded-lg text-left font-mono text-xs space-y-2 text-neutral-300">
            <div>
              <span className="text-neutral-500">SERVICES: </span>
              <span className="text-white">{submittedData.services.join(', ')}</span>
            </div>
            {submittedData.company && (
              <div>
                <span className="text-neutral-500">COMPANY: </span>
                <span className="text-white">{submittedData.company}</span>
              </div>
            )}
            {submittedData.timeline && (
              <div>
                <span className="text-neutral-500">TARGET TIMELINE: </span>
                <span className="text-white">{submittedData.timeline}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1FCD6E] text-[#0D0D0D] font-headline font-bold text-xs capitalize tracking-wider rounded-md hover:bg-[#1bb863] transition-colors cursor-pointer"
          >
            <span>Send another enquiry</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-8 bg-[#141414] border border-[#2B2B2B] rounded-xl p-6 sm:p-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="pb-2 border-b border-[#2B2B2B]">
            <p className="font-mono text-xs text-[#1FCD6E] uppercase tracking-widest">
              YOUR PROJECT
            </p>
          </div>

          {errors.form && (
            <div className="p-3 bg-red-950/60 border border-red-500 text-red-200 text-xs font-mono rounded">
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-sans font-medium text-neutral-300">
                Your name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="First and last name"
                className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-md text-white text-sm focus:outline-none focus:border-[#1FCD6E] transition-colors ${
                  errors.name ? 'border-red-500' : 'border-[#2B2B2B]'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-mono">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-sans font-medium text-neutral-300">
                Email address *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="name@company.com"
                className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-md text-white text-sm focus:outline-none focus:border-[#1FCD6E] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-[#2B2B2B]'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-mono">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-xs font-sans font-medium text-neutral-300">
              Company / agency
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Brand name, studio, or agency"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2B2B2B] rounded-md text-white text-sm focus:outline-none focus:border-[#1FCD6E] transition-colors"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-sans font-medium text-neutral-300">
              What can we help with? *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CONTACT_DATA.serviceOptions.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => {
                      toggleService(service);
                      if (errors.services) setErrors({ ...errors, services: '' });
                    }}
                    className={`py-3 px-4 rounded-md text-xs font-headline font-semibold capitalize flex items-center justify-between border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1FCD6E] text-[#0D0D0D] border-[#1FCD6E] font-bold shadow-sm'
                        : 'bg-[#0D0D0D] text-neutral-300 border-[#2B2B2B] hover:border-neutral-500 hover:text-white'
                    }`}
                  >
                    <span>{service}</span>
                    {isSelected && <Check size={14} className="stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p className="text-xs text-red-400 font-mono">{errors.services}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="timeline" className="block text-xs font-sans font-medium text-neutral-300">
              Target launch date / timeline
            </label>
            <input
              id="timeline"
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. Q4 2026, 6 weeks, or flexible"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2B2B2B] rounded-md text-white text-sm focus:outline-none focus:border-[#1FCD6E] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="brief" className="block text-xs font-sans font-medium text-neutral-300">
              Tell us about the project *
            </label>
            <textarea
              id="brief"
              rows={5}
              value={brief}
              onChange={(e) => {
                setBrief(e.target.value);
                if (errors.brief) setErrors({ ...errors, brief: '' });
              }}
              placeholder="Include the goal, audience, deliverables and any reference links."
              className={`w-full px-4 py-3 bg-[#0D0D0D] border rounded-md text-white text-sm focus:outline-none focus:border-[#1FCD6E] transition-colors resize-y ${
                errors.brief ? 'border-red-500' : 'border-[#2B2B2B]'
              }`}
            />
            {errors.brief && (
              <p className="text-xs text-red-400 font-mono">{errors.brief}</p>
            )}
          </div>

          <p className="text-xs font-sans text-neutral-400">
            {CONTACT_DATA.sidebar.privacyNote}
          </p>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1FCD6E] text-[#0D0D0D] hover:bg-[#1bb863] font-headline font-bold text-xs capitalize tracking-wider rounded-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Sending enquiry...' : 'Send project enquiry'}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </form>
      </div>

      <div className="lg:col-span-4 space-y-10 lg:pl-4">
        <div className="space-y-3">
          <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-white">
            {CONTACT_DATA.sidebar.preferTitle}
          </h3>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed">
            {CONTACT_DATA.sidebar.preferText}
          </p>
          <div>
            <a
              href={CONTACT_DATA.sidebar.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#1FCD6E] hover:underline"
            >
              <Instagram size={16} />
              <span>{CONTACT_DATA.sidebar.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-[#2B2B2B]">
          <h3 className="font-headline font-extrabold text-xl text-white">
            {CONTACT_DATA.sidebar.whatHelpsTitle}
          </h3>
          <ul className="space-y-3">
            {CONTACT_DATA.sidebar.bulletPoints.map((point) => (
              <li
                key={point}
                className="text-sm text-neutral-300 font-sans flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FCD6E] mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
