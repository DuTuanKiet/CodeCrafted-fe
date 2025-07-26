// Cuộn mượt khi click các link nội trang (trong nav)
export function setupSmoothScroll(navSelector, headerId) {
  const header = document.getElementById(headerId);
  if (!header) return;

  const headerHeight = header.offsetHeight;

  document.querySelectorAll(`${navSelector} a[href^="#"]`).forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      scrollToTarget(targetID, headerHeight);
    });
  });

  // Xử lý khi người dùng load trang kèm hash (ví dụ #section-teachers)
  const hash = window.location.hash;
  if (hash) {
    const targetID = hash.substring(1);
    setTimeout(() => scrollToTarget(targetID, headerHeight), 300);
  }
}

// Cuộn mượt khi người dùng đang ở trang Gioithieu.html và click các link dạng ./Gioithieu.html#...
export function setupInternalSmoothScroll(targetPage = "Gioithieu.html") {
  const currentPage = window.location.pathname.includes(targetPage);
  if (!currentPage) return;

  document.querySelectorAll(`a[href^="./${targetPage}#"]`).forEach((link) => {
    const targetId = link.getAttribute("href").split("#")[1];
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTarget(targetId);
    });
  });

  // Khi reload từ link có hash
  const hash = window.location.hash;
  if (hash) {
    const targetID = hash.substring(1);
    setTimeout(() => scrollToTarget(targetID), 300);
  }
}

// Hàm scroll chung
function scrollToTarget(targetID, headerOffset = 0) {
  const target = document.getElementById(targetID);
  if (!target) return;

  const offsetTop =
    target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}
