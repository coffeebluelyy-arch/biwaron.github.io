const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const revealItems = document.querySelectorAll('.reveal, .playful-a5');
const wiggleItem = document.querySelector('.wiggle-hover');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.3,
    root: null,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (wiggleItem) {
  const triggerFunnyAnimation = () => {
    wiggleItem.classList.remove('is-wiggling');
    void wiggleItem.offsetWidth;
    wiggleItem.classList.add('is-wiggling');
  };

  wiggleItem.addEventListener('mouseenter', triggerFunnyAnimation);
  wiggleItem.addEventListener('animationend', (event) => {
    if (event.animationName === 'wiggleSoft') {
      wiggleItem.classList.remove('is-wiggling');
    }
  });
}