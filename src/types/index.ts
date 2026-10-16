export type PageId = 
  | 'home' 
  | 'film' 
  | 'creative' 
  | 'ai' 
  | 'craft' 
  | 'content' 
  | 'about' 
  | 'contact';

export type ServiceOption = 
  | 'Film' 
  | 'Creative' 
  | 'AI' 
  | 'Craft' 
  | 'Content' 
  | 'Not sure yet';

export interface VisualStudy {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  aspect?: string;
  details?: string;
}

export interface WhatWeDoItem {
  title: string;
  description: string;
  linkPage?: PageId;
  serviceId?: ServiceOption;
}

export interface ProcessStep {
  name: string;
  description: string;
}

export interface ProjectEnquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: ServiceOption[];
  timeline?: string;
  brief: string;
  createdAt: string;
}
