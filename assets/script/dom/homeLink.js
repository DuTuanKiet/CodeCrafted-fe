// dom/homeLink.js
export function setupHomeLink(linkId = "homeLink") {
  const link = document.getElementById(linkId);
  if (!link) return;

  link.addEventListener("click", (e) => {
    const path = window.location.pathname;
    const isHome =
      path.endsWith("index.html") ||
      path === "/" ||
      path.endsWith("/index.html");

    if (isHome) {
      e.preventDefault();
      smoothScrollToTop();
    }
    // Nếu không ở index.html thì browser sẽ điều hướng về index.html như bình thường
  });
}

function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
