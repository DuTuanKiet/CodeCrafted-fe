// ==== SlideShow Controller ====
class Slideshow {
  constructor(slidesSelector, dotsSelector, interval = 4000) {
    this.slides = document.querySelectorAll(slidesSelector);
    this.dots = document.querySelectorAll(dotsSelector);
    this.currentSlide = 0;
    this.intervalTime = interval;
    this.intervalId = null;
    this.init();
  }

  init() {
    this.showSlide(this.currentSlide);
    this.intervalId = setInterval(() => this.nextSlide(), this.intervalTime);

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.showSlide(index);
        this.resetInterval();
      });
    });
  }

  showSlide(index) {
    if (index >= this.slides.length) index = 0;
    if (index < 0) index = this.slides.length - 1;

    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active-dot"));

    if (this.slides[index]) {
      this.slides[index].classList.add("active");
    }
    if (this.dots[index]) {
      this.dots[index].classList.add("active-dot");
    }

    const currentVideo = this.slides[index].querySelector("video");
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play();
    }

    this.currentSlide = index;
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  resetInterval() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.nextSlide(), this.intervalTime);
  }
}

// ==== Course Intro Logic ====
function setupCourseIntro(
  courseData,
  itemSelector,
  introId,
  contentId,
  closeBtnId
) {
  const items = document.querySelectorAll(itemSelector);
  const intro = document.getElementById(introId);
  const content = document.getElementById(contentId);
  const closeBtn = document.getElementById(closeBtnId);

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.getAttribute("data-course");
      const course = courseData[key];

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

// ==== Scroll Event Handling ====
function setupScrollEffects(backBtnId, headerId) {
  const backBtn = document.getElementById(backBtnId);
  const header = document.getElementById(headerId);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) backBtn.classList.add("show");
    else backBtn.classList.remove("show");

    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    document.querySelectorAll(".fade-in").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  });
}

// ==== Smooth Scroll to Anchors ====
function setupSmoothScroll(navSelector, headerId) {
  document.querySelectorAll(`${navSelector} a[href^="#"]`).forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetID);
      if (!targetElement) return;

      const headerHeight = document.getElementById(headerId).offsetHeight;
      const offsetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
  });
}

// ==== Auth Modal ====
function setupAuthModal(
  authBtnId,
  modalId,
  closeBtnId,
  loginFormId,
  registerFormId,
  titleId,
  showRegisterId,
  showLoginId
) {
  const authBtn = document.getElementById(authBtnId);
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);
  const loginForm = document.getElementById(loginFormId);
  const registerForm = document.getElementById(registerFormId);
  const modalTitle = document.getElementById(titleId);
  const showRegister = document.getElementById(showRegisterId);
  const showLogin = document.getElementById(showLoginId);

  if (
    !authBtn ||
    !modal ||
    !closeBtn ||
    !loginForm ||
    !registerForm ||
    !modalTitle ||
    !showRegister ||
    !showLogin
  ) {
    console.warn("Một hoặc nhiều phần tử trong modal không tìm thấy.");
    return;
  }

  authBtn.addEventListener("click", () => {
    modalTitle.textContent = "Đăng nhập";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showRegister.style.display = "inline";
    showLogin.style.display = "none";
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = "Đăng ký";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    showRegister.style.display = "none";
    showLogin.style.display = "inline";
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = "Đăng nhập";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showRegister.style.display = "inline";
    showLogin.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// ==== Home Scroll ====
function setupHomeLink(linkId) {
  const link = document.getElementById(linkId);
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== Secondary Slide Show (legacy support) ====
function setupLegacySlideShow(slideClass) {
  let index = 1;
  const show = (n) => {
    const slides = document.getElementsByClassName(slideClass);
    if (!slides.length) return;
    if (n > slides.length) index = 1;
    if (n < 1) index = slides.length;
    Array.from(slides).forEach((s) => (s.style.display = "none"));
    slides[index - 1].style.display = "block";
  };

  window.onload = () => show(index);
}

// ==== Back to Top Setup ====
function setupBackToTop(btnId) {
  const backToTopBtn = document.getElementById(btnId);
  if (!backToTopBtn) return;

  // Hiện nút khi cuộn xuống 200px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==== Init ====
window.addEventListener("DOMContentLoaded", () => {
  const slideshow = new Slideshow(".slideshow__slide", ".slideshow__dot");
  document
    .querySelector(".slideshow__control--prev")
    ?.addEventListener("click", () => {
      slideshow.prevSlide();
      slideshow.resetInterval();
    });
  document
    .querySelector(".slideshow__control--next")
    ?.addEventListener("click", () => {
      slideshow.nextSlide();
      slideshow.resetInterval();
    });

  setupCourseIntro(
    {
      web: {
        title: "Khoá học Lập trình Web",
        content:
          "Học từ cơ bản đến nâng cao về HTML, CSS, JavaScript, giúp bạn tạo ra các trang web hiện đại và responsive.",
      },
      data: {
        title: "Khoá học Phân tích dữ liệu",
        content:
          "Sử dụng Python, Excel, và các công cụ phân tích để xử lý và trực quan hoá dữ liệu hiệu quả.",
      },
      uiux: {
        title: "Khoá học Thiết kế UI/UX",
        content:
          "Tìm hiểu cách thiết kế giao diện người dùng đẹp mắt, thân thiện, nâng cao trải nghiệm người dùng.",
      },
    },
    ".course-item",
    "courseIntro",
    "courseIntroContent",
    "closeCourseIntro"
  );

  setupScrollEffects("backToTop", "mainHeader");
  setupSmoothScroll("nav", "mainHeader");

  // Chỉ gọi setupAuthModal nếu đủ các phần tử cần thiết
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

  setupHomeLink("homeLink");
  setupLegacySlideShow("mySlides");
  setupBackToTop("backToTop");
});
