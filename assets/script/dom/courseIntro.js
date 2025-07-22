// dom/courseIntro.js
export function setupCourseIntro(
  data,
  itemSelector,
  introId,
  contentId,
  closeBtnId
) {
  const items = document.querySelectorAll(itemSelector);
  const intro = document.getElementById(introId);
  const content = document.getElementById(contentId);
  const closeBtn = document.getElementById(closeBtnId);

  if (!intro || !content || !closeBtn) {
    console.warn("Thiếu phần tử trong courseIntro");
    return;
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.getAttribute("data-course");
      const course = data[key];
      if (course) {
        content.innerHTML = `<h4>${course.title}</h4><p>${course.content}</p>`;
        intro.style.display = "block";
        intro.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    intro.style.display = "none";
  });
}
