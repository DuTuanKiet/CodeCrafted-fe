// dom/slideshow.js
export class Slideshow {
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
    if (this.slides[index]) this.slides[index].classList.add("active");
    if (this.dots[index]) this.dots[index].classList.add("active-dot");

    const currentSlide = this.slides[index];
    if (!currentSlide) return;
    let video =
      currentSlide.tagName === "VIDEO"
        ? currentSlide
        : currentSlide.querySelector("video");
    if (video && video.tagName === "VIDEO") {
      video.currentTime = 0;
      if (video.readyState >= 3) {
        video
          .play()
          .catch((err) => console.warn("Không phát được video:", err));
      } else {
        video.addEventListener(
          "canplay",
          () => {
            video
              .play()
              .catch((err) =>
                console.warn("Không phát được video (canplay):", err)
              );
          },
          { once: true }
        );
      }
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

export function setupSlideshowControls() {
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
