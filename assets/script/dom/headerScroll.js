// dom/headerScroll.js
export function setupHeaderScroll() {
  const header = document.querySelector(".header");
  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        if (currentScroll > lastScrollTop && currentScroll > 100) {
          header.classList.add("hidden");
        } else {
          header.classList.remove("hidden");
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}
