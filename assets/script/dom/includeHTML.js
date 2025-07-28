export async function setupIncludeHTML() {
  const elements = document.querySelectorAll("[include-html]");
  for (const el of elements) {
    const file = el.getAttribute("include-html");
    if (file) {
      try {
        const response = await fetch(file);
        console.log("Đang tải: " + file);
        if (!response.ok) throw new Error("Không thể tải " + file);
        const data = await response.text();
        el.innerHTML = data;
        el.removeAttribute("include-html");
      } catch (error) {
        el.innerHTML = "Lỗi: Không thể tải file " + file;
        console.error(error);
      }
    }
  }
}
