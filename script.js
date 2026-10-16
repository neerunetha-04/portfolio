/**
 * PERSONAL PORTFOLIO JAVASCRIPT
 * Client: KEMA NEERAJA (B.E Student in CSE - AI & ML)
 * Features: Mobile Navigation, ScrollSpy, Skill Animations, Form Handling, Email Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1. DYNAMIC YEAR IN FOOTER ----------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ---------- 2. MOBILE NAVIGATION DRAWER ----------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ---------- 3. STICKY HEADER & SCROLL BEHAVIOR ----------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- 4. ACTIVE LINK SCROLL SPY ----------
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // ---------- 5. SKILLS PROGRESS BARS REVEAL ANIMATION ----------
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  if (skillBars.length > 0) {
    // Initially set width to 0 for smooth entrance
    skillBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-level') || bar.style.width;
      bar.dataset.targetWidth = targetWidth;
      bar.style.width = '0%';
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              bar.style.width = bar.dataset.targetWidth || '70%';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      skillsObserver.observe(skillsSection);
    }
  }

  // ---------- 6. ONE-CLICK EMAIL COPY FEATURE ----------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyEmailBtn && copyTooltip) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'neerunetha@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback method
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        
        copyTooltip.textContent = 'Copied!';
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
          setTimeout(() => { copyTooltip.textContent = 'Copy'; }, 200);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
        copyTooltip.textContent = 'Failed';
        copyTooltip.classList.add('show');
        setTimeout(() => copyTooltip.classList.remove('show'), 2000);
      }
    });
  }

  // ---------- 7. CONTACT FORM VALIDATION & MAILTO HANDLER ----------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const subjectInput = document.getElementById('user-subject');
    const messageInput = document.getElementById('user-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Email validation helper
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Reset errors
      nameError.classList.remove('visible');
      nameInput.classList.remove('invalid');
      emailError.classList.remove('visible');
      emailInput.classList.remove('invalid');
      messageError.classList.remove('visible');
      messageInput.classList.remove('invalid');

      if (formStatus) {
        formStatus.className = 'form-status-alert';
        formStatus.textContent = '';
      }

      // Validate Name
      const name = nameInput.value.trim();
      if (!name) {
        nameError.classList.add('visible');
        nameInput.classList.add('invalid');
        hasError = true;
      }

      // Validate Email
      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        emailError.classList.add('visible');
        emailInput.classList.add('invalid');
        hasError = true;
      }

      // Validate Message
      const message = messageInput.value.trim();
      if (!message) {
        messageError.classList.add('visible');
        messageInput.classList.add('invalid');
        hasError = true;
      }

      if (hasError) return;

      const subject = (subjectInput && subjectInput.value.trim()) 
        ? subjectInput.value.trim() 
        : `Portfolio Message from ${name}`;

      // Construct mailto URL to launch client's email application
      const mailtoBody = encodeURIComponent(
        `Hello Neeraja,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from your Personal Portfolio Website.`
      );
      const mailtoLink = `mailto:neerunetha@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

      // Show user success state
      if (formStatus) {
        formStatus.className = 'form-status-alert success';
        formStatus.innerHTML = `✓ Thank you, <strong>${name}</strong>! Opening your email app to send your message to <strong>neerunetha@gmail.com</strong>...`;
      }

      // Trigger mail client
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 600);

      // Reset form fields
      contactForm.reset();
    });

    // Clear individual error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const errorSpan = document.getElementById(`${input.id.replace('user-', '')}-error`);
          if (errorSpan) errorSpan.classList.remove('visible');
        });
      }
    });
  }
});
