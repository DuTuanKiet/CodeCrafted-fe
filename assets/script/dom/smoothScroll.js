// dom/smoothScroll.js
export function setupSmoothScroll(navSelector, headerId) {
  document.querySelectorAll(`${navSelector} a[href^="#"]`).forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetID);
      if (!target) return;

      const headerHeight = document.getElementById(headerId).offsetHeight;
      const offsetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    });
  });
}
