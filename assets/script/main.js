// main.js
import { setupAuthModal } from "./dom/authModal.js";
import { setupSlideshowControls } from "./dom/slideshow.js";
import { setupScrollEffects } from "./dom/scroll.js";
import {
  setupSmoothScroll,
  setupInternalSmoothScroll,
} from "./dom/smoothScroll.js";
import { setupCourseIntro } from "./dom/courseIntro.js";
import { setupFadeInSection, setupFadeInTeacher } from "./dom/fadeIn.js";
import { setupBackToTop } from "./dom/scroll.js";
import { setupHeaderScroll } from "./dom/headerScroll.js";
import { setupHomeLink } from "./dom/homeLink.js";
import { setupIntroObserver } from "./dom/introObserver.js";

document.addEventListener("DOMContentLoaded", () => {
  setupSlideshowControls();
  setupFadeInSection("#courses");
  setupFadeInSection("#about-us");
  setupFadeInSection("#contact-form");
  setupFadeInTeacher(".teacher");
  setupScrollEffects("backToTop", "mainHeader");
  setupSmoothScroll("nav", "mainHeader");
  setupInternalSmoothScroll("Gioithieu.html");
  setupBackToTop("backToTop");
  setupHomeLink("homeLink");
  setupIntroObserver();
  setupHeaderScroll();

  if (
    document.querySelector(".course") &&
    document.getElementById("courseIntro")
  ) {
    setupCourseIntro(
      {
        web: {
          title: "Khoá học Lập trình Web",
          content: "Học HTML CSS JS từ cơ bản đến nâng cao...",
        },
        data: {
          title: "Khoá học Phân tích dữ liệu",
          content: "Sử dụng Python, Excel, Pandas để phân tích dữ liệu",
        },
        uiux: {
          title: "Khoá học Thiết kế UI/UX",
          content: "Thiết kế giao diện đẹp, dễ dùng với Figma",
        },
      },
      ".course",
      "courseIntro",
      "courseIntroContent",
      "closeCourseIntro"
    );
  }

  // Chèn modal rồi setup
  includeHTML("#authContainer", "./modal/authModal.html", () => {
    setupAuthModal(
      "authBtn",
      "authModal",
      "closeAuthModal",
      "loginForm",
      "registerForm",
      "modalTitle",
      "toggleToRegister",
      "toggleToLogin"
    );

    const urlParams = new URLSearchParams(window.location.search);
    const loginStatus = urlParams.get("login");

    if (loginStatus === "fail") {
      console.warn("⚠️ Đăng nhập thất bại");
      alert("⚠️ Tên đăng nhập hoặc mật khẩu không đúng!");
      // Mở modal đăng nhập luôn
      const authBtn = document.getElementById("authBtn");
      if (authBtn) authBtn.click();
    }

    if (loginStatus === "success") {
      console.log("✅ Đăng nhập thành công!");
    }
  });
});

function includeHTML(selector, url, callback) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((err) => console.error("Lỗi load modal:", err));
}
