// dom/fadeIn.js
export function setupFadeInSection(selector) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 0.15}s`;
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
          entry.target.style.transitionDelay = "0s";
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}
