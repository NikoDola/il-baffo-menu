// Simple animation utilities without external dependencies

export const initAnimations = () => {
  // Simple fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observe elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach((el) => {
    observer.observe(el);
  });
};

export const initMobileMenu = () => {
  // Mobile menu is now handled by React state in Header component
  // This function is kept for compatibility but does nothing
  // The React component handles all mobile menu functionality
};

export const initSmoothScrolling = () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
};

export const initScrollEffects = () => {
  const handleScroll = () => {
    const mobileNav = document.querySelector('.nav');

    if (window.innerWidth < 780 && mobileNav) {
      if (window.scrollY > 60) {
        mobileNav.classList.add('scrolled');
      } else {
        mobileNav.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
};

// Initialize all animations and effects
export const initAll = () => {
  if (typeof window !== 'undefined') {
    initAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
  }
};
