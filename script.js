document.addEventListener('DOMContentLoaded', () => {
  const navLinks = [...document.querySelectorAll('nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (!targetId || !targetId.startsWith('#') || !target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveLink(target.id);
      history.replaceState(null, '', targetId);
    });
  });

  const updateActiveSection = () => {
    const offset = window.scrollY + 180;
    let currentId = 'home';

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        currentId = section.id;
      }
    });

    setActiveLink(currentId);
  };

  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });
});
