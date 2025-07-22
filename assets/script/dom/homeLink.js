// dom/homeLink.js
export function setupHomeLink(linkId) {
  const link = document.getElementById(linkId);
  link.addEventListener("click", (e) => {
    const path = window.location.pathname;
    if (path.endsWith("index.html") || path === "/" || path === "/index.html") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
