import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const heroAnimation = (container: string) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(`${container} .hero-logo`, {
    y: 50,
    opacity: 0,
    duration: 1,
  })
    .from(
      `${container} .hero-title`,
      {
        y: 100,
        opacity: 0,
        duration: 1,
      },
      '-=0.5'
    )
    .from(
      `${container} .hero-description`,
      {
        y: 50,
        opacity: 0,
        duration: 1,
      },
      '-=0.5'
    )
    .from(
      `${container} .hero-cta`,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.5'
    )
    .from(
      `${container} .trust-badges`,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.3'
    );

  return tl;
};

export const statsAnimation = () => {
  gsap.from('.stat-item', {
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
};

export const featuresAnimation = () => {
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
  });
};

export const dashboardAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.dashboard-preview',
      start: 'top 80%',
    },
  });

  tl.from('.dashboard-preview', {
    y: 100,
    opacity: 0,
    duration: 1,
  })
    .from(
      '.dashboard-card',
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      },
      '-=0.5'
    );

  return tl;
};

export const aiFeatureAnimation = () => {
  gsap.from('.ai-feature', {
    scrollTrigger: {
      trigger: '.ai-section',
      start: 'top 80%',
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });
};

export const currencyAnimation = () => {
  gsap.from('.currency-card', {
    scrollTrigger: {
      trigger: '.currency-section',
      start: 'top 80%',
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
  });
};

export const testimonialAnimation = () => {
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonials-section',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });
};

export const numberCounter = (element: string, target: number) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
    innerText: target,
    duration: 2,
    snap: { innerText: 1 },
  });
};