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

    // đang lỗi----------------------------------------
    const currentSlide = this.slides[index];
    if (!currentSlide) return;

    let video = null;

    // Nếu slide là chính thẻ <video>
    if (currentSlide.tagName === "VIDEO") {
      video = currentSlide;
    } else {
      // Nếu slide là <div> chứa <video>
      video = currentSlide.querySelector("video");
    }

    // Kiểm tra video tồn tại và là thẻ VIDEO
    if (video && video.tagName === "VIDEO") {
      console.log("Video element:", video);
      console.log("Tag name:", video.tagName);

      // Đảm bảo video được reset và phát lại
      video.currentTime = 0;

      // Nếu đã load đủ để phát
      if (video.readyState >= 3) {
        video.play().catch((err) => {
          console.warn("Không phát được video:", err);
        });
      } else {
        // Đợi cho đến khi video có thể phát
        video.addEventListener(
          "canplay",
          () => {
            video.play().catch((err) => {
              console.warn("Không phát được video (canplay):", err);
            });
          },
          { once: true }
        ); // chỉ nghe 1 lần
      }
    } else {
      console.warn("Không tìm thấy hoặc phần tử không phải VIDEO:", video);
    }

    //--------------------------------------------------

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

  // Nếu thiếu phần tử nào thì cảnh báo và dừng
  if (!intro || !content || !closeBtn) {
    console.warn("Một trong các phần tử courseIntro bị thiếu:", {
      intro,
      content,
      closeBtn,
    });
    return;
  }

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

function setupHomeLink(linkId) {
  const link = document.getElementById(linkId);

  link.addEventListener("click", (e) => {
    const currentPath = window.location.pathname;

    // Nếu đang ở index.html → cuộn lên đầu trang
    if (
      currentPath.endsWith("index.html") ||
      currentPath === "/" ||
      currentPath === "/index.html"
    ) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Ngược lại (đang ở trang khác) → để mặc định chuyển trang
    // KHÔNG dùng preventDefault trong trường hợp này
  });
}

// ==== Header Scroll ====
let lastScrollTop = 0;
let ticking = false;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Cuộn xuống
        header.classList.add("hidden");
      } else {
        // Cuộn lên
        header.classList.remove("hidden");
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    });

    ticking = true;
  }
});

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

// ==== Init ==== //
window.addEventListener("DOMContentLoaded", () => {
  setupFadeInSection("#courses");
  setupFadeInSection("#about-us");
  setupFadeInSection("#contact-form");
  setupHomeLink("homeLink");
  setupSlideshowControls();
  setupDotSlideshow();

  if (
    document.querySelector(".course") &&
    document.getElementById("courseIntro")
  ) {
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
      ".course",
      "courseIntro",
      "courseIntroContent",
      "closeCourseIntro"
    );
  }
  setupScrollEffects("backToTop", "mainHeader");
  setupSmoothScroll("nav", "mainHeader");

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
  });

  setupHomeLink("homeLink");
  setupLegacySlideShow("mySlides");
  setupBackToTop("backToTop");

  // Cuối script.js
  const titles = document.querySelectorAll(".section__title");

  const lightRGB = [204, 219, 231]; // #ccdbe7
  const darkRGB = [30, 42, 51]; // #1e2a33

  function interpolateColor(start, end, ratio) {
    return start.map((c, i) => Math.round(c + (end[i] - c) * ratio));
  }

  function updateTitleColors() {
    titles.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Vị trí so với top màn hình
      const topRatio = Math.max(0, 1 - rect.top / windowHeight);
      const easedRatio = Math.min(1, topRatio); // từ 0 đến 1

      const colorRGB = interpolateColor(lightRGB, darkRGB, easedRatio);
      el.style.color = `rgb(${colorRGB.join(",")})`;
    });
  }

  window.addEventListener("scroll", updateTitleColors);
  window.addEventListener("resize", updateTitleColors);
  updateTitleColors(); // chạy lần đầu
});

// ==== Fade-in Section on Scroll ==== //
function setupFadeInSection(selector) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 0.15}s`; // mỗi phần tử delay tăng dần
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
          entry.target.style.transitionDelay = "0s";
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ==== Slideshow Prev/Next ==== //
function setupSlideshowControls() {
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
}

// ==== Slideshow Dots & Auto ====
function showSlide(index) {
  if (index === currentIndex) return;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[index];

  currentSlide.classList.remove("active");
  nextSlide.classList.add("active");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    const fill = dot.querySelector(".slide-fill");
    if (fill) fill.style.width = i === index ? "100%" : "0%";
  });

  currentIndex = index;
}

function includeHTML(selector, url) {
  console.log("Đang tải includeHTML vào:", selector, "từ", url);

  fetch(url)
    .then((res) => res.text())
    .then((data) => {
      console.log("HTML modal tải về là:", data); // thêm dòng này
      document.querySelector(selector).innerHTML = data;
      console.log("HTML đã được chèn thành công.");

      // GỌI SAU KHI HTML CHÈN THÀNH CÔNG
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
    })
    .catch((err) => console.error("Lỗi khi tải HTML:", err));
}
includeHTML("#authContainer", "./modal/authModal.html");
