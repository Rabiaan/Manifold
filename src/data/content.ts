import { VisualStudy, ProcessStep, WhatWeDoItem, ServiceOption } from '../types';

import cinemaLensImg from '../assets/brand-imagery/manifold-cinema-lens-1600.webp';
import paperOrigamiImg from '../assets/brand-imagery/manifold-creative-paper-perspective-1600.webp';
import monolithCliffImg from '../assets/brand-imagery/manifold-ai-monolith-1600.webp';
import lighthouseImg from '../assets/images/film_lighthouse_study_1792007272671.jpg';
import packagingImg from '../assets/images/branding_packaging_study_1792007272508.jpg';
import worldbuildingImg from '../assets/images/worldbuilding_study_1792007332528.jpg';
import cyberpunkCityImg from '../assets/images/cyberpunk_city_study_1792007333823.jpg';
import portraitImg from '../assets/images/portrait_visual_study_1792007334287.jpg';
import productWatchImg from '../assets/images/product_watch_study_1792007333627.jpg';
import filmCrewImg from '../assets/images/film_crew_set_study_1792007334453.jpg';

export const ASSETS = {
  cinemaLens: cinemaLensImg,
  paperOrigami: paperOrigamiImg,
  monolithCliff: monolithCliffImg,
  lighthouse: lighthouseImg,
  packaging: packagingImg,
  worldbuilding: worldbuildingImg,
  cyberpunkCity: cyberpunkCityImg,
  portrait: portraitImg,
  productWatch: productWatchImg,
  filmCrew: filmCrewImg,
};

export const COMMON_PROCESS_STEPS: ProcessStep[] = [
  {
    name: 'Discover',
    description: 'Understand the brief, audience and goals.',
  },
  {
    name: 'Develop',
    description: 'Shape the concept, treatment and production plan.',
  },
  {
    name: 'Produce',
    description: 'Create the film, imagery or design assets.',
  },
  {
    name: 'Refine',
    description: 'Review, edit and bring the details together.',
  },
  {
    name: 'Deliver',
    description: 'Prepare the agreed assets and final formats.',
  },
];

export const HOME_DATA = {
  kicker: 'FILM / CREATIVE / AI',
  heroHeadline: 'Imagination, in motion.',
  heroDescription:
    'We are Manifold. A film production house, creative agency and AI production studio, bringing bold ideas to life through story and visual craft.',
  heroImageCaption: 'MANIFOLD / IMAGINATION, IN MOTION.',
  heroImage: ASSETS.cinemaLens,
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'One studio. Many possibilities.',
    items: [
      {
        title: 'Film',
        description: 'Commercials, music videos and films. From the first treatment to the final frame.',
        linkPage: 'film',
        serviceId: 'Film',
      },
      {
        title: 'Creative',
        description: 'Brand identities, campaign ideas and art direction that give your story a clear point of view.',
        linkPage: 'creative',
        serviceId: 'Creative',
      },
      {
        title: 'AI',
        description: 'AI commercials, content and hybrid production that open up new visual possibilities.',
        linkPage: 'ai',
        serviceId: 'AI',
      },
    ] as WhatWeDoItem[],
    subList: 'Cinematography / Photography / Editing / Motion graphics / Animation / Event coverage',
  },
  visualDirection: {
    kicker: 'VISUAL DIRECTION',
    headline: 'A glimpse of the possibilities.',
    note: 'Concept references from the pilot. Replace these with approved Manifold project imagery and credits before launch.',
    cards: [
      {
        id: 'home-film-study',
        title: 'Film / cinematic landscapes',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.lighthouse,
        category: 'Film',
        details: 'Visual tone study exploring atmospheric coastline lighting, natural elemental textures, and anamorphic lens compression.',
      },
      {
        id: 'home-creative-study',
        title: 'Creative / tactile identities',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.packaging,
        category: 'Creative',
        details: 'Tactile identity system study featuring bespoke charcoal matte stock, emerald ribbon foil accents, and dimensional embossing.',
      },
    ] as VisualStudy[],
  },
  processHeadline: 'From the first thought to the final frame.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'What can we create together?',
    description: 'Bring us an idea, a brief or a challenge. We will help shape what comes next.',
    buttonText: 'Start a project',
  },
};

export const ALL_VISUAL_STUDIES: VisualStudy[] = [
  {
    id: 'film-landscapes',
    title: 'Film / cinematic landscapes',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.lighthouse,
    category: 'Film',
    details: 'Visual tone study exploring atmospheric coastline lighting, natural elemental textures, and anamorphic lens compression.',
  },
  {
    id: 'creative-tactile',
    title: 'Creative / tactile identities',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.packaging,
    category: 'Creative',
    details: 'Tactile identity system study featuring bespoke charcoal matte stock, emerald ribbon foil accents, and dimensional embossing.',
  },
  {
    id: 'film-worldbuilding',
    title: 'Worldbuilding / visual study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.worldbuilding,
    category: 'Film',
    details: 'Sci-fi interior narrative study with geometric volumetric emerald hologram illumination.',
  },
  {
    id: 'creative-brand-systems',
    title: 'Brand system / visual study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.paperOrigami,
    category: 'Creative',
    details: 'Architectural paper forms reflecting mathematical precision, folded geometries and dimensional brand structure.',
  },
  {
    id: 'ai-architecture',
    title: 'Architecture / concept study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.cyberpunkCity,
    category: 'AI',
    details: 'Wet surface light refraction and megalithic urban brutalism generated with human director curation.',
  },
  {
    id: 'ai-environments',
    title: 'Environment / concept study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.monolithCliff,
    category: 'AI',
    details: 'Volcanic cliff monoliths reflected in still water, paired with precision emerald illumination.',
  },
  {
    id: 'content-portrait',
    title: 'Portrait / visual study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.portrait,
    category: 'Content',
    details: 'Cinematic studio portraiture with directional key light and film negative edge framing.',
  },
  {
    id: 'content-production',
    title: 'Production / visual study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.filmCrew,
    category: 'Content',
    details: 'Behind-the-scenes cinema crew operating ARRI cameras and high-output lighting panels on set.',
  },
  {
    id: 'content-product',
    title: 'Product / visual study',
    subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
    image: ASSETS.productWatch,
    category: 'Content',
    details: 'Luxury brushed titanium chronograph with emerald dial detail on basalt rock.',
  },
];

export const FILM_DATA = {
  kicker: 'FILM PRODUCTION',
  heroHeadline: 'Make every frame count.',
  heroDescription:
    'Commercials, films and music videos with a strong point of view. We shape the story, build the production and craft every frame around your brief.',
  ctaButtonText: 'Discuss a film project',
  heroImage: ASSETS.cinemaLens,
  heroImageCaption: 'MANIFOLD / IMAGINATION, IN MOTION.',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'Built around the story.',
    items: [
      {
        title: 'Commercials & brand films',
        description: 'Launch films, product stories and campaigns designed to connect with your audience.',
        linkPage: 'contact',
        serviceId: 'Film',
      },
      {
        title: 'Music videos & films',
        description: 'Concept development, direction and production for stories with their own visual language.',
        linkPage: 'contact',
        serviceId: 'Film',
      },
      {
        title: 'Cinematography',
        description: 'Composition, movement and lighting that bring a distinctive look to every scene.',
        linkPage: 'contact',
        serviceId: 'Film',
      },
    ] as WhatWeDoItem[],
    subList: 'Creative development / Pre-production / Direction / Production / Post-production',
  },
  visualDirection: {
    kicker: 'VISUAL DIRECTION',
    headline: 'Film directions.',
    note: 'Concept references from the pilot. Replace these with approved Manifold project imagery and credits before launch.',
    cards: [
      {
        id: 'film-atmosphere-study',
        title: 'Atmosphere / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.lighthouse,
        category: 'Atmosphere',
        details: 'Cinematic lighting and mist study on coastal cliff heads, capturing the scale of natural elements.',
      },
      {
        id: 'film-worldbuilding-study',
        title: 'Worldbuilding / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.worldbuilding,
        category: 'Sci-Fi Worldbuilding',
        details: 'Sci-fi interior narrative study with geometric volumetric emerald hologram illumination.',
      },
    ] as VisualStudy[],
  },
  processHeadline: 'A considered production, from start to finish.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'Your next story starts here.',
    description: 'Tell us about the idea, audience and release plan. Let us work out how to bring it to the screen.',
    buttonText: 'Start a project',
  },
};

export const CREATIVE_DATA = {
  kicker: 'CREATIVE DIRECTION & BRANDING',
  heroHeadline: 'Start with an idea.',
  heroDescription:
    'We find the story at the heart of your brand and turn it into a visual identity, a campaign and a world people can recognise.',
  ctaButtonText: 'Start a creative project',
  heroImage: ASSETS.paperOrigami,
  heroImageCaption: 'MANIFOLD / CREATIVE EXPLORATIONS',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'A clear idea. A distinct identity.',
    items: [
      {
        title: 'Creative direction',
        description: 'Visual concepts, art direction, treatments and moodboards that give a project its point of view.',
        linkPage: 'contact',
        serviceId: 'Creative',
      },
      {
        title: 'Branding & identity',
        description: 'Logo systems, typography, colour and brand guidelines built to work together.',
        linkPage: 'contact',
        serviceId: 'Creative',
      },
      {
        title: 'Campaign development',
        description: 'Campaign concepts, copy and visual systems adapted across the channels that matter.',
        linkPage: 'contact',
        serviceId: 'Creative',
      },
    ] as WhatWeDoItem[],
    subList: 'Brand strategy / Identity / Art direction / Campaigns / Storyboards / Visual treatments',
  },
  visualDirection: {
    kicker: 'VISUAL DIRECTION',
    headline: 'Ideas made tangible.',
    note: 'Concept references from the pilot. Replace these with approved Manifold project imagery and credits before launch.',
    cards: [
      {
        id: 'creative-identity-study',
        title: 'Identity / material study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.packaging,
        category: 'Material & Print',
        details: 'Debossed typography, premium uncoated black paper stocks, and deep emerald wax seal accents.',
      },
      {
        id: 'creative-brand-study',
        title: 'Brand system / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.paperOrigami,
        category: 'Brand Systems',
        details: 'Architectural paper forms reflecting mathematical precision, folded geometries and dimensional brand structure.',
      },
    ] as VisualStudy[],
  },
  processHeadline: 'Clarity before execution.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'Let us find your next idea.',
    description: 'Share the ambition behind your brand. We will help turn it into a direction worth following.',
    buttonText: 'Start a project',
  },
};

export const AI_DATA = {
  kicker: 'AI PRODUCTION STUDIO',
  heroHeadline: 'Imagine beyond the ordinary.',
  heroDescription:
    "AI commercials, visual content and hybrid productions, guided by human creative direction. We combine new tools with a filmmaker's eye for story, light and detail.",
  ctaButtonText: 'Explore an AI project',
  heroImage: ASSETS.monolithCliff,
  heroImageCaption: 'MANIFOLD / IMAGINATION, IN MOTION.',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'New possibilities. Clear direction.',
    items: [
      {
        title: 'AI commercials',
        description: 'Concept-led films and campaign visuals developed around a defined story and visual language.',
        linkPage: 'contact',
        serviceId: 'AI',
      },
      {
        title: 'AI content',
        description: 'Brand imagery, visual experiments and social content with a consistent creative direction.',
        linkPage: 'contact',
        serviceId: 'AI',
      },
      {
        title: 'Hybrid production',
        description: 'Live-action footage and AI-generated elements brought together in a considered production workflow.',
        linkPage: 'contact',
        serviceId: 'AI',
      },
    ] as WhatWeDoItem[],
    subList: 'Concept / Look development / Visual generation / Editorial / Finishing',
  },
  visualDirection: {
    kicker: 'VISUAL DIRECTION',
    headline: 'Worlds in development.',
    note: 'Concept references from the pilot. Replace these with approved Manifold project imagery and credits before launch.',
    cards: [
      {
        id: 'ai-arch-study',
        title: 'Architecture / concept study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.cyberpunkCity,
        category: 'Generative Architecture',
        details: 'Wet surface light refraction and megalithic urban brutalism generated with human director curation.',
      },
      {
        id: 'ai-env-study',
        title: 'Environment / concept study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.monolithCliff,
        category: 'Atmospheric Environments',
        details: 'Volcanic cliff monoliths reflected in still water, paired with precision emerald illumination.',
      },
    ] as VisualStudy[],
  },
  processHeadline: 'Directed, reviewed and refined.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'What if we made it possible?',
    description: 'Bring the idea you have been imagining. We will explore an approach, scope and visual direction together.',
    buttonText: 'Start a project',
  },
};

export const CRAFT_DATA = {
  kicker: 'EDITING, MOTION & FINISHING',
  heroHeadline: 'The craft is in the finish.',
  heroDescription:
    'Editing, colour, motion graphics and animation that turn separate elements into one cohesive story. Every cut, frame and detail has a purpose.',
  ctaButtonText: 'Discuss post-production',
  heroTimelineTitle: 'THE EDIT / A DESIGN STUDY',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'Make every detail work.',
    items: [
      {
        title: 'Editing & colour',
        description: 'Story structure, pacing and colour treatment shaped around the feeling of the film.',
        linkPage: 'contact',
        serviceId: 'Craft',
      },
      {
        title: 'Motion & animation',
        description: 'Titles, motion graphics and animation that extend your visual identity.',
        linkPage: 'contact',
        serviceId: 'Craft',
      },
      {
        title: 'Versions & delivery',
        description: 'Cutdowns and adaptations prepared for the agreed platforms and output formats.',
        linkPage: 'contact',
        serviceId: 'Craft',
      },
    ] as WhatWeDoItem[],
    subList: 'Editing / Colour grading / Motion graphics / Animation / Social adaptations',
  },
  deliveryFormats: {
    kicker: 'DELIVERY WITH PURPOSE',
    headline: 'Built for the way your work is seen.',
    subtext: 'Film, vertical, square and social adaptations, defined around your delivery plan.',
    formats: [
      { ratio: '16:9', label: 'Film', description: 'Cinema & YouTube landscape master' },
      { ratio: '4:5', label: 'Social', description: 'Feed optimization with maximum screen share' },
      { ratio: '9:16', label: 'Vertical', description: 'Immersive mobile reels and shorts' },
      { ratio: '1:1', label: 'Square', description: 'Universal cross-platform square crop' },
    ],
  },
  processHeadline: 'A clear path to the final version.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'Give your story its final shape.',
    description: 'Share your footage, references and delivery needs. We will help plan the next stage.',
    buttonText: 'Start a project',
  },
};

export const CONTENT_DATA = {
  kicker: 'PHOTOGRAPHY & CONTENT',
  heroHeadline: 'Capture the whole picture.',
  heroDescription:
    'Commercial photography, social content and event coverage with a consistent visual point of view. Planned for the places your audience sees you.',
  ctaButtonText: 'Plan a content shoot',
  heroImage: ASSETS.paperOrigami,
  heroImageCaption: 'MANIFOLD / CREATIVE EXPLORATIONS',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'One story. More ways to tell it.',
    items: [
      {
        title: 'Photography',
        description: 'Product, brand and editorial imagery, with thoughtful lighting and art direction.',
        linkPage: 'contact',
        serviceId: 'Content',
      },
      {
        title: 'Event coverage',
        description: 'Photography and films that capture the atmosphere, people and defining moments.',
        linkPage: 'contact',
        serviceId: 'Content',
      },
      {
        title: 'Social content',
        description: 'Reels, short-form films and stills designed around your campaign and content calendar.',
        linkPage: 'contact',
        serviceId: 'Content',
      },
    ] as WhatWeDoItem[],
    subList: 'Photography / Social films / Event coverage / Behind the scenes / Campaign assets',
  },
  visualDirection: {
    kicker: 'VISUAL DIRECTION',
    headline: 'A range of visual perspectives.',
    note: 'Concept references from the pilot. Replace these with approved Manifold project imagery and credits before launch.',
    cards: [
      {
        id: 'content-portrait-study',
        title: 'Portrait / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.portrait,
        category: 'Portraiture',
        details: 'Cinematic studio portraiture with directional key light and film negative edge framing.',
      },
      {
        id: 'content-arch-study',
        title: 'Architecture / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.cyberpunkCity,
        category: 'Urban Environment',
        details: 'Reflective nocturnal urban architecture and ambient lighting study.',
      },
      {
        id: 'content-prod-study',
        title: 'Production / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.filmCrew,
        category: 'On Set',
        details: 'Behind-the-scenes cinema crew operating ARRI cameras and high-output lighting panels on set.',
      },
      {
        id: 'content-product-study',
        title: 'Product / visual study',
        subtitle: 'PILOT CONCEPT / NOT A VERIFIED CLIENT CREDIT',
        image: ASSETS.productWatch,
        category: 'Product Macro',
        details: 'Luxury brushed titanium chronograph with emerald dial detail on basalt rock.',
      },
    ] as VisualStudy[],
  },
  processHeadline: 'Plan for every useful frame.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'Let us make your next moment.',
    description: 'Tell us what you are launching, sharing or celebrating. We will help plan the content around it.',
    buttonText: 'Start a project',
  },
};

export const ABOUT_DATA = {
  kicker: 'ABOUT MANIFOLD',
  heroHeadline: 'Many disciplines. One imagination.',
  heroDescription:
    'Manifold brings film production, creative thinking and AI production together. We are a highly creative team with a shared focus on storytelling, visual quality and thoughtful execution.',
  ctaButtonText: 'Work with us',
  heroImage: ASSETS.monolithCliff,
  heroImageCaption: 'MANIFOLD / IMAGINATION, IN MOTION.',
  whatWeDo: {
    kicker: 'WHAT WE DO',
    headline: 'Built for collaboration.',
    items: [
      {
        title: 'For agencies',
        description: 'A production partner to help develop and deliver the brief, working alongside your creative team.',
        linkPage: 'contact',
      },
      {
        title: 'For businesses',
        description: 'Creative direction and production support, from an early idea to a considered set of deliverables.',
        linkPage: 'contact',
      },
    ] as WhatWeDoItem[],
    subList: 'Story-led thinking / Visual craft / Creative range / Collaboration',
  },
  approach: {
    kicker: 'OUR APPROACH',
    headline: 'Story first. Craft throughout.',
    paragraph:
      'A strong idea gives every production a reason to exist. We bring the same care to the concept, the lighting, the edit and the final presentation, choosing the tools that best serve the story.',
  },
  processHeadline: 'How we bring a brief to life.',
  cta: {
    kicker: 'LET US CREATE SOMETHING',
    headline: 'Your vision. Our next collaboration.',
    description: 'Every good project starts with a conversation. Let us hear what you have in mind.',
    buttonText: 'Start a project',
  },
};

export const CONTACT_DATA = {
  kicker: 'START A PROJECT',
  heroHeadline: 'Let us make something move.',
  heroDescription:
    'Tell us what you are thinking. A clear brief helps us recommend the right creative approach, production scope and next steps.',
  jumpButtonText: 'Send project enquiry',
  sidebar: {
    preferTitle: 'Prefer a conversation?',
    preferText: 'You can reach Manifold on Instagram to start the conversation.',
    instagramHandle: '@manifoldmotionpictures',
    instagramUrl: 'https://instagram.com/manifoldmotionpictures',
    whatHelpsTitle: 'What helps us get started',
    bulletPoints: [
      'Your brand and project goal',
      'What you need us to create',
      'Where the content will appear',
      'Your timeline and budget context',
    ],
    privacyNote: 'We will use the details you send to respond to your enquiry.',
  },
  serviceOptions: ['Film', 'Creative', 'AI', 'Craft', 'Content', 'Not sure yet'] as ServiceOption[],
};
