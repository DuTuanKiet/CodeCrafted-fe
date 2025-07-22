// dom/scroll.js
export function setupScrollEffects(backBtnId, headerId) {
  const backBtn = document.getElementById(backBtnId);
  const header = document.getElementById(headerId);
  window.addEventListener("scroll", () => {
    window.scrollY > 100
      ? backBtn.classList.add("show")
      : backBtn.classList.remove("show");
    window.scrollY > 50
      ? header.classList.add("scrolled")
      : header.classList.remove("scrolled");
    document.querySelectorAll(".fade-in").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("visible");
    });
  });
}

export function setupBackToTop(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 200);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
