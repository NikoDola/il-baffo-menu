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
  const mobileMenuContent = document.querySelector('.mobile-menu-content');
  const navToggles = document.querySelectorAll('.nav-toggle');
  const body = document.body;

  const toggleMobileMenu = () => {
    navToggles.forEach(el => {
      el.classList.toggle('opened');
    });

    if (mobileMenuContent) {
      mobileMenuContent.classList.toggle('opened');
    }

    body.classList.toggle('overlay');

    setTimeout(() => {
      if (body.classList.contains('overlay')) {
        body.setAttribute('onclick', 'toggleMobileMenu();');
      } else {
        body.removeAttribute('onclick');
      }
    }, 100);
  };

  // Add click handlers to nav toggles
  navToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleMobileMenu);
  });

  // Close menu when clicking outside
  if (mobileMenuContent) {
    mobileMenuContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
};

export const initSmoothScrolling = () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href')!);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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
