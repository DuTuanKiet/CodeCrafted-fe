export function setupIntroObserver() {
  const image = document.querySelector(".intro-image");
  const content = document.querySelector(".intro-content");

  if (!image || !content) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === image) {
            image.classList.add("show-left");
          } else if (entry.target === content) {
            content.classList.add("show-right");
          }
          obs.unobserve(entry.target); // chỉ thực hiện 1 lần
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(image);
  observer.observe(content);
}
