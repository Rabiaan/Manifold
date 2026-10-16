import gsap from 'gsap';

/**
 * Animate the Hero Section with cinematic staggered reveals
 */
export const animateHeroEntrance = (scope: HTMLElement | null) => {
  if (!scope) return () => {};

  const ctx = gsap.context(() => {
    const kicker = scope.querySelector('.gsap-hero-kicker');
    const headline = scope.querySelector('.gsap-hero-headline');
    const description = scope.querySelector('.gsap-hero-description');
    const actions = scope.querySelector('.gsap-hero-actions');
    const imageFrame = scope.querySelector('.gsap-hero-image');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (kicker) {
      tl.fromTo(
        kicker,
        { opacity: 0, y: 15, letterSpacing: '0.25em' },
        { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.7 }
      );
    }

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.5'
      );
    }

    if (description) {
      tl.fromTo(
        description,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.6'
      );
    }

    if (actions) {
      tl.fromTo(
        actions,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5'
      );
    }

    if (imageFrame) {
      tl.fromTo(
        imageFrame,
        { opacity: 0, scale: 1.03, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' },
        '-=0.7'
      );
    }
  }, scope);

  return () => ctx.revert();
};

/**
 * Animate What We Do section with animated grey top border expansion
 */
export const setupWhatWeDoAnimation = (sectionElement: HTMLElement | null) => {
  if (!sectionElement) return () => {};

  const ctx = gsap.context(() => {
    const header = sectionElement.querySelector('.gsap-wwd-header');
    const items = sectionElement.querySelectorAll('.gsap-wwd-item');

    // Create an intersection observer for when the section scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (header) {
              tl.fromTo(
                header,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8 }
              );
            }

            if (items.length > 0) {
              tl.fromTo(
                items,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.15,
                },
                '-=0.4'
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionElement);
  }, sectionElement);

  return () => ctx.revert();
};

/**
 * Subtle magnetic pull on interactive buttons
 */
export const attachMagneticEffect = (button: HTMLElement | null) => {
  if (!button || !window.matchMedia('(pointer: fine)').matches) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};
