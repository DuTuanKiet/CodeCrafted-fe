document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[include-html]");
  elements.forEach(function (el) {
    const file = el.getAttribute("include-html");
    if (file) {
      fetch(file)
        .then((response) => {
          console.log("Đang tải: " + file);
          if (!response.ok) throw new Error("Không thể tải " + file);
          return response.text();
        })
        .then((data) => {
          el.innerHTML = data;
          el.removeAttribute("include-html");
        })
        .catch((error) => {
          el.innerHTML = "Lỗi: Không thể tải file " + file;
          console.error(error);
        });
    }
  });
});
